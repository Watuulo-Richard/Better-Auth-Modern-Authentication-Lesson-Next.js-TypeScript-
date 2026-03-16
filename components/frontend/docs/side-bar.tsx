import React from 'react';
import { Rocket, Box, Layers, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  label: string;
  active?: boolean;
}

function SidebarItem({ label, active }: SidebarItemProps) {
  return (
    <div className={cn(
      "px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer",
      active 
        ? "bg-[#10B981]/10 text-[#10B981] font-medium" 
        : "text-zinc-500 hover:text-zinc-300"
    )}>
      {label}
    </div>
  );
}

interface SidebarSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function SidebarSection({ icon, title, children }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-2 mb-2 text-zinc-300 font-semibold text-sm">
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-zinc-600" />
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/5 h-[calc(100vh-64px)] overflow-y-auto p-4 hidden md:block">
      <SidebarSection icon={<Rocket className="h-4 w-4" />} title="Get Started">
        <SidebarItem label="Introduction" active />
        <SidebarItem label="Quick Start" />
        <SidebarItem label="Installation" />
      </SidebarSection>

      <SidebarSection icon={<Box className="h-4 w-4" />} title="Components">
        <SidebarItem label="Authentication" />
        <SidebarItem label="Payments" />
        <SidebarItem label="UI Components" />
        <SidebarItem label="Media" />
        <SidebarItem label="Forms" />
        <SidebarItem label="E-Commerce" />
      </SidebarSection>

      <SidebarSection icon={<Layers className="h-4 w-4" />} title="Platforms">
        <SidebarItem label="Next.js" />
        <SidebarItem label="Expo" />
        <SidebarItem label="Go" />
      </SidebarSection>
    </aside>
  );
}
