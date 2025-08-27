import ScienceHero from "@/components/heros/ScienceHero";
import { ContactForm } from "@/components/sections/ContactForm";
import Newsletter from "@/components/sections/Newsletter";
import Science from "@/components/sections/Science";

export default function Home() {
  return (
    <>
      <div className="">
        <ScienceHero/>
        <Science />
        <Newsletter />
        <ContactForm />
      </div>
    </>
  );
}
