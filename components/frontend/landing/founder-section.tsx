import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FounderSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border border-white/10">
              {/* Placeholder for the image - user provided it, we will assume it's at /jb.png */}
              <Image
                src="/jb.png"
                alt="Muke Johnbaptist (JB)"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl hidden md:block">
              <p className="font-bold text-xl">Muke Johnbaptist</p>
              <p className="text-sm opacity-90">Founder, Desishub</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              &quot;We don&apos;t just teach code;{" "}
              <span className="text-blue-500">we build the future.</span>&quot;
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Welcome to Desishub. My dream has always been to create a space
              where African talent isn&apos;t just recognized but feared. A
              place where we forge not just developers, but tech leaders,
              innovators, and problem solvers.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              The Online Team is our elite unit. It&apos;s where we take the
              most dedicated individuals and put them through a rigorous,
              transformative process. If you&apos;re ready to work harder than
              you ever have, we&apos;re ready to change your life.
            </p>

            <div className="pt-4">
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full px-8 h-12 text-lg font-medium w-full sm:w-auto backdrop-blur-sm"
              >
                <Link href="https://jb.desishub.com/" target="_blank">
                  Meet JB &rarr;
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
