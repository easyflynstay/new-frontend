import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const listClass = "mt-2 list-disc space-y-1 pl-5 text-foreground/90";

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
              <p className="mt-2">
                By accessing, browsing, or using the Easyflynstay website, mobile applications, or services
                (collectively, the &ldquo;Platform&rdquo;), you acknowledge that you have read, understood, and agree
                to be legally bound by these Terms &amp; Conditions (&ldquo;Terms&rdquo;), along with our Privacy
                Policy and Refund &amp; Cancellation Policy.
              </p>
              <p className="mt-2">If you do not agree with any part of these Terms, you must not use our Platform or services.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">2. About Easyflynstay</h2>
              <p className="mt-2">
                Easyflynstay is a travel services platform that facilitates flight bookings, premium travel
                arrangements (including business and first-class tickets), gift cards, and related travel services.
              </p>
              <p className="mt-2">
                We act solely as an intermediary/aggregator between users and third-party service providers such as
                airlines, travel operators, and payment gateways. We do not own, operate, or control these third-party
                services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">3. Eligibility</h2>
              <p className="mt-2">By using our services, you confirm that:</p>
              <ul className={listClass}>
                <li>You are at least 18 years of age.</li>
                <li>You have the legal capacity to enter into binding contracts.</li>
                <li>You will use the Platform in accordance with applicable laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">4. User Account &amp; Responsibilities</h2>
              <p className="mt-2">You may be required to create an account to access certain features. You agree to:</p>
              <ul className={listClass}>
                <li>Provide accurate, current, and complete information.</li>
                <li>Maintain and promptly update your account details.</li>
                <li>Keep your login credentials secure and confidential.</li>
                <li>Accept full responsibility for all activities under your account.</li>
              </ul>
              <p className="mt-2">
                Easyflynstay reserves the right to suspend or terminate accounts that provide false information or
                engage in suspicious or fraudulent activity.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">5. Services Offered</h2>
              <p className="mt-2">Our services include but are not limited to:</p>
              <ul className={listClass}>
                <li>Flight bookings (domestic and international)</li>
                <li>Premium travel (business and first class)</li>
                <li>Travel gift cards</li>
                <li>Booking assistance and management</li>
              </ul>
              <p className="mt-2">All services are subject to:</p>
              <ul className={listClass}>
                <li>Availability</li>
                <li>Airline/provider policies</li>
                <li>Fare rules and restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">6. Pricing and Payments</h2>
              <p className="mt-2">All prices are displayed in Indian Rupees (₹) unless otherwise stated.</p>
              <p className="mt-2">Prices are dynamic and may change due to airline pricing, demand, or availability.</p>
              <p className="mt-2">Full payment is required at the time of booking unless specified otherwise.</p>
              <p className="mt-2">
                Payment methods may include credit/debit cards, UPI, net banking, or other supported gateways.
              </p>
              <p className="mt-2">Easyflynstay is not responsible for payment failures due to:</p>
              <ul className={listClass}>
                <li>Bank issues</li>
                <li>Gateway errors</li>
                <li>Insufficient funds</li>
                <li>Network problems</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">7. Booking Confirmation</h2>
              <p className="mt-2">
                A booking is considered confirmed only after successful payment and issuance of a valid ticket/PNR.
              </p>
              <p className="mt-2">
                Easyflynstay is not liable for bookings that fail due to incomplete payment or technical errors beyond
                our control.
              </p>
              <p className="mt-2">Users must verify all booking details immediately after confirmation.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">8. Cancellations, Changes &amp; Refunds</h2>
              <p className="mt-2">All cancellations, refunds, and modifications are governed by:</p>
              <ul className={listClass}>
                <li>Airline policies</li>
                <li>Fare rules</li>
                <li>Easyflynstay Refund &amp; Cancellation Policy</li>
              </ul>
              <p className="mt-2 font-medium text-foreground">Key points:</p>
              <ul className={listClass}>
                <li>Some tickets may be non-refundable or partially refundable.</li>
                <li>Refund timelines depend on airlines and payment providers.</li>
                <li>Service fees and convenience charges may be non-refundable.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">9. Third-Party Services Disclaimer</h2>
              <p className="mt-2">Easyflynstay acts only as a facilitator and shall not be held responsible for:</p>
              <ul className={listClass}>
                <li>Flight delays, cancellations, or rescheduling</li>
                <li>Denied boarding</li>
                <li>Airline operational issues</li>
                <li>Baggage loss or damage</li>
                <li>Service quality of airlines or partners</li>
              </ul>
              <p className="mt-2">All such responsibilities lie with the respective service providers.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">10. Limitation of Liability</h2>
              <p className="mt-2">To the maximum extent permitted by law, Easyflynstay shall not be liable for:</p>
              <ul className={listClass}>
                <li>Indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, revenue, or data</li>
                <li>Travel disruptions caused by airlines or external factors</li>
                <li>Force majeure events (natural disasters, strikes, pandemics, etc.)</li>
              </ul>
              <p className="mt-2">Our total liability, if any, shall not exceed the amount paid by you for the specific service.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">11. User Conduct</h2>
              <p className="mt-2">You agree not to:</p>
              <ul className={listClass}>
                <li>Use the Platform for unlawful purposes</li>
                <li>Attempt to hack, disrupt, or misuse the system</li>
                <li>Engage in fraudulent bookings or transactions</li>
                <li>Resell tickets without authorization</li>
              </ul>
              <p className="mt-2">Violation may result in account termination and legal action.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">12. Intellectual Property</h2>
              <p className="mt-2">
                All content on the Platform (logos, text, design, graphics, software) is the property of Easyflynstay
                and is protected under applicable intellectual property laws.
              </p>
              <p className="mt-2">You may not reproduce, distribute, or use any content without prior written permission.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">13. Privacy</h2>
              <p className="mt-2">
                Your use of the Platform is also governed by our Privacy Policy, which explains how we collect, use, and
                protect your data.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">14. Modifications to Terms</h2>
              <p className="mt-2">
                Easyflynstay reserves the right to update or modify these Terms at any time without prior notice.
              </p>
              <p className="mt-2">Continued use of the Platform after changes constitutes acceptance of the updated Terms.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">15. Force Majeure</h2>
              <p className="mt-2">
                We shall not be held liable for failure or delay in performance due to events beyond our control,
                including but not limited to:
              </p>
              <ul className={listClass}>
                <li>Natural disasters</li>
                <li>Government restrictions</li>
                <li>Airline strikes</li>
                <li>Technical failures</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">16. Governing Law &amp; Jurisdiction</h2>
              <p className="mt-2">
                These Terms shall be governed by and construed in accordance with the laws of India.
              </p>
              <p className="mt-2">
                All disputes shall be subject to the exclusive jurisdiction of the courts located in Bengaluru,
                Karnataka.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">17. Contact Information</h2>
              <p className="mt-2">For any questions, concerns, or support:</p>
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
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
