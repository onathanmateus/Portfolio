import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sobre — Nathan Mateus";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Sobre", subtitle: "Quem sou e como trabalho" });
}
