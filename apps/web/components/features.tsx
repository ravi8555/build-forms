"use client"

import React from 'react'

import {
  Layers3,
  ShieldCheck,
  QrCode,
  Download,
  Sparkles,
  GitBranch,
  Globe,
  BarChart3,
  Eye,
  LogIn,
  ClipboardList
} from "lucide-react";

const features = [
    {
  icon: Globe,
  title: "Public Form Explorer",
  description:
    "Discover and explore community-created public forms with live response counts.",
},
{
  icon: BarChart3,
  title: "Real-Time Analytics",
  description:
    "Track submissions, visibility stats, and response activity from your dashboard.",
},
{
  icon: Eye,
  title: "Visibility Controls",
  description:
    "Manage forms as Draft, Public, or Unlisted with flexible sharing control.",
},
{
  icon: LogIn,
  title: "Google Authentication",
  description:
    "Quick and secure login/signup using Google OAuth and protected sessions.",
},
{
  icon: Sparkles,
  title: "Dynamic Theme Engine",
  description:
    "Transform forms with anime, futuristic, and cinematic visual experiences.",
},
{
  icon: ClipboardList,
  title: "Response Management",
  description:
    "View and manage all form responses in one centralized dashboard.",
}];


const FormFeatures = () => {

  return (
    <>
    
<section className="w-full px-6">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold">
        Powerful{" "}
        <span className="title-font-color">
          Features
        </span>
      </h2>

      <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg">
        Equip your forms with modern capabilities and immersive experiences.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            // className="
            //  rounded-md border p-6 orange-card brd-1
            //   text-left
            //   transition-all
            //   duration-300
            //   hover:border-[#55C96B]
            //   hover:-translate-y-1
            // "

             className=" 
             p-6
             rounded-xl card-bg border transition-all  shadow-blue-500/50
             duration-300
             hover:border-[#55C96B]
             hover:-translate-y-1
             text-left 
            "
          >
            <div
              className="
                mb-6
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-md
                border brd-1
                bg-[#0b1d3a]
              "
            >
              <Icon
                className="text-[#ca9f00]"
                size={28}
              />
            </div>

            <h3 className="text-xl title-font-color">
              {feature.title}
            </h3>

            <p className="mt-4 text-muted-foreground leading-7">
              {feature.description}
            </p>
          </div>
        );
      })}

    </div>
  </div>
</section>
    
    </>
  )
}

export default FormFeatures