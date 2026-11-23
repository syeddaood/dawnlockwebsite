export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Cukkoo alarm app"
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
        d="M12.71 11.55 A5.6 5.6 0 1 0 19.17 19.16 A5.3 5.3 0 0 1 12.71 11.55 Z"
        fill="#FFF3D6"
      />

      {/* zzz */}
      <path
        d="M19.3 10.5 22.5 10.5 22.5 11.28 20.23 13.32 22.5 13.32 22.5 14.1 19.3 14.1 19.3 13.32 21.57 11.28 19.3 11.28 Z"
        fill="#FFF3D6"
      />
      <path
        d="M23.15 7.7 25.45 7.7 25.45 8.26 23.82 9.74 25.45 9.74 25.45 10.3 23.15 10.3 23.15 9.74 24.78 8.26 23.15 8.26 Z"
        fill="#FFF3D6"
      />
    </svg>
  );
}
