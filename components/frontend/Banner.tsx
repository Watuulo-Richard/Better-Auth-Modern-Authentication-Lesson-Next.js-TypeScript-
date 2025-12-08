import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <div className="fixed top-0 w-full p-4 z-50 bg-amber-100 grid place-content-center">
      <Link
        target="_blank"
        className="font-bold"
        href="https://jb.desishub.com/blog/nextjs-hono-prisma-cloudflare-course"
      >
        Join Us for this exclusive course NHPC Course
      </Link>
    </div>
  );
}
