import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Onest } from "next/font/google";
// import Banner from "@/components/Banner";

const onest = Onest({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desishub Online Team",
  description: "Join the Silicon Valley of Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}


