import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Projetos — Nathan Mateus";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Projetos", subtitle: "Coisas que construí" });
}
