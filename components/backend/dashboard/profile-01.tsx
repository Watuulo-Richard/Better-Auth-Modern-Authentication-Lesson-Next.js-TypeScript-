import type React from "react";
import {
  LogOut,
  MoveUpRight,
  Settings,
  CreditCard,
  FileText,
  Loader2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

interface Profile01Props {
  name: string;
  role: string;
  avatar: string;
  subscription?: string;
}

const defaultProfile = {
  name: "Eugene An",
  role: "Prompt Engineer",
  avatar:
    "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
  subscription: "Free Trial",
} satisfies Required<Profile01Props>;

export default function Profile01({
  name = defaultProfile.name,
  role = defaultProfile.role,
  avatar = defaultProfile.avatar,
  subscription = defaultProfile.subscription,
}: Partial<Profile01Props> = defaultProfile) {
  const menuItems: MenuItem[] = [
    {
      label: "Subscription",
      value: subscription,
      href: "#",
      icon: <CreditCard className="w-4 h-4" />,
      external: false,
    },
    {
      label: "Settings",
      href: "#",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      label: "Terms & Policies",
      href: "#",
      icon: <FileText className="w-4 h-4" />,
      external: true,
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleLogOut() {
    try {
      setLoading(true);
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("logged out successfully...");
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("failed to log out...");
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-border">
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative shrink-0">
              <Image
                src={avatar || "/placeholder.svg"}
                alt={name}
                width={72}
                height={72}
                className="rounded-full ring-4 ring-background object-cover"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-background" />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">{name}</h2>
              <p className="text-muted-foreground">{role}</p>
            </div>
          </div>
          <div className="h-px bg-border my-6" />
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center">
                  {item.value && (
                    <span className="text-sm text-muted-foreground mr-2">
                      {item.value}
                    </span>
                  )}
                  {item.external && <MoveUpRight className="w-4 h-4" />}
                </div>
              </Link>
            ))}
            {loading ? (
              <button
                type="button"
                className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors duration-200 cursor-not-allowed"
              >
                <div className="flex items-center gap-2">
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium text-foreground">
                    Logging out
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => handleLogOut()}
                type="button"
                className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium text-foreground">
                    Logout
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
