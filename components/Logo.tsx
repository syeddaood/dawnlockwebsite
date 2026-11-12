export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {/* progress ring: long orange arc (wake streak) + slate arc, split by a mint marker dot */}
      <path
        d="M15.56 3.51 A12.5 12.5 0 1 1 3.87 19.02"
        stroke="#FFB547"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M3.87 12.98 A12.5 12.5 0 0 1 15.13 3.53"
        stroke="#9290AB"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="3.5" cy="16" r="2.2" fill="#5EE6B0" />

      {/* crescent moon */}
      <path
        d="M17 9a8 8 0 1 0 7.7 10.3A6.3 6.3 0 0 1 17 9Z"
        fill="#FFF3D6"
      />
      {/* zzz */}
      <path
        d="M22.6 9.6h3.4l-3.4 3.4h3.4"
        stroke="#FFF3D6"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M24.6 13.6h2.3l-2.3 2.3h2.3"
        stroke="#FFF3D6"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
