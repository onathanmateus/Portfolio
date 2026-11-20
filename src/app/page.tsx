import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SkipLink } from "@/components/SkipLink";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <Hero />
    </>
  );
}
