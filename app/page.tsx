"use client";

import { navItems } from "@/data";
import React, { Suspense } from "react";
import { Mosaic } from "react-loading-indicators";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Hero = React.lazy(() => import("@/components/Hero"));
const Footer = React.lazy(() => import("@/components/Footer"));
const Clients = React.lazy(() => import("@/components/Clients"));
const Approach = React.lazy(() => import("@/components/Approach"));
const RecentProjects = React.lazy(() => import("@/components/RecentProjects"));
const Grid = React.lazy(() => import("@/components/Grid"));
const StarsCanvas = React.lazy(() => import("@/components/ui/Stars"));
const PlaneCanvas = React.lazy(() => import("@/components/ui/Plane"));

const Home = () => {
  return (
    <main className=" bg-[#13162D] flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Suspense
          fallback={
            <div className="w-full h-screen flex justify-center items-center scale-[2.5]">
              <Mosaic
                color={["#04acdf", "#33CC36", "#FF2C10"]}
                size="large"
                text="Loading..."
                textColor="#fff"
              />
            </div>
          }
        >
          <FloatingNav navItems={navItems} />
          <Hero />
          <StarsCanvas />
          <PlaneCanvas />
          <Grid />
          <RecentProjects />
          <Clients />
          <Approach />
          <Footer />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
