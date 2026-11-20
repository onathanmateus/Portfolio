import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Skills — Nathan Mateus";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Skills", subtitle: "Conhecimentos técnicos" });
}
