import { Search, Youtube, Linkedin, Globe, Github } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-sm px-4 md:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] font-bold text-sm">
            O
          </div>
          <span className="text-white font-bold text-lg tracking-tight">OmniStack</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="text-zinc-400 hover:text-white transition-colors">Components</a>
          <a href="#" className="text-white transition-colors">Docs</a>
          <a href="#" className="text-zinc-400 hover:text-white transition-colors">Pricing</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-zinc-900/50 border border-white/10 rounded-lg py-1.5 pl-10 pr-12 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-[#10B981]/50 w-64"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-[10px] bg-zinc-800 border border-white/10 rounded px-1 text-zinc-500">⌘ K</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-zinc-400">
          <Youtube className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
          <Linkedin className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
          <Globe className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
          <Github className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
        </div>

        <button className="bg-[#10B981] hover:bg-[#059669] text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
          Get Started
        </button>
      </div>
    </nav>)}