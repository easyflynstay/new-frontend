import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const listClass = "mt-2 list-disc space-y-1 pl-5 text-foreground/90";

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
              <p className="mt-2">
                Easyflynstay (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your
                privacy and ensuring transparency in how your personal data is collected, used, and safeguarded.
              </p>
              <p className="mt-2">
                This Privacy Policy applies to your use of our website, mobile applications, and services
                (collectively, the &ldquo;Platform&rdquo;).
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">1. Information We Collect</h2>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">1.1 Information You Provide</h3>
              <p className="mt-2">We collect personal information when you:</p>
              <ul className={listClass}>
                <li>Create an account</li>
                <li>Make a booking</li>
                <li>Contact customer support</li>
                <li>Subscribe to communications</li>
              </ul>
              <p className="mt-2">This may include:</p>
              <ul className={listClass}>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing and payment details</li>
                <li>Travel preferences</li>
                <li>Identification details (if required by airlines)</li>
              </ul>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">1.2 Automatically Collected Information</h3>
              <p className="mt-2">When you use our Platform, we automatically collect:</p>
              <ul className={listClass}>
                <li>IP address</li>
                <li>Device information (browser type, OS)</li>
                <li>Location data (approximate)</li>
                <li>Pages visited and interactions</li>
                <li>Booking/search history</li>
              </ul>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">1.3 Cookies and Tracking Technologies</h3>
              <p className="mt-2">We use cookies, pixels, and similar technologies to:</p>
              <ul className={listClass}>
                <li>Enable core functionality</li>
                <li>Store preferences</li>
                <li>Analyze usage patterns</li>
                <li>Improve performance</li>
              </ul>
              <p className="mt-2">You can control cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p className="mt-2">We use your data for the following purposes:</p>
              <ul className={listClass}>
                <li>To process and manage bookings</li>
                <li>To send confirmations, alerts, and travel updates</li>
                <li>To provide customer support</li>
                <li>To improve our Platform and services</li>
                <li>To personalize user experience</li>
                <li>To comply with legal and regulatory obligations</li>
                <li>To detect fraud, abuse, or security threats</li>
                <li>To send promotional offers (with opt-out option)</li>
              </ul>
              <p className="mt-2">We do not sell your personal data.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                3. Legal Basis for Processing (India – DPDP Compliance)
              </h2>
              <p className="mt-2">We process your personal data based on:</p>
              <ul className={listClass}>
                <li>Your consent</li>
                <li>Performance of a contract (e.g., booking services)</li>
                <li>Legal obligations</li>
                <li>Legitimate business interests (e.g., fraud prevention, service improvement)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">4. Sharing of Information</h2>
              <p className="mt-2">We may share your information with:</p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">4.1 Service Providers</h3>
              <ul className={listClass}>
                <li>Airlines and travel partners</li>
                <li>Payment gateways and banks</li>
                <li>IT and cloud service providers</li>
              </ul>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">4.2 Legal Authorities</h3>
              <p className="mt-2">When required by law, regulation, or legal process.</p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">4.3 Business Transfers</h3>
              <p className="mt-2">In case of merger, acquisition, or sale of assets.</p>

              <p className="mt-4">All third parties are required to:</p>
              <ul className={listClass}>
                <li>Use your data only for specified purposes</li>
                <li>Maintain appropriate data protection standards</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">5. International Data Transfers</h2>
              <p className="mt-2">
                Your data may be transferred to and processed in countries outside India where our partners or service
                providers operate.
              </p>
              <p className="mt-2">
                We ensure such transfers comply with applicable data protection laws and maintain adequate safeguards.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">6. Data Retention</h2>
              <p className="mt-2">We retain your personal data only for as long as necessary to:</p>
              <ul className={listClass}>
                <li>Fulfill the purposes outlined in this Policy</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="mt-2">When no longer required, data is securely deleted or anonymized.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">7. Data Security</h2>
              <p className="mt-2">We implement industry-standard security measures, including:</p>
              <ul className={listClass}>
                <li>Encryption of sensitive data</li>
                <li>Secure servers and firewalls</li>
                <li>Access control and authentication mechanisms</li>
              </ul>
              <p className="mt-2">
                However, no system is 100% secure. You acknowledge that you share information at your own risk.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">8. Your Rights</h2>
              <p className="mt-2">Subject to applicable laws, you have the right to:</p>
              <ul className={listClass}>
                <li>Access your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Opt out of marketing communications</li>
                <li>Lodge complaints with regulatory authorities</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, contact us at{" "}
                <a href="mailto:support@easyflynstay.com" className="text-primary underline underline-offset-2">
                  support@easyflynstay.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">9. Children&apos;s Privacy</h2>
              <p className="mt-2">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                personal data from children.
              </p>
              <p className="mt-2">If such data is identified, it will be deleted promptly.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">10. Third-Party Links</h2>
              <p className="mt-2">Our Platform may contain links to third-party websites or services.</p>
              <p className="mt-2">We are not responsible for:</p>
              <ul className={listClass}>
                <li>Their privacy practices</li>
                <li>Their content or policies</li>
              </ul>
              <p className="mt-2">Users are advised to review their privacy policies separately.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">11. Changes to This Privacy Policy</h2>
              <p className="mt-2">We may update this Privacy Policy from time to time.</p>
              <p className="mt-2">
                Changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. Continued use of
                the Platform constitutes acceptance of these changes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">12. Contact Information</h2>
              <p className="mt-2">For privacy-related queries or concerns:</p>
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
                <li>
                  Address:
                  <br />
                  <span className="mt-1 block pl-0">
                    Ground Floor, Plot No: 128-P2,
                    <br />
                    Near Ginger Hotel, EPIP Zone,
                    <br />
                    Whitefield, Bengaluru, Karnataka 560066, India
                  </span>
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
