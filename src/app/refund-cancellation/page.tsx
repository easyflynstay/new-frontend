import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const listClass = "mt-2 list-disc space-y-1 pl-5 text-foreground/90";

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
              <p className="mt-2">
                This Refund &amp; Cancellation Policy (&ldquo;Policy&rdquo;) governs all cancellations, changes, and
                refund requests made through Easyflynstay (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;). By
                making a booking on our Platform, you agree to this Policy along with our Terms &amp; Conditions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">1. General Policy Framework</h2>
              <p className="mt-2">
                Easyflynstay acts as an intermediary between users and third-party service providers such as airlines
                and payment gateways.
              </p>
              <p className="mt-2">All cancellations, modifications, and refunds are subject to:</p>
              <ul className={listClass}>
                <li>Airline fare rules and policies</li>
                <li>Ticket type and booking class</li>
                <li>Applicable service fees and charges</li>
              </ul>
              <p className="mt-2">
                Easyflynstay does not control airline policies and is not liable for decisions made by airlines
                regarding refunds or cancellations.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">2. Flight Booking Cancellations</h2>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">2.1 Airline Fare Rules</h3>
              <p className="mt-2">Each ticket is governed by its specific fare rules.</p>
              <p className="mt-2">Tickets may be:</p>
              <ul className={listClass}>
                <li>Fully refundable</li>
                <li>Partially refundable</li>
                <li>Non-refundable</li>
              </ul>
              <p className="mt-2">
                These rules are displayed (or communicated) at the time of booking. Users are responsible for reviewing
                them before confirming.
              </p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">2.2 Cancellation Requests</h3>
              <p className="mt-2">Cancellation requests must be initiated through:</p>
              <ul className={listClass}>
                <li>Easyflynstay support team, or</li>
                <li>Airline directly (if applicable)</li>
              </ul>
              <p className="mt-2">
                The time of cancellation request is calculated based on when the request is successfully logged in our
                system.
              </p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">2.3 Charges Applicable</h3>
              <p className="mt-2">Refunds may be subject to:</p>
              <ul className={listClass}>
                <li>Airline cancellation charges</li>
                <li>Fare difference (for modifications)</li>
                <li>Easyflynstay service/convenience fees (non-refundable unless stated otherwise)</li>
                <li>Payment gateway charges (if applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">3. Refund Eligibility</h2>
              <p className="mt-2">Refunds are applicable only if:</p>
              <ul className={listClass}>
                <li>The ticket fare rules permit cancellation</li>
                <li>The request is made within the allowed cancellation window</li>
                <li>The airline approves the refund</li>
              </ul>
              <p className="mt-2">No refund will be provided in cases of:</p>
              <ul className={listClass}>
                <li>Non-refundable tickets</li>
                <li>No-show scenarios</li>
                <li>Expired or partially used tickets (unless airline permits)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">4. Refund Processing Timeline</h2>
              <p className="mt-2">
                Approved refunds are processed within 7–14 business days from confirmation.
              </p>
              <p className="mt-2">Actual credit timelines depend on:</p>
              <ul className={listClass}>
                <li>Bank processing time</li>
                <li>Payment method used</li>
                <li>Airline processing delays</li>
              </ul>
              <p className="mt-2">Refunds will be issued to:</p>
              <ul className={listClass}>
                <li>The original payment method, or</li>
                <li>Alternative method (if required and agreed)</li>
              </ul>
              <p className="mt-2">
                Easyflynstay is not responsible for delays caused by banks, payment gateways, or airlines.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">5. Gift Card Policy</h2>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">5.1 Refunds</h3>
              <p className="mt-2">
                Gift cards are non-refundable and non-cancellable once purchased, except where required by law.
              </p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">5.2 Usage</h3>
              <p className="mt-2">Gift cards can be used for eligible bookings on the Platform.</p>
              <p className="mt-2">Partial usage is allowed; remaining balance stays valid until expiry.</p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">5.3 Expiry</h3>
              <p className="mt-2">Gift cards must be used within the validity period mentioned at purchase.</p>
              <p className="mt-2">Expired gift cards cannot be revalidated or refunded.</p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">5.4 Transferability</h3>
              <p className="mt-2">Gift cards may be transferable unless restricted by specific promotional terms.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">6. No-Show &amp; Missed Flights</h2>
              <p className="mt-2">If you fail to board your flight (&ldquo;No-Show&rdquo;):</p>
              <ul className={listClass}>
                <li>Refund eligibility depends entirely on airline rules</li>
                <li>Most fares are non-refundable in no-show cases</li>
                <li>Late cancellations (after allowed window) are treated as no-show.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                7. Schedule Changes, Delays &amp; Cancellations by Airline
              </h2>
              <p className="mt-2">In cases where:</p>
              <ul className={listClass}>
                <li>Flights are cancelled</li>
                <li>Flights are significantly delayed</li>
                <li>Schedule changes occur</li>
              </ul>
              <p className="mt-2">Refunds or alternatives (rescheduling/credit) are governed by:</p>
              <ul className={listClass}>
                <li>Airline policies</li>
                <li>Regulatory guidelines</li>
              </ul>
              <p className="mt-2">Easyflynstay will assist you, but final decisions rest with the airline.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">8. Partial Cancellations</h2>
              <p className="mt-2">For round-trip or multi-leg bookings:</p>
              <ul className={listClass}>
                <li>Cancelling one segment may impact the remaining journey</li>
                <li>Airlines may cancel onward/return segments automatically</li>
              </ul>
              <p className="mt-2">Users must confirm implications before cancelling any part of the booking.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">9. Failed Transactions &amp; Duplicate Payments</h2>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">9.1 Failed Bookings</h3>
              <p className="mt-2">If payment is deducted but booking is not confirmed:</p>
              <p className="mt-2">Amount will be refunded automatically within 5–10 business days</p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">9.2 Duplicate Payments</h3>
              <p className="mt-2">Any excess amount paid due to technical errors will be refunded after verification.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">10. Fraudulent or Misuse Cases</h2>
              <p className="mt-2">Easyflynstay reserves the right to:</p>
              <ul className={listClass}>
                <li>Deny refunds</li>
                <li>Suspend accounts</li>
              </ul>
              <p className="mt-2">In cases involving:</p>
              <ul className={listClass}>
                <li>Fraudulent transactions</li>
                <li>Abuse of refund systems</li>
                <li>Suspicious booking patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">11. Force Majeure</h2>
              <p className="mt-2">No refunds or compensation shall be guaranteed for disruptions caused by:</p>
              <ul className={listClass}>
                <li>Natural disasters</li>
                <li>Government restrictions</li>
                <li>Pandemics</li>
                <li>Strikes or external events</li>
              </ul>
              <p className="mt-2">Refunds, if any, will depend on airline policies.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">12. Chargebacks &amp; Disputes</h2>
              <p className="mt-2">Initiating a chargeback without contacting Easyflynstay may result in:</p>
              <ul className={listClass}>
                <li>Account suspension</li>
                <li>Denial of future services</li>
              </ul>
              <p className="mt-2">We strongly encourage users to contact our support team before raising disputes.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">13. How to Request Cancellation or Refund</h2>
              <p className="mt-2">To initiate a request:</p>
              <ul className={`${listClass} mt-2`}>
                <li>
                  Email:{" "}
                  <a href="mailto:support@easyflynstay.com" className="text-primary underline underline-offset-2">
                    support@easyflynstay.com
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a href="tel:+917090005700" className="text-primary underline underline-offset-2">
                    +91 7090005700
                  </a>
                </li>
              </ul>
              <p className="mt-2">Provide:</p>
              <ul className={listClass}>
                <li>Booking ID / PNR</li>
                <li>Passenger name</li>
                <li>Reason for cancellation</li>
              </ul>
              <p className="mt-2">Our team will guide you through applicable options and charges.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">14. Policy Updates</h2>
              <p className="mt-2">Easyflynstay reserves the right to modify this Policy at any time.</p>
              <p className="mt-2">
                Updates will be reflected on this page with the revised &ldquo;Last Updated&rdquo; date.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
