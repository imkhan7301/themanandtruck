import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

export function Logo({ variant = "default", size = "md", className, href = "/" }: LogoProps) {
  const sizes = { sm: 32, md: 48, lg: 64 };
  const imgSize = sizes[size];
  const src = variant === "white" ? "/logo-white.svg" : "/logo.svg";

  const logoEl = (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src={src} alt="The Man & Truck" width={imgSize} height={imgSize} priority />
      <div className="flex flex-col">
        <span
          className={cn("font-black tracking-tight leading-tight", {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-xl": size === "lg",
            "text-white": variant === "white",
            "text-brand-navy": variant === "default",
          })}
        >
          THE MAN & TRUCK
        </span>
        <span
          className={cn("text-brand-amber font-medium leading-tight", {
            "text-xs": size === "sm" || size === "md",
            "text-sm": size === "lg",
          })}
        >
          Your Load. Our Mission.
        </span>
      </div>
    </div>
  );

  if (href) return <Link href={href}>{logoEl}</Link>;
  return logoEl;
}
