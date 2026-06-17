"use client";

import React, { useState,useEffect } from "react";
import { Rocket, Crown, Building, Check } from "lucide-react";

export const Pricing: React.FC = () => {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      month: 0,
      year: 0,
      sub: "Free forever",
      color: "border-green-500",
      features: [
        "5 Forms",
        "100 Responses per Form",
        "Basic Analytics",
        "Community Support",
        "Standard Themes",
        "BuildForms Branding",
      ],
      button: "Get Started",
      icon: <Rocket className="w-6 h-6 text-green-400" />,
    },
    {
      name: "Professional",
      month: 19,
      year: 190,
      sub: "Most Popular",
      color: "border-blue-500",
      features: [
        "Unlimited Forms",
        "10,000 Responses per Form",
        "Advanced Analytics",
        "CSV Export",
        "Custom Themes",
        "Priority Support",
        // "QR Code Sharing",
        // "Password Protection",
        "No BuildForms Branding",
      ],
      button: "Upgrade Now",
      featured: true,
      icon: <Crown className="w-6 h-6 text-yellow-400" />,
    },
    {
      name: "Enterprise",
      month: 49,
      year: 490,
      sub: "For Teams",
      color: "border-purple-500",
      features: [
        "Everything in Professional",
        "API Access",
        "Custom Branding",
        "Team Collaboration",
        "White‑Label Forms",
        "Dedicated Support",
        "Conditional Logic",
        "Webhooks & Integrations",
        "99.9% SLA Uptime",
      ],
      button: "Contact Sales",
      icon: <Building className="w-6 h-6 text-purple-400" />,
    },
  ];
 
  return (
    <div className="max-w-6xl mx-auto text-white mb-10">
      {/* Header */}
      <div className="text-center mb-10">        
        <h1 className="text-3xl font-bold mb-4 title-font-color">Choose Your Plan</h1>
        <div className="flex justify-center items-center gap-4">
          <span>Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={yearly}
              onChange={() => setYearly(!yearly)}
              className="sr-only peer"
            />
            {/* Track */}
            <div className="w-14 h-7 bg-slate-600 rounded-full peer-checked:bg-yellow-500 transition"></div>
            {/* Knob */}
            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-7"></div>
          </label>
          <span>Yearly</span>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto body-font-color">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 border ${plan.color} bg-white/10 backdrop-blur hover:-translate-y-2 transition ${
              plan.featured ? "shadow-lg shadow-blue-500/50" : ""
            }`}
          >
            {/* Badge for Most Popular */}
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full flex items-center gap-2 font-bold" style={{fontSize:"10px"}}>
                <Crown className="w-4 h-4" />
                MOST POPULAR"
              </div>
            )}

            {/* Name + Icon in one line */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {plan.icon}
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold mb-1">
              {plan.month === 0 && plan.year === 0
                ? "$0"
                : `$${yearly ? plan.year : plan.month}`}
              {plan.month === 0 && plan.year === 0 ? "" : (
                <span className="text-lg font-normal text-gray-300">
                  {yearly ? "/yr" : "/mo"}
                </span>
              )}
            </p>

            <p className="text-sm text-gray-300 mb-6">{plan.sub}</p>

            {/* Features */}
            <ul className="space-y-3 mb-6 text-left text-md">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 title-font-color" />
                  <span className="">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button className="w-full py-2 rounded-md title-font-color border brd pl-5 pr-5 cursor-pointer">
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

