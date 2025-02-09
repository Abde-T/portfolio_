import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abderrahmane Tiamani",
  description:
    "Welcome to the portfolio of Abderrahmane Tiamani, a web Software Engineer. Explore recent projects and learn more about my work.",
  keywords:
    "web development, software engineer, portfolio, projects, Abderrahmane Tiamani, full-stack developer, frontend, backend",
  publisher: "Abderrahmane Tiamani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <meta
          property="og:title"
          content="Abderrahmane Tiamani | Web Software Engineer"
        />
        <meta
          property="og:description"
          content="Welcome to my portfolio. Explore my projects and skills in web development."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://abdet.vercel.app/" />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
