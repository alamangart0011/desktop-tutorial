interface Props {
  from: string;
  to: string;
  variant?: 'wave' | 'slope';
}

export function SectionDivider({ from, to, variant = 'wave' }: Props) {
  return (
    <div aria-hidden className="relative" style={{ background: from }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full h-10 md:h-14"
      >
        {variant === 'wave' ? (
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill={to}
          />
        ) : (
          <path d="M0,80 L1440,0 L1440,80 Z" fill={to} />
        )}
      </svg>
    </div>
  );
}
