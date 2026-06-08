export function LastUpdated({
  date,
  onDark = false
}: {
  date: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={
        'inline-flex items-center gap-2 rounded-chip font-mono text-xs px-2.5 py-1 ' +
        (onDark
          ? 'text-accent'
          : 'text-accent-deep bg-sand-tint border border-line')
      }
    >
      <span
        aria-hidden="true"
        className="inline-block h-[7px] w-[7px] rounded-full bg-accent"
      />
      Last updated · {date}
    </span>
  );
}
