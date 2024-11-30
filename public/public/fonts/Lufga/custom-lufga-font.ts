import localFont from "next/font/local";

const customLufga = localFont({
  src: [
    {
      path: "./Fontspring-DEMO-lufga-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-lufga-thinitalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./Fontspring-DEMO-lufga-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-lufga-lightitalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Fontspring-DEMO-lufga-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-lufga-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Fontspring-DEMO-lufga-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-lufga-mediumitalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Fontspring-DEMO-lufga-semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-lufga-semibolditalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./Fontspring-DEMO-lufga-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-lufga-bolditalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./Fontspring-DEMO-lufga-extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-lufga-extrabolditalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./Fontspring-DEMO-lufga-black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-lufga-blackitalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-lufga", // Optional CSS variable
  display: "swap", // Ensures better performance
});

export default customLufga;
