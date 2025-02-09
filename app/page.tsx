"use client";

import { navItems } from "@/data";
import React, { Suspense, useEffect, useState } from "react";
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
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setShow3D(true), 2000); // Delay 2s for better UX
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className=" bg-[#13162D] flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        {show3D && (
          <Suspense fallback={<></>}>
            <StarsCanvas />
            <PlaneCanvas />
          </Suspense>
        )}
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
