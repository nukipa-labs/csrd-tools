import type { CSSProperties } from 'react';

type IconProps = {
  /** Material Symbols (Outlined) glyph name, e.g. "forest", "fact_check". */
  name: string;
  className?: string;
  /** Solid fill variant. */
  filled?: boolean;
  /** Pixel size; defaults to 1em so it follows surrounding text. */
  size?: number;
};

/**
 * Material Symbols (Outlined) icon. The font is loaded once in layout.tsx.
 * Renders in the current text color; set color/size via className (e.g.
 * "text-primary text-2xl"). Decorative by default (aria-hidden).
 */
export function Icon({ name, className = '', filled = false, size }: IconProps) {
  const style: CSSProperties = {
    // Inline font-size always wins over the font's built-in 24px default.
    // Default 1em makes the icon scale with the surrounding text.
    fontSize: size ? `${size}px` : '1em',
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}`
  };
  return (
    <span
      aria-hidden="true"
      translate="no"
      className={`material-symbols-outlined leading-none select-none align-middle ${className}`}
      style={style}
    >
      {name}
    </span>
  );
}
