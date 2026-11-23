#!/usr/bin/env bash
# Destrava os PRs npm do Dependabot que o CI não deixa passar por causa do
# package-lock.json. Chamado pelo workflow dependabot-lockfile-fix.yml.
#
# Para cada PR: traz o branch para cima da main (a main anda o tempo todo — o
# grupo de dev e o de produção saem no mesmo minuto e mexem no mesmo lock),
# regenera o lock do zero quando preciso, roda o CI e faz o squash-merge. Se a
# main andar de novo antes do merge, recomeça. Quando o problema não é o lock,
# não mexe em nada e avisa no PR (uma vez por commit).
set -uo pipefail

: "${REPO:?}" "${OWNER:?}" "${EVENT:?}" "${RUN_URL_ESTE:?}"
MAX_TENTATIVAS=3

listar_prs() {
  gh pr list --repo "$REPO" --state open --json number,author,headRefName --jq '
    .[] | select((.author.login == "app/dependabot" or .author.login == "dependabot[bot]")
                 and (.headRefName | startswith("dependabot/npm_and_yarn/")))
        | .number'
}

# Comenta no PR marcando o dono do repo. A marca evita repetir o mesmo aviso
# todo dia para o mesmo commit.
avisar() { # $1 PR, $2 SHA do commit, $3 motivo
  if [ -n "${DRY_RUN:-}" ]; then
    echo "DRY_RUN: avisaria no PR #$1: $3"
    return 0
  fi
  local marca="<!-- dependabot-lockfix:$2 -->"
  if gh api "repos/$REPO/issues/$1/comments" --paginate --jq '.[].body' | grep -qF "$marca"; then
    echo "PR #$1: já avisei sobre $2."
    return 0
  fi
  gh pr comment "$1" --repo "$REPO" --body "@$OWNER este PR do Dependabot precisa de atenção: $3

- Correção automática: $RUN_URL_ESTE

$marca"
}

# Resultado do CI mais recente num commit: success, failure, pending ou none.
ci_do_commit() {
  gh run list --repo "$REPO" --workflow ci.yml --commit "$1" --limit 1 \
    --json status,conclusion \
    --jq 'if length == 0 then "none" elif .[0].status != "completed" then "pending" else .[0].conclusion end'
}

# Sem lock e sem node_modules: com qualquer um dos dois presente o npm tenta
# preservar a árvore antiga e cai no mesmo conflito. --ignore-scripts sempre:
# nenhum script de pacote roda com este token.
regenerar_lock() {
  rm -rf node_modules package-lock.json
  npm install --package-lock-only --ignore-scripts --no-audit --no-fund &&
    npm ci --ignore-scripts --no-audit --no-fund
}

# Push feito com o GITHUB_TOKEN não dispara o pull_request; o workflow_dispatch
# é a exceção, por isso o CI aceita esse gatilho.
rodar_ci() { # $1 branch, $2 SHA
  [ -n "${DRY_RUN:-}" ] && { echo "DRY_RUN: rodaria o CI em $2"; return 0; }
  gh workflow run ci.yml --repo "$REPO" --ref "$1" || return 1
  local run=""
  for _ in $(seq 1 30); do
    run=$(gh run list --repo "$REPO" --workflow ci.yml --branch "$1" --commit "$2" \
            --event workflow_dispatch --limit 1 --json databaseId --jq '.[0].databaseId // empty')
    [ -n "$run" ] && break
    sleep 10
  done
  [ -n "$run" ] || return 1
  gh run watch "$run" --repo "$REPO" --exit-status --interval 30 >/dev/null
}

mergear() { # $1 PR, $2 SHA
  [ -n "${DRY_RUN:-}" ] && { echo "DRY_RUN: mergearia o PR #$1 em $2"; return 0; }
  gh pr merge "$1" --repo "$REPO" --squash --delete-branch --match-head-commit "$2"
}

# Aplica sobre o package.json atual as versões que o Dependabot mudou em
# relação à base do branch — merge do JSON como dado, não como texto (as seções
# dependencies e devDependencies ficam a poucas linhas uma da outra, e o git
# acusa conflito quando cada lado mexeu numa delas).
MESCLAR_PACKAGE_JSON='
const fs = require("fs");
const [b, p, alvo] = process.argv.slice(1);
const base = JSON.parse(fs.readFileSync(b, "utf8"));
const pr = JSON.parse(fs.readFileSync(p, "utf8"));
const atual = JSON.parse(fs.readFileSync(alvo, "utf8"));
for (const secao of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
  const nomes = new Set([...Object.keys(base[secao] ?? {}), ...Object.keys(pr[secao] ?? {})]);
  for (const nome of nomes) {
    const antes = base[secao]?.[nome];
    const depois = pr[secao]?.[nome];
    if (antes === depois) continue;
    atual[secao] ??= {};
    if (depois === undefined) delete atual[secao][nome];
    else atual[secao][nome] = depois;
    console.log(`  ${secao}.${nome}: ${antes} -> ${depois}`);
  }
}
fs.writeFileSync(alvo, JSON.stringify(atual, null, 2) + "\n");
'

