"use client";

import React,{useState} from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useUser } from "~/hooks/api/auth";
import { ThemeCard } from'../components/themeCard';
import {ThemePreview} from '../components/themePreview'
import { AlignCenter, GitBranch} from "lucide-react";
import FormFeatures from "~/components/features";
import { Pricing } from "~/components/priceTable";

const themes = [
  {
    id: "WANO",
    title: "Wano Country",
    subtitle: "Classic Elegant Theme",
    description:
      "Featuring falling cherry blossom petals and elegant gold accents.",
  },

  {
    id: "STARK",
    title: "Stark Tech / JARVIS",
    subtitle: "Futuristic HUD",
    description:
      "Secure hologram interface with cyan telemetry systems.",
  },

  {
    id: "BATMAN",
    title: "Gotham Knight",
    subtitle: "Premium Gothic",
    description:
      "Dark charcoal UI with golden pulse details.",
  },
];
export default function LandingPage() {
type Props = {
  theme: any;
  isActive: boolean;
  onClick: () => void;
};
  // const { user, id, isLoading } = useUser();
  const [selectedTheme, setSelectedTheme] =
  useState<(typeof themes)[number]>(
    themes[0]!
  );


const user = useUser(false)  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
       
        <section className="relative overflow-hidden py-24">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-20 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#55C96B]/20 blur-3xl" />

    <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
  </div>

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT CONTENT */}
      <div className="text-left">

        <div className="inline-flex items-center gap-2 rounded-full border border-[#55C96B]/30 bg-[#55C96B]/10 px-4 py-2 text-sm text-[#55C96B] mb-6">
          ✨ Open Source • Dynamic Themes • Analytics
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight">
          Build Stunning{" "}
          <span className="title-font-color">
            Dynamic Forms
          </span>{" "}
          With Immersive Themes
        </h1>

        <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-8">
          Create futuristic, anime-inspired and cinematic forms with powerful analytics, response tracking, visibility controls and public exploration.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-4">

          <a
            href="/auth"
            className="
              h-14
              px-8
              rounded-md title-font-color border brd
              inline-flex
              items-center
              justify-center
              hover:scale-105
              transition-all
            "
          >
            Start Building
          </a>

          <a
            href="/explore"
            className="
              h-14
              px-8
              rounded-md
              border
              border-border
              bg-card
              font-semibold
              inline-flex
              items-center
              justify-center
              sec-background
              transition-all
            "
          >
            Explore Public Forms →
          </a>

        </div>

        {/* STATS */}
        <div className="mt-14 flex gap-10">

          <div>
            <h3 className="text-3xl font-bold text-[#55C96B]">
              9+
            </h3>

            <p className="text-muted-foreground">
              Field Types
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-cyan-400">
              4
            </h3>

            <p className="text-muted-foreground">
              Dynamic Themes
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#ca9f00]">
              ∞
            </h3>

            <p className="text-muted-foreground">
              Custom Forms
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE PREVIEW */}
      <div className="relative">

        <div
          className="
            rounded-[32px]
            border
            border-[#17345d]
            bg-[#071224]
            p-6
            shadow-[0_0_60px_rgba(34,211,238,0.15)]
          "
        >

          <img
            src="/hero.png"
            alt="BuildForms Preview"
            className="rounded-2xl"
          />

        </div>

        {/* FLOATING BADGES */}

        <div className="absolute -top-5 -left-5 rounded-2xl border border-[#ca9f00] bg-[#0b1d3a] px-5 py-3 backdrop-blur-md">
          <p className="text-sm text-[#ca9f00]">
            ⚡ Dynamic Themes
          </p>
        </div>

        <div className="absolute -bottom-5 right-0 rounded-2xl border border-cyan-400 bg-[#071c2f] px-5 py-3 backdrop-blur-md">
          <p className="text-sm text-cyan-300">
            📊 Real-Time Analytics
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

<FormFeatures />
 <section className="w-full py-24 px-6">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold">
        Dynamic Database{" "}
        <span className="title-font-color">
          Form Themes
        </span>
      </h2>

      <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg">
        Transform ordinary forms into immersive branded experiences.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-10 items-center">

      {/* LEFT */}
     <div className="space-y-5 ">
  {themes.map((theme) => (
    <ThemeCard
      key={theme.id}
      theme={theme}
      isActive={
        selectedTheme.id === theme.id
      }
      onClick={() =>
        setSelectedTheme(theme)
      }
    />
  ))}
</div>

      {/* RIGHT */}
      <div>
        <ThemePreview
  theme={selectedTheme}
/>
      </div>

    </div>
  </div>
</section>

<section>
  <Pricing />
</section>


      </main>

      <Footer />
    </div>
  );
}


