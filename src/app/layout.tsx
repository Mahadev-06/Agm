import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "AGM Housing | Defining Architectural Excellence",
  description: "Crafting the future of luxury real estate through architectural innovation and unwavering dedication to excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans antialiased bg-background text-foreground selection:bg-secondary-container selection:text-secondary-container-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
