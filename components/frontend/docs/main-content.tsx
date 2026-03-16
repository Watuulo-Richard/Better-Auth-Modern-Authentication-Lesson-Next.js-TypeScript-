'use client';

import { motion } from 'motion/react';

export function MainContent() {
  return (
    <main className="flex-1 max-w-4xl px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#10B981] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
          Introduction
        </span>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
          Welcome to OmniStack
        </h1>

        <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
          <p>
            OmniStack is a collection of batteries-included, full-stack components that you can install with a single command. Built on top of the <span className="text-[#10B981]">shadcn/ui registry</span>, each component comes with everything you need — UI, API routes, database models, and configuration.
          </p>

          <h2 className="text-2xl font-bold text-white pt-8 mb-4">
            What is OmniStack?
          </h2>

          <p>
            Unlike traditional UI libraries that only give you frontend components, OmniStack provides complete feature implementations. When you install an auth component, you get the sign-in forms, API routes, database schemas, middleware, and email templates — all wired together and ready to use.
          </p>

          <p>
            Every component is installed directly into your codebase using the shadcn CLI. You own the code. No lock-in, no black boxes, fully customizable.
          </p>

          <h2 className="text-2xl font-bold text-white pt-8 mb-4">
            How It Works
          </h2>
          
          <p className="text-zinc-500 italic">
            [Content continues...]
          </p>
        </div>
      </motion.div>
    </main>
  );
}
