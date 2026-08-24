import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TechStrip } from "./components/TechStrip";
import { Problem } from "./components/Problem";
import { Features } from "./components/Features";
import { Quickstart } from "./components/Quickstart";
import { Roadmap } from "./components/Roadmap";
import { Waitlist } from "./components/Waitlist";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-violet focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <TechStrip />
        <Problem />
        <Features />
        <Quickstart />
        <Roadmap />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}

export default App;
