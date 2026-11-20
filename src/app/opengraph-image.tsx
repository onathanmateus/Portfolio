import { profile } from "@/data/portfolio";
import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogSize;
export const contentType = ogContentType;

// Card gerado para pré-visualização em redes sociais (og:image / twitter:image).
export default function Image() {
  return ogImage({});
}
