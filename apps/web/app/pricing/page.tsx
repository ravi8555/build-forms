"use client";

import React, { useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer"
import { useUser } from "~/hooks/api/auth";

const PricingPage = () => {
  const user = useUser(false)
  
  const [plan, setPlan] = useState<"monthly" | "annual" | "perpetual">("monthly");

  const prices = {
    online: { monthly: "FREE", annual: "FREE", perpetual: "FREE" },
    whiteLabel: {
      monthly: "$299/mo",
      annual: "$3,590 billed annually",
      perpetual: "$7,500 one-time",
    },
    enterprise: {
      monthly: "Contact us",
      annual: "Contact us",
      perpetual: "Contact us",
    },
  };

  return (
    
     <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-3xl font-bold text-center mb-6">Pricing Plans</h1>
      <p className="text-center text-muted-foreground mb-10">
        BuildForms Builder is free to use online as well as using forms created with it.
        To integrate the builder into your own software, the pricing below applies.
      </p>

      {/* Toggle Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        {(["monthly", "annual", "perpetual"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPlan(p)}
            className={`px-6 py-2 rounded ${
              plan === p
                ? "bg-green-500 text-white"
                : "bg-muted text-foreground hover:bg-gray-300"
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Online */}
        <div className="bg-card text-card-foreground border shadow rounded p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Online</h2>
          <p className="text-muted-foreground mb-4">
            Create forms online for free. Render them with the open-source Vueform.
          </p>
          <p className="text-3xl font-bold text-green-600 mb-4">
            {prices.online[plan]}
          </p>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Start Building for Free
          </button>
        </div>

        {/* White-Label */}
        <div className="bg-card text-card-foreground border shadow rounded p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">White-Label</h2>
          <p className="text-muted-foreground mb-4">
            Integrate Vueform Builder into your software & use it on custom domains.
          </p>
          <p className="text-3xl font-bold text-muted-foreground mb-2">
            {prices.whiteLabel[plan]}
          </p>
          <button className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800">
          
            Start Free 14 Days Trial
          </button>
        </div>

        {/* Enterprise */}
        <div className="bg-card text-card-foreground border shadow rounded p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Enterprise</h2>
          <p className="text-muted-foreground mb-4">
            Full source. Wildcard domain. No telemetry. Enterprise support.
          </p>
          <p className="text-3xl font-bold text-foreground text-green-600 mb-4">
            {prices.enterprise[plan]}
          </p>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Get a custom quote
          </button>
        </div>
      </div>
</main>
      <Footer />

    </div>
  );
};

export default PricingPage;
