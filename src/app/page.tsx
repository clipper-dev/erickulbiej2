
import Hero from "./(Hero)/Hero";
import Projects from "./(Hero)/Projects";

export const revalidate = 6000;
export default function Home() {
  return (
    <>
      <div className="pt-20 md:pt-24">
        <Hero />
        <Projects />
      </div>
    </>
  );
}
