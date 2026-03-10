import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RefundCancellationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-4xl font-semibold text-foreground">Refund &amp; Cancellation Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>
          <div className="mt-10 space-y-8 text-foreground/90">
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">1. Flight Bookings</h2>
              <p className="mt-2">Cancellation and refund eligibility for flight bookings depend on the fare rules of the airline and the ticket type purchased. We will communicate the applicable rules at the time of booking. Refunds, when permitted, may be subject to airline cancellation fees and our service fee.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">2. Refund Processing</h2>
              <p className="mt-2">Approved refunds will be processed to the original payment method within 7–14 business days, depending on your bank or card issuer. For gift card payments, the refund may be credited back to your gift card balance or as per our policy at the time of purchase.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">3. Gift Cards</h2>
              <p className="mt-2">Gift cards are non-refundable once purchased, except where required by law. Unused balance may be used toward future bookings within the validity period. Transfer of gift cards is allowed as per our gift card terms.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">4. No-Show and Late Cancellation</h2>
              <p className="mt-2">No-shows and cancellations made outside the permitted window may not qualify for a refund. We encourage you to review fare conditions before confirming your booking.</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">5. Contact</h2>
              <p className="mt-2">For cancellation or refund requests, contact us at Support@easyflynstay.com or +91 63 66 02 88 63. Our team will guide you through the process and applicable terms.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
