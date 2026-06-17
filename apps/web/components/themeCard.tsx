"use client";

import { cn } from "~/lib/utils";
import { FORM_THEMES } from "~/lib/form-themes";

type Props = {
  theme: any;
  isActive: boolean;
  onClick: () => void;
};

export function ThemeCard({
  theme,
  isActive,
  onClick,
}: Props) {
   const themeConfig =
    FORM_THEMES[
      theme.id as keyof typeof FORM_THEMES
    ];

  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer p-6 rounded-md rounded-xl card-bg border transition-all  shadow-blue-500/50 duration-300 hover:border-[#55C96B]",
                // default card style
        themeConfig.cardClass,

        // active state
        isActive &&
          "scale-[1.02] ring-0"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl title-font-color">
          {theme.title}
        </h3>
        <span className="text-xs border px-3 py-1 rounded-full">
          {theme.subtitle}
        </span>
      </div>
      <p className="text-muted-foreground mt-4">
        {theme.description}
      </p>
    </div>
  );
}