export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dl-sun" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F4C969" />
          <stop offset="1" stopColor="#E8742F" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="#15121D" stroke="#2A2635" />
      <path
        d="M16 4a12 12 0 1 0 11.5 15.5A9.5 9.5 0 0 1 16 4Z"
        fill="#F7F3ED"
        opacity="0.9"
      />
      <circle cx="19.5" cy="18" r="6.5" fill="url(#dl-sun)" />
    </svg>
  );
}
