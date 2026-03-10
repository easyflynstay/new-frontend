import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-4xl font-semibold text-foreground">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>
          <div className="mt-10 space-y-8 text-foreground/90">
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">1. Information We Collect</h2>
              <p className="mt-2">We collect information you provide when creating an account, making a booking, or contacting us. This may include name, email, phone number, payment details, and travel preferences. We also collect usage data and cookies as described below.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p className="mt-2">We use your information to process bookings, send confirmations and updates, improve our services, comply with legal obligations, and communicate with you about offers and support. We do not sell your personal data to third parties.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">3. Sharing of Information</h2>
              <p className="mt-2">We may share your information with airlines, payment processors, and other service providers necessary to fulfil your bookings. We require such parties to protect your data and use it only for the purposes we specify.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">4. Data Security</h2>
              <p className="mt-2">We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, or loss. Payment data is processed by certified payment providers.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">5. Your Rights</h2>
              <p className="mt-2">You may request access to, correction of, or deletion of your personal data. You may also opt out of marketing communications. To exercise these rights, contact us at Support@easyflynstay.com.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">6. Cookies and Tracking</h2>
              <p className="mt-2">We use cookies and similar technologies to improve site functionality, remember your preferences, and analyse usage. You can manage cookie settings in your browser.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">7. Contact</h2>
              <p className="mt-2">For privacy-related queries, contact us at Support@easyflynstay.com or +91 63 66 02 88 63. Address: Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
