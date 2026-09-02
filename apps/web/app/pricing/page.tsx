import { cookies } from "next/headers";

import Header from "~/components/Header";
import Footer from "~/components/Footer";

import { Pricing } from "~/components/priceTable";

/**
 * The session cookie set by the API (Express) and tRPC procedures.
 * MUST match AUTHENTICATION_COOKIE_NAME in
 * packages/trpc/server/utils/cookies.ts ("authenticate-cookie").
 *
 * The cookie is httpOnly, so the client cannot read it. The server only
 * reports its *presence* to the <Pricing> component — this lets the
 * pricing page route "Upgrade" clicks correctly without firing any
 * authenticated API request for guests (no 401 console noise).
 */
const AUTH_COOKIE_NAME = "authenticate-cookie";

const PricingPage = async () => {
  const isLoggedIn = (await cookies()).has(AUTH_COOKIE_NAME);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-6 title-font-color">
          Pricing Plans
        </h1>
        <p className="text-center text-muted-foreground mb-10 flex w-1/3">
          BuildForms Builder is free to use online as well as using forms
          created with it. To integrate the builder into your own software,
          the pricing below applies.
        </p>

        <Pricing isLoggedIn={isLoggedIn} />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
