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
    img: "/b2.png",
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
    title: "Currently building a Minecraft clone using THREE JS",
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
    title: "Review My Project (RMP)",
    des: "A full-stack web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It serves as a platform for users to share and evaluate projects, fostering a collaborative environment for feedback and improvement.",
    img: "/p1.png",
    iconLists: ["/re.svg", "/tail.svg", "/nodejs.png", "/redux.png"],
    link: "https://rmp-abde-t.vercel.app/",
  },
  {
    id: 2,
    title: "Movie Heaven",
    des: "A cutting-edge movie streaming application designed for cinematic enthusiasts.",
    img: "/p2.png",
    iconLists: [
      "/next.svg",
      "/tail.svg",
      "/ts.svg",
      "/redux.png",
      "/firebase.png",
    ],
    link: "https://movieheaven.vercel.app/",
  },
  {
    id: 3,
    title: "Twitter Clone",
    des: "A Twitter clone, leveraging modern web development technologies to create a seamless social media experience. The project incorporates Firebase for authentication, data storage, and real-time updates, Redux for efficient state management, and Tailwind CSS for a sleek and responsive user interface.",
    img: "/p3.png",
    iconLists: [
      "/re.svg",
      "/tail.svg",
      "/ts.svg",
      "/redux.png",
      "/firebase.png",
    ],
    link: "https://twitter-clone-qviutiu6e-abde-t.vercel.app/",
  },
];

export const experience = [
  {
    quote:
      "Enhanced website UX by implementing dynamic animations and transitions, resulting in a 30% improvement in user satisfaction. Optimized the loading time by 20% through efficient API requests using Axios and collaborated with virtual team trough Git-based collaboration tools.",
    name: "FrontEndSimplified",
    title: "Front End Internship",
    img: "/fes.jpeg",
  },
  {
    quote:
      "Integrated Google/Apple Wallet for a seamless ticketing experience. Implemented dynamic start and stop selling dates for tickets. Developed schemas to generate GraphQL using environment variables. Utilized Firebase Remote Config to manage environment variables. Enhanced website security and user experience through various improvements.",
    name: "Evold",
    title: "Junior Software Engineer",
    img: "/evold.png",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/Abde-T",
  },
  {
    id: 2,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/abde-t/",
  },
];
