import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import PlaneCanvas from "./ui/Plane";

const Hero = () => {
  return (
    <div className="flex justify-center relative items-center h-[100vh]">
      {/* <div className="">{<StarsCanvas /> || ""}</div> */}
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      {/* <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="#52b788"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="#F26A1B"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="#F26A1B"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill="#FF2C10"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill="#FF2C10"
        />
      </div> */}

      <div className="flex flex-col justify-center items-center z-10 absolute">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-md font-medium text-center text-gray-100 max-w-[400px]">
            Software Engineer
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words=" Hi! I'm Abderrahmane a Web Developer Committed to Continuous Learning and Practical Application."
            className="text-center text-[40px] md:text-3xl lg:text-6xl"
          />

        
          <a href="#projects">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
