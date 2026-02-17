import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Onest } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const onest = Onest({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Auth Starter",
  description: "Next.js + Better Auth + Shadcn UI + Tailwind CSS",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <body
        className={` antialiased`}
      >
        <NextTopLoader showSpinner={false} height={6} color="#000000" />
        <Toaster richColors position="top-right" />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
      </body>
    </html>
  );
}
