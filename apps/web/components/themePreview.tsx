import {useState} from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FORM_THEMES } from "~/lib/form-themes";
import { cn } from "~/lib/utils";

type Props = {
  theme: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
  };
};

export function ThemePreview({
  theme,
}: Props) {
  const [rating, setRating] = useState(4);
  const themeConfig =
    FORM_THEMES[
      theme.id as keyof typeof FORM_THEMES
    ];
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border p-8 transition-all duration-500",
        themeConfig.wrapperClass,
        themeConfig.cardClass
      )}

      style={{
        backgroundImage: `url(${themeConfig.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10">
        
        <div className="mb-3">
          <p className="text-sm uppercase tracking-[4px] text-[#ca9f00]">
            Survey Response Form
          </p>

          <h2 className="text-4xl font-bold mt-4 text-white">
            {theme.title}
          </h2>

          <p className="mt-4 text-gray-200">
            {theme.description}
          </p>
        </div>

        <div className="space-y-4">
      <h1 className="text-2xl text-left">Team Feedback Survey</h1>
          <div className="text-left">
            <label className="text-sm text-white">
              Full Name
            </label>

            <input
              className={cn(
                "mt-2 w-full h-12 rounded-xl border px-4 outline-none:",
                themeConfig.inputClass
              )}
              placeholder="Tom Harry" value={'Tom Harry'}
              disabled
            />
          </div>

<div className="text-left">
  <label className="text-sm text-white">
    Overall Satisfaction
  </label>

  <div className="mt-4">

    {/* WANO */}
    {theme.id === "WANO" && (
      <div className="flex gap-3 text-4xl">
        {[1, 2, 3, 4, 5].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRating(item)}
            className={cn(
              "transition-all duration-300 hover:scale-125",
              item <= rating
                ? "opacity-100 drop-shadow-[0_0_12px_rgba(255,192,203,0.9)]"
                : "opacity-50"
            )}
          >
            🌸
          </button>
        ))}
      </div>
    )}

    {/* STARK */}
{theme.id === "STARK" && (
  <div className="flex items-center gap-4">
    {[1, 2, 3, 4, 5].map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => setRating(item)}
        className={cn(
          "group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
          item <= rating
            ? "border-cyan-300 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.9)]"
            : "border-cyan-900 bg-[#071c2f]"
        )}
      >
        {/* Outer Pulse */}
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            item <= rating &&
              "animate-ping bg-cyan-400/20"
          )}
        />

        {/* Core */}
        <div
          className={cn(
            "relative z-10 flex h-7 w-7 items-center justify-center rounded-full border",
            item <= rating
              ? "border-cyan-200 bg-cyan-300 text-black"
              : "border-cyan-800 bg-[#02111f]"
          )}
        >
          ⚙
        </div>

        {/* HUD Ring */}
        <div
          className={cn(
            "absolute h-full w-full rounded-full border",
            item <= rating
              ? "border-cyan-400/40"
              : "border-cyan-950"
          )}
        />
      </button>
    ))}
  </div>
)}

    {/* BATMAN */}
    {theme.id === "BATMAN" && (
      <div className="flex gap-3 text-4xl">
        {[1, 2, 3, 4, 5].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRating(item)}
            className={cn(
              "transition-all duration-300 hover:scale-125",
              item <= rating
                ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]"
                : "opacity-50"
            )}
          >
            🦇
          </button>
        ))}
      </div>
    )}

    {/* DEFAULT */}
    {theme.id === "DEFAULT" && (
      <div className="flex gap-2 text-4xl">
        {[1, 2, 3, 4, 5].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRating(item)}
            className={cn(
              "transition-all duration-300 hover:scale-125",
              item <= rating
                ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                : "opacity-50"
            )}
          >
            ★
          </button>
        ))}
      </div>
    )}
  </div>
</div>
          <button
            className={cn(
              "w-full h-12 rounded-xl font-semibold transition-all",
              themeConfig.buttonClass
            )}
          >
            Submit Response
          </button>

        </div>
      </div>
    </div>
  );
}