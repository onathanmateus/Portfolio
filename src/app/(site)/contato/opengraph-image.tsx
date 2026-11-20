import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Contato — Nathan Mateus";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Contato", subtitle: "Onde me encontrar" });
}
