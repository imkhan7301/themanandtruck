import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'default' | 'white' | 'icon'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  href?: string
}

const sizes = {
  sm: { w: 28, h: 32 },
  md: { w: 36, h: 42 },
  lg: { w: 48, h: 56 },
  xl: { w: 64, h: 74 },
}

export function Logo({ variant = 'default', size = 'md', className, href = '/' }: LogoProps) {
  const { w, h } = sizes[size]
  const src = variant === 'white' ? '/logo-white.svg' : variant === 'icon' ? '/favicon.svg' : '/logo.svg'

  const img = (
    <Image
      src={src}
      alt="The Man & Truck"
      width={w}
      height={h}
      className={cn('object-contain', className)}
      priority
    />
  )

  if (!href) return img

  return (
    <Link href={href} className="flex items-center gap-2 group">
      {img}
      {variant !== 'icon' && (
        <div className="hidden sm:flex flex-col leading-tight">
          <span className={cn(
            'font-black text-sm tracking-tight',
            variant === 'white' ? 'text-white' : 'text-brand-amber'
          )}>
            THE MAN & TRUCK
          </span>
          <span className={cn(
            'text-[10px] tracking-widest uppercase',
            variant === 'white' ? 'text-white/60' : 'text-white/50'
          )}>
            Your Load. Our Mission.
          </span>
        </div>
      )}
    </Link>
  )
}
