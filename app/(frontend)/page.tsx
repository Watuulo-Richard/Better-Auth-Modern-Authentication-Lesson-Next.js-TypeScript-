import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  GraduationCap,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react";

import FounderSection from "@/components/frontend/landing/founder-section";
import FAQSection from "@/components/frontend/landing/faq-section";
import Logo from "@/components/frontend/logo";

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Logo className="text-white" />
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Login
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                Join Marathon
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center mt-8">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 mb-6 md:mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs md:text-sm font-medium">
              Accepting Applications for Dec 2025
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tight leading-tight px-2">
            The Silicon Valley of Africa
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
            Join Desishub Online Team. A place where Creatives, Elites, and Tech
            Leaders are forged. We don&apos;t just teach code; we build the
            future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 rounded-full px-6 md:px-8 h-11 md:h-12 text-base md:text-lg font-medium w-full"
              >
                Start Your Journey{" "}
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
            <Link href="#about" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full px-6 md:px-8 h-11 md:h-12 text-base md:text-lg font-medium w-full backdrop-blur-sm"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <FounderSection />

      {/* Services Section */}
      <section id="about" className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              What is Desishub?
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
              We are more than just a software agency. We are a hub for
              innovation, learning, and growth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Code className="h-8 w-8 text-blue-500" />,
                title: "Software Development",
                description:
                  "We build and distribute world-class software: Web Apps, Mobile Apps, Desktop Apps, and Custom Systems.",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-purple-500" />,
                title: "Training & Mentorship",
                description:
                  "We cultivate elite talent through rigorous training and mentorship programs, ensuring our team is the best.",
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
                title: "Research & Development",
                description:
                  "We never stop learning. From React to Golang, we stay ahead of the curve to deliver cutting-edge solutions.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group"
              >
                <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Team Section */}
      <section className="py-12 md:py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Why the Online Team?
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-300 text-sm md:text-base">
                <p>
                  Desishub is growing fast. We have active teams building
                  amazing products, but we need more manpower to achieve our
                  dream of becoming the Silicon Valley of Africa.
                </p>
                <p>
                  The Online Team is our initiative to find and train the next
                  generation of Desishub elites. We are looking for dedication,
                  resilience, and passion.
                </p>
                <div className="flex items-center gap-4 mt-6 md:mt-8">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-700 border-2 border-black flex items-center justify-center text-xs font-bold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-white">
                    Join 40+ aspiring developers
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl"></div>
              <div className="relative p-6 md:p-8 rounded-2xl bg-black border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                  The Process
                </h3>
                <ul className="space-y-4 md:space-y-6">
                  {[
                    {
                      title: "30-Day Marathon",
                      desc: "Intensive learning 3 days a week. We monitor attendance and contribution.",
                    },
                    {
                      title: "Selection",
                      desc: "Top 25 performers will be selected to join Desishub.",
                    },
                    {
                      title: "Payment",
                      desc: "Pay 3.6M UGX or get a loan payable in 1 year. Learn first, pay later.",
                    },
                    {
                      title: "Join the Team",
                      desc: "Access to paid projects, free further learning, and amenities.",
                    },
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 md:gap-4">
                      <div className="flex-shrink-0 h-6 w-6 md:h-8 md:w-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs md:text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm md:text-base">
                          {step.title}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-400">
                          {step.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              The Curriculum
            </h2>
            <p className="text-sm md:text-base text-gray-400">
              What you will learn in the 30-Day Marathon
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Web Development",
                desc: "HTML, CSS, Tailwind & JavaScript Guide",
                tags: ["HTML", "CSS", "JS", "Tailwind"],
                color: "blue",
              },
              {
                title: "Next.js Mastery",
                desc: "Build 6 Production-Ready CRUD Applications",
                tags: ["Next.js", "Prisma", "Postgres", "Auth"],
                color: "purple",
              },
              {
                title: "NHPC Stack",
                desc: "Master Next.js, Hono, Prisma & Cloudflare",
                tags: ["Hono", "Cloudflare", "Backend"],
                color: "orange",
              },
            ].map((course, i) => (
              <div
                key={i}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all"
              >
                <div className="h-full p-6 rounded-xl bg-zinc-950 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Rocket className="h-24 w-24" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-6 h-12">{course.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs font-medium bg-white/5 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Brochure Section */}
      {/* <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-4">
                    Download Our Program Brochure
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Get detailed information about all our courses, curriculum, pricing, 
                    and success stories. Everything you need to make an informed decision.
                  </p>
                  <a
                    href="/api/download-brochure"
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Free Brochure
                  </a>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-blue-500/10 rounded-2xl flex items-center justify-center border-2 border-blue-500/30">
                    <svg
                      className="w-24 h-24 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-zinc-950">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <Logo className="text-white mx-auto mb-6" />
          <p>&copy; 2025 Desishub Technologies Co. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

