import { Navbar } from "@/components/nav/Navbar";
import Expertise from "./(content)/Expertise";
import Hero from "./(content)/Hero";
import Projects from "./(content)/Projects";
import Footer from "@/components/nav/Footer";

export const revalidate = 6000;
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-20 md:pt-24">
        <Hero />
        <Projects />
        <Expertise />
      </div>
      <Footer />
    </>
  );
}
