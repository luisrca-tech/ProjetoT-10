import { Bebas_Neue, Poppins, Inter, Roboto } from "next/font/google";

export const bebasNeue = Bebas_Neue({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
});

export const poppins = Poppins({
  display: "swap",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const inter = Inter({
  display: "swap",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const roboto = Roboto({
  display: "swap",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