# Recria a atualização do Dependabot em cima da main atual: mescla o
# package.json, regenera o lock e faz um commit com a mensagem e a autoria
# originais (como um rebase faria). Retorna 1 quando não dá — já avisando.
reaplicar_sobre_main() { # $1 PR, $2 SHA do branch
  local base outros primeiro tmp
  if ! base=$(git merge-base origin/main "$2"); then
    avisar "$1" "$2" "o branch não tem histórico em comum com a \`main\`. Comente \`@dependabot recreate\` para o Dependabot refazer o PR."
    return 1
  fi
  outros=$(git diff --name-only "$base" "$2" | grep -vxE 'package(-lock)?\.json' || true)
  if [ -n "$outros" ]; then
    avisar "$1" "$2" "o PR está atrás da \`main\` e mexe em arquivos além do \`package.json\` e do lock: $(echo $outros)."
    return 1
  fi
  tmp=$(mktemp -d)
  git show "$base:package.json" > "$tmp/base.json"
  git show "$2:package.json" > "$tmp/pr.json"
  primeiro=$(git rev-list --reverse "$base..$2" | head -n1)
  git log -1 --format=%B "$primeiro" > "$tmp/mensagem"

  git checkout --quiet --force -B trabalho origin/main
  echo "Versões do Dependabot aplicadas sobre a main:"
  node -e "$MESCLAR_PACKAGE_JSON" "$tmp/base.json" "$tmp/pr.json" package.json || return 1
  if ! regenerar_lock; then
    avisar "$1" "$2" "regenerar o \`package-lock.json\` do zero não resolveu o conflito de dependências."
    return 1
  fi
  git add package.json package-lock.json
  if git diff --cached --quiet; then
    avisar "$1" "$2" "a \`main\` já tem todas as versões deste PR; ele pode ser fechado."
    return 1
  fi
  git commit --quiet -F "$tmp/mensagem" \
    --author="dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>"
}

destravar() {
  local pr=$1 branch author state
  read -r branch author state < <(gh pr view "$pr" --repo "$REPO" \
    --json headRefName,author,state --jq '"\(.headRefName) \(.author.login) \(.state)"')
  if [ "$state" != "OPEN" ] || [[ "$branch" != dependabot/npm_and_yarn/* ]] ||
     { [ "$author" != "app/dependabot" ] && [ "$author" != "dependabot[bot]" ]; }; then
    echo "PR #$pr não é um PR npm aberto do Dependabot; ignorando."
    return 0
  fi

  local tentativa antes depois
  for tentativa in $(seq 1 "$MAX_TENTATIVAS"); do
    echo "=== PR #$pr ($branch), tentativa $tentativa ==="
    git fetch --quiet origin main "$branch" || return 1
    git checkout --quiet --force -B trabalho "origin/$branch"
    antes=$(git rev-parse HEAD)

    if ! git merge-base --is-ancestor origin/main HEAD; then
      echo "A main andou; reaplicando a atualização do Dependabot por cima dela."
      reaplicar_sobre_main "$pr" "$antes" || return 0
    elif ! npm ci --ignore-scripts --no-audit --no-fund; then
      echo "Lock incoerente; regenerando o package-lock.json do zero."
      if ! regenerar_lock; then
        avisar "$pr" "$antes" "regenerar o \`package-lock.json\` do zero não resolveu o conflito de dependências."
        return 0
      fi
      git add package-lock.json
      # Emenda o commit do próprio Dependabot (o autor continua sendo ele), para
      # o squash na main não ganhar co-autor.
      if [ "$(git log -1 --format=%an)" = "dependabot[bot]" ]; then
        git commit --quiet --amend --no-edit
      else
        git commit --quiet -m "fix(deps): regenera o package-lock.json"
      fi
    else
      case "$(ci_do_commit "$antes")" in
        success)
          echo "Lock coerente e CI verde: só faltava o merge."
          mergear "$pr" "$antes" && return 0
          sleep 15
          continue
          ;;
        pending)
          echo "O CI ainda está rodando; quando terminar, o auto-merge ou este workflow assume."
          return 0
          ;;
        none)
          echo "Nenhum CI neste commit; rodando."
          if rodar_ci "$branch" "$antes" && mergear "$pr" "$antes"; then return 0; fi
          avisar "$pr" "$antes" "o CI não passou neste commit."
          return 0
          ;;
        *)
          avisar "$pr" "$antes" "o \`package-lock.json\` está coerente, então a falha do CI veio de outro passo (lint, testes, build ou Lighthouse)."
          return 0
          ;;
      esac
    fi

    depois=$(git rev-parse HEAD)
    if [ -n "${DRY_RUN:-}" ]; then
      echo "DRY_RUN: empurraria $depois para $branch, rodaria o CI e mergearia o PR #$pr."
      git --no-pager log -1 --format='  autor: %an%n  mensagem: %s' "$depois"
      git --no-pager diff --stat origin/main "$depois"
      return 0
    fi

    if ! git push --quiet --force-with-lease="$branch:$antes" origin "HEAD:$branch"; then
      echo "O branch mudou enquanto eu trabalhava; recomeçando."
      continue
    fi
    echo "Branch atualizado em $depois; rodando o CI."
    if ! rodar_ci "$branch" "$depois"; then
      avisar "$pr" "$depois" "o \`package-lock.json\` foi corrigido, mas o CI não passou com ele."
      return 0
    fi
    if mergear "$pr" "$depois"; then
      echo "PR #$pr mergeado."
      return 0
    fi
    echo "Não deu para mergear (a main andou de novo?); nova tentativa."
    sleep 15
  done

  avisar "$pr" "$(git rev-parse "origin/$branch")" "não consegui mergear depois de $MAX_TENTATIVAS tentativas — a \`main\` continuou mudando."
}

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

if [ "$EVENT" = "workflow_dispatch" ] && [ -n "${PR_INPUT:-}" ]; then
  prs=$PR_INPUT
else
  prs=$(listar_prs)
fi
if [ -z "$prs" ]; then
  echo "Nenhum PR npm do Dependabot aberto."
  exit 0
fi
for pr in $prs; do
  destravar "$pr"
done
