import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";
import "../globals.css";
import Navbar from "@/components/frontend/navbar";
import Footer from "@/components/frontend/footer";
import { getAuthUser } from "@/lib/auth";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSession = await getAuthUser();
  console.log(userSession, "hello uganda");
  
  return (
    <>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 w-full h-[450px] sm:h[500px] md:h-[550px] lg:h-[800px] -z-10 pointer-events-none">
          <StarsBackground className="w-full h-full" />
        </div>
        <Navbar user={userSession} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
