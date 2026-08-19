"use client";

import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 title-font-color">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: February 2026
        </p>

        <section className="space-y-6 text-sm leading-7 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance</h2>
            <p className="mt-2">
              By accessing or using BuildForms, you agree to these Terms of Service
              and our Privacy Policy. If you do not agree, please do not use the service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Your account</h2>
            <p className="mt-2">
              You are responsible for keeping your account credentials confidential
              and for all activity under your account.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Acceptable use</h2>
            <p className="mt-2">
              You may not use BuildForms to collect data unlawfully, to send spam,
              or to infringe the rights of others. You are responsible for the
              content of the forms you create and the data you collect through them.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Billing</h2>
            <p className="mt-2">
              Paid subscriptions are billed through Razorpay. You may cancel at any
              time; access continues until the end of the current billing period.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Termination</h2>
            <p className="mt-2">
              You may delete your account at any time. We may suspend accounts that
              violate these terms. See our Privacy Policy for how we handle your data
              on deletion.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Contact</h2>
            <p className="mt-2">
              Questions about these terms? Contact us at{" "}
              <a href="mailto:support@buildforms.in" className="underline underline-offset-2">
                support@buildforms.in
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
