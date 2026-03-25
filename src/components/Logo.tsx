import clsx from 'clsx'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
}

export default function Logo({ variant = 'dark', size = 'md', showTagline = false }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900'
  const subColor = variant === 'light' ? 'text-green-200' : 'text-brand-600'

  const sizes = {
    sm: { icon: 'w-7 h-7 text-sm', title: 'text-base', sub: 'text-xs' },
    md: { icon: 'w-9 h-9 text-base', title: 'text-xl', sub: 'text-xs' },
    lg: { icon: 'w-12 h-12 text-xl', title: 'text-2xl', sub: 'text-sm' },
  }

  const s = sizes[size]

  return (
    <div className="flex items-center gap-2.5">
      {/* Icon */}
      <div className={clsx(
        'rounded-xl flex items-center justify-center font-bold shrink-0',
        s.icon,
        variant === 'light'
          ? 'bg-white/20 text-white'
          : 'bg-brand-600 text-white'
      )}>
        D
      </div>

      {/* Name */}
      <div>
        <div className={clsx('font-bold leading-tight', textColor, s.title)}>
          Di Allo <span className={subColor}>Fintech</span>
        </div>
        {showTagline && (
          <div className={clsx('leading-tight font-normal', s.sub, subColor)}>
            Acompte de Salaire
          </div>
        )}
      </div>
    </div>
  )
}
