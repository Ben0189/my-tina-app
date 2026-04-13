export const siteConfig = {
  title: "BENNEOH",
  description: "Personal website and blog for Ben, an Azure cloud consultant based in Sydney.",
  intro:
    "I am Ben. I write about Azure cloud architecture and I am an Azure cloud consultant with five years of working experience.",
  bio:
    "I am an Azure cloud consultant based in Sydney. I mainly help enterprise applications architect their infrastructure and infrastructure as code (IaC). I use Bicep and Azure as my core cloud solutions.",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/benjaminneoh/",
    },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/posts" },
  ],
} as const;
