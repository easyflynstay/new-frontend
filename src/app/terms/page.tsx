import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-4xl font-semibold text-foreground">Terms &amp; Conditions</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>
          <div className="mt-10 space-y-8 text-foreground/90">
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-2">By accessing or using the Easyflynstay website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">2. Services</h2>
              <p className="mt-2">Easyflynstay provides premium flight booking services, including business and first class travel, gift cards, and booking management. We act as an intermediary between you and airlines/travel providers.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">3. User Obligations</h2>
              <p className="mt-2">You must provide accurate information when making bookings, maintain the confidentiality of your account, and use the service only for lawful purposes. You are responsible for all activity under your account.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">4. Bookings and Payment</h2>
              <p className="mt-2">All prices are displayed in Indian Rupees (₹) unless otherwise stated. Payment is due at the time of booking as per the chosen method. Bookings are subject to availability and provider terms.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">5. Cancellations and Refunds</h2>
              <p className="mt-2">Cancellation and refund terms are set out in our Refund &amp; Cancellation Policy. By making a booking, you accept those terms.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
              <p className="mt-2">To the fullest extent permitted by law, Easyflynstay shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or from travel arrangements made through us.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">7. Governing Law</h2>
              <p className="mt-2">These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">8. Contact</h2>
              <p className="mt-2">For questions about these Terms, contact us at support@easyflynstay.com or +91 7090005700.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
