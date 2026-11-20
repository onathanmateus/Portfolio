import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Experiência — Nathan Mateus";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Experiência", subtitle: "Trajetória profissional" });
}
