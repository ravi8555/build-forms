"use client";

import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 title-font-color">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: February 2026
        </p>

        <section className="space-y-6 text-sm leading-7 text-muted-foreground">
          <p>
            BuildForms (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to
            protecting your personal data and your privacy. This Privacy Policy
            explains what information we collect, why we collect it, and the
            rights you have under the General Data Protection Regulation (GDPR).
          </p>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Data we collect</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Account data: name, email address, password (hashed).</li>
              <li>Content you create: forms, form fields, and responses submitted through your forms.</li>
              <li>Billing data: subscription status and Razorpay transaction references (we never store full card details).</li>
              <li>Technical data: cookies and usage data, used only with your consent.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. How we use your data</h2>
            <p className="mt-2">
              We process your data to provide and improve the BuildForms service,
              authenticate your account, process payments, and — only with your
              consent — for analytics and marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Your GDPR rights</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Access:</strong> request a copy of your personal data.</li>
              <li><strong>Rectification:</strong> correct inaccurate or incomplete data.</li>
              <li><strong>Erasure:</strong> request deletion of your account and data.</li>
              <li><strong>Portability:</strong> export your data in a machine-readable format.</li>
              <li><strong>Object / Restrict:</strong> object to or restrict certain processing.</li>
              <li><strong>Withdraw consent:</strong> change your cookie preferences at any time.</li>
            </ul>
            <p className="mt-2">
              You can exercise these rights from your dashboard under{" "}
              <strong>Privacy &amp; Data</strong>, or by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Cookies</h2>
            <p className="mt-2">
              We use essential cookies for authentication and security, and optional
              cookies for analytics and marketing only with your consent. You can
              manage your preferences using the cookie settings in the footer.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Data retention &amp; security</h2>
            <p className="mt-2">
              We retain your data only as long as necessary to provide the service.
              We use industry-standard security measures to protect your information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Contact</h2>
            <p className="mt-2">
              For any privacy questions or to exercise your rights, contact us at{" "}
              <a href="mailto:privacy@buildforms.in" className="underline underline-offset-2">
                privacy@buildforms.in
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
