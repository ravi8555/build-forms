"use client";

import { cn } from "~/lib/utils";

type Props = {
  theme?: string | null;
  value: number;
  onChange: (value: number) => void;
};

export function RatingField({
  theme = "DEFAULT",
  value,
  onChange,
}: Props) {
  const items = [1, 2, 3, 4, 5];

  // WANO
  if (theme === "WANO") {
    return (
      <div className="flex gap-3 text-4xl">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              "transition-all duration-300 hover:scale-125",
              item <= value
                ? "opacity-100 drop-shadow-[0_0_12px_rgba(255,192,203,0.9)]"
                : "opacity-40"
            )}
          >
            🌸
          </button>
        ))}
      </div>
    );
  }

  // STARK
  if (theme === "STARK") {
    return (
      <div className="flex gap-3">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              "group relative flex h-10 w-10 items-center justify-center rounded-full border",
              item <= value
                ? "border-cyan-300 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,.9)]"
                : "border-cyan-900 bg-[#071c2f]"
            )}
          >
            <div
              className={cn(
                "relative z-10 flex h-7 w-7 items-center justify-center rounded-full",
                item <= value
                  ? "bg-cyan-300 text-black"
                  : "bg-[#02111f]"
              )}
            >
              ⚙
            </div>
          </button>
        ))}
      </div>
    );
  }

  // BATMAN
  if (theme === "BATMAN") {
    return (
      <div className="flex gap-3 text-4xl">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              item <= value
                ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,.9)]"
                : "opacity-40"
            )}
          >
            🦇
          </button>
        ))}
      </div>
    );
  }

  // DEFAULT
  return (
    <div className="flex gap-2 text-3xl">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            item <= value
              ? "text-yellow-400"
              : "text-gray-400"
          )}
        >
          ★
        </button>
      ))}
    </div>
  );
}