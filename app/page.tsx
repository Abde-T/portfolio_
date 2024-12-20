"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import StarsCanvas from "@/components/ui/Stars";
import PlaneCanvas from "@/components/ui/Plane";

const Home = () => {
  return (
    <main className=" bg-[#13162D] flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <StarsCanvas />          
        <PlaneCanvas />
        <Grid />
        <RecentProjects />
        <Clients />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
