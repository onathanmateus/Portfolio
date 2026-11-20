import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Formação — Nathan Mateus";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Formação", subtitle: "Formação acadêmica" });
}
