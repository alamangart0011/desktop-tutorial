import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const CheckCircleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z" />
  </svg>
);

export const AlertTriangleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.41 0Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export const AlertOctagonIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2Z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
    <path d="m21 2-9.6 9.6" />
    <circle cx="7.5" cy="15.5" r="5.5" />
  </svg>
);

export const CpuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" /><path d="M15 20v2" />
    <path d="M2 15h2" /><path d="M2 9h2" />
    <path d="M20 15h2" /><path d="M20 9h2" />
    <path d="M9 2v2" /><path d="M9 20v2" />
  </svg>
);

export const ServerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 6h.01" /><path d="M6 18h.01" />
  </svg>
);

export const EyeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ScanIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M7 12h10" />
  </svg>
);

export const FileTextIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v5h5" />
    <path d="M8 13h8" /><path d="M8 17h8" /><path d="M8 9h2" />
  </svg>
);

export const FileCheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v5h5" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export const MapPinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const ExternalLinkIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const UsersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
    <path d="M16 3.1a4 4 0 0 1 0 7.8" />
  </svg>
);

export const BuildingIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" /><path d="M16 6h.01" />
    <path d="M12 6h.01" /><path d="M12 10h.01" />
    <path d="M8 10h.01" /><path d="M16 10h.01" />
    <path d="M8 14h.01" /><path d="M16 14h.01" />
    <path d="M12 14h.01" />
  </svg>
);

export const HospitalIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 6v4" /><path d="M14 8h-4" />
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M8 22v-4h8v4" />
  </svg>
);

export const SchoolIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4 6 8-4 8 4" />
    <path d="M6 6v10a6 6 0 0 0 12 0V6" />
    <path d="M12 10v6" />
  </svg>
);

export const GavelIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m14.5 12.5-8 8a2.1 2.1 0 1 1-3-3l8-8" />
    <path d="m16 16 6-6" />
    <path d="m8 8 6-6" />
    <path d="m9 7 8 8" />
    <path d="m21 11-8-8" />
  </svg>
);

export const HeartHandshakeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.83.83 2.18.83 3 0l2.3-2.3a5 5 0 0 1 7.07 0l1.4 1.4" />
    <path d="M7.9 20.2 4 16.3" />
  </svg>
);

export const ZapIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
  </svg>
);

export const TargetIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const AwardIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M11.5 2.5 14 8l6 1-4.5 4.5 1 6L12 17l-5 2 1-6-4.5-4.5 6-1 2-5.5Z" />
  </svg>
);

export const BadgeCheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const BookOpenIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" />
  </svg>
);

export const HeadphonesIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z" />
  </svg>
);

export const ScaleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m16 16 3-8 3 8c-2 1-4 1-6 0Z" />
    <path d="m2 16 3-8 3 8c-2 1-4 1-6 0Z" />
    <path d="M7 21h10" /><path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

export const CrosshairIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M22 12h-4" /><path d="M6 12H2" />
    <path d="M12 6V2" /><path d="M12 22v-4" />
  </svg>
);

export const TruckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 18V6H2v12h12Z" />
    <path d="M14 9h4l4 4v5h-8" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

export const HandshakeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-2.9 2.9a1 1 0 1 1-3-3l3.2-3.2a4 4 0 0 1 5.7 0l5.5 5.5" />
    <path d="m17 14 3-3" />
    <path d="m10 10-3 3" />
    <path d="M2 12.5 6 9l4 4-4.5 4.5a2.1 2.1 0 0 1-3-3Z" />
  </svg>
);

export const RocketIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2a3 3 0 1 0-3-3Z" />
    <path d="M12 15 9 12a11 11 0 0 1 3-8.5 6 6 0 0 1 8.5 8.5L17 15a4.5 4.5 0 0 1-5 0Z" />
    <path d="M9.5 14.5 4 20" />
    <path d="M15 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
  </svg>
);

export const LayersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m12 2 10 5-10 5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
);

export const MessageSquareIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </svg>
);

export const BarChartIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

export const RubleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 21V5h6a4 4 0 0 1 0 8H5" />
    <path d="M5 17h9" />
  </svg>
);

export const SparklesIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
    <path d="M19 14v4" /><path d="M17 16h4" />
  </svg>
);
