"use client";

import React, { useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer"

import {Pricing}  from "~/components/priceTable";
const PricingPage = () => {
  
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
        {/* <ThemeToggle/> */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-10">
      
      <h1 className="text-3xl font-bold text-center mb-6 title-font-color">Pricing Plans</h1>
      <p className="text-center text-muted-foreground mb-10 flex w-1/3">
        BuildForms Builder is free to use online as well as using forms created with it.
        To integrate the builder into your own software, the pricing below applies.
      </p>

      <Pricing />
      

</main>
      <Footer />

    </div>
  );
};

export default PricingPage;
