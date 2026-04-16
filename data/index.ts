export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize high quality outcomes ",
    description: "",
    className: "lg:col-span-2 md:col-span-4 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/B2.png",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-1 md:col-span-2 md:row-span-4",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },

  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-4 lg:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },

  {
    id: 5,
    title: "Currently building a Full Stack social network, with a solid system design ",
    description: "The Inside Scoop",
    className: "lg:col-span-3 md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-6 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "KlipFlow",
    des: "• AI Shorts Generator → turn long videos into vertical clips with auto-cropping + subtitles Timeline Editor → full control editing (positioning, background removal, transitions, etc.) Media Builder → automatically arrange images/videos, then adjust timing and layout",
    img: "/klipflow.mp4",
    iconLists: ["/re.svg", "/tail.svg", "/nodejs.png", "/redux.png"],
    link: "https://klipflow.com/",
  },
  {
    id: 2,
    title: "Nexora",
    des: "A full-stack web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It serves as a platform for users to share and evaluate projects, fostering a collaborative environment for feedback and improvement.",
    img: "/Nexora.png",
    iconLists: ["/re.svg", "/tail.svg", "/nodejs.png", "/redux.png"],
    link: "https://nex0ra.vercel.app/",
  },
  {
    id: 3,
    title: "Review My Project (RMP)",
    des: "A full-stack web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It serves as a platform for users to share and evaluate projects, fostering a collaborative environment for feedback and improvement.",
    img: "/p1.png",
    iconLists: ["/re.svg", "/tail.svg", "/nodejs.png", "/redux.png"],
    link: "https://rmp-abde-t.vercel.app/",
  },
];

export const experience = [
  {
    quote:
      "Built a browser-based video editor SaaS with multi-track timelines, subtitles, transitions, keyframe animations, and FFmpeg-based composition pipelines. Architected distributed media processing pipelines including frontend editor, backend orchestration, and rendering infrastructure. Acquired 200+ users in the first month without paid marketing, validating early product demand.",
    name: "KlipFlow",
    title: "Founder & Full-Stack Engineer",
    img: "/klipflow.png",
  },
  {
    quote:
      "Annotated, evaluated, and curated high-quality training data for AI models, focusing on frontend code generation tasks and real-world UI scenarios. Performed systematic assessment of AI-generated code, identifying edge cases, logical inconsistencies, and alignment gaps to improve model reliability. Designed and executed structured evaluation workflows to benchmark model outputs against usability, accessibility, and production-readiness standards.",
    name: "Outlier AI",
    title: "Software Engineer (AI Training Data)",
    img: "/outlier.png",
  },
  {
    quote:
      "Enhanced website UX by implementing dynamic animations and transitions, resulting in a 30% improvement in user satisfaction. Optimized the loading time by 20% through efficient API requests using Axios and collaborated with virtual team trough Git-based collaboration tools.",
    name: "FrontEndSimplified",
    title: "Front End Internship",
    img: "/fes.jpeg",
  },
  {
    quote:
      "Integrated Google/Apple Wallet functionality, delivering a seamless and efficient ticketing experience for users. Supported the development and testing of major features, including refund management, donations, and enhanced order data storage, leading to better data tracking. Contributed to the development and rigorous testing of a remote calculator service, ensuring accurate and efficient calculations for site operations etc...",
    name: "Evold",
    title: "Junior Software Engineer",
    img: "/evold.png",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/resume.png",
    link: "https://media.klipflow.com/file/klipflow/resume.pdf",
  },
  {
    id: 2,
    img: "/git.svg",
    link: "https://github.com/Abde-T",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/abde-t/",
  },
];
