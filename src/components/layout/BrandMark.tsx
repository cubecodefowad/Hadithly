/** The mark: an open book, drawn as a single stroke so it scales cleanly. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 6.5C10.4 5.2 8.2 4.6 5 4.6v13c3.2 0 5.4.6 7 1.9 1.6-1.3 3.8-1.9 7-1.9v-13c-3.2 0-5.4.6-7 1.9Z" />
      <path d="M12 6.5v12.9" />
    </svg>
  );
}
