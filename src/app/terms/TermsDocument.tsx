import Link from "next/link";

const p = "mt-3 text-[15px] sm:text-base leading-[1.75] text-foreground/[0.88]";
const ul = "mt-3 list-disc space-y-2 pl-6 text-[15px] sm:text-base leading-[1.75] text-foreground/[0.88]";
const ol = "mt-3 list-decimal space-y-2 pl-6 text-[15px] sm:text-base leading-[1.75] text-foreground/[0.88]";
const h2 = "font-body text-lg sm:text-xl font-bold tracking-tight text-foreground scroll-mt-24";
const h3 = "font-body text-base font-semibold text-foreground mt-6";
const link = "text-primary underline underline-offset-2 hover:text-primary/80";

export function TermsDocument() {
  return (
    <article className="text-left [&>section]:mt-12 [&>section]:border-t [&>section]:border-border/70 [&>section]:pt-10 sm:[&>section]:mt-14 sm:[&>section]:pt-12 [&>section:first-of-type]:mt-14 sm:[&>section:first-of-type]:mt-16">
      <header className="border-b border-border pb-8">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">EasyFlyNStay</p>
        <h1 className="font-body mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Effective Date: March 2026&nbsp;&nbsp;|&nbsp;&nbsp;Last Updated: March 2026
        </p>
        <p className={`${p} mt-2 text-sm`}>
          Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066
        </p>
        <p className="mt-2 text-sm text-foreground/80">
          <a href="https://www.easyflynstay.com" className={link} target="_blank" rel="noopener noreferrer">
            www.easyflynstay.com
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="tel:+917090005700" className={link}>
            +91 7090005700
          </a>
        </p>
      </header>

      <p className="mt-8 font-body text-sm font-bold uppercase tracking-wide text-foreground">
        Please read these terms and conditions carefully before using our platform or availing any services.
      </p>

      <p className={p}>
        These Terms and Conditions (&ldquo;Terms&rdquo;, &ldquo;Agreement&rdquo;, &ldquo;User Agreement&rdquo;)
        constitute a comprehensive, legally binding contract between you, the user (&ldquo;User&rdquo;, &ldquo;You&rdquo;,
        &ldquo;Your&rdquo;) and EasyFlyNStay, a premium travel services platform registered and operating under the
        laws of the Republic of India, with its principal place of business at Ground Floor, Plot No: 128-P2, Near
        Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066 (hereinafter referred to as
        &ldquo;EasyFlyNStay&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo;, &ldquo;Our&rdquo;, &ldquo;Platform
        Operator&rdquo;, or &ldquo;Company&rdquo;).
      </p>
      <p className={p}>
        This Agreement governs your access to and use of the EasyFlyNStay website available at{" "}
        <a href="https://www.easyflynstay.com" className={link} target="_blank" rel="noopener noreferrer">
          www.easyflynstay.com
        </a>
        , as well as any associated mobile applications, software tools, digital interfaces, APIs, and related travel
        services offered by EasyFlyNStay (collectively referred to as the &ldquo;Platform&rdquo;). By accessing,
        navigating, browsing, registering an account, making an inquiry, placing a booking, or otherwise using the
        Platform in any manner, you unconditionally and irrevocably acknowledge that you have carefully read,
        thoroughly understood, and agreed to be fully and legally bound by these Terms, together with all documents
        expressly incorporated herein by reference, including but not limited to our{" "}
        <Link href="/privacy" className={link}>
          Privacy Policy
        </Link>
        ,{" "}
        <Link href="/refund-cancellation" className={link}>
          Refund &amp; Cancellation Policy
        </Link>
        , and any supplemental policies or guidelines published on the Platform from time to time.
      </p>
      <p className={p}>
        EasyFlyNStay reserves the right, at its sole and absolute discretion, to amend, modify, revise, supplement, or
        replace any part of these Terms at any time without prior notice to individual users. Such amendments shall be
        effective immediately upon being published on the Platform. The &ldquo;Last Updated&rdquo; date indicated at the
        top of this document will reflect the most recent revision. Your continued access to or use of the Platform
        after any such changes have been posted constitutes your acceptance of the revised Terms. It is your sole
        responsibility to check the Terms periodically for updates and to remain informed of any changes.
      </p>
      <p className={p}>
        If you do not agree to any provision of these Terms, or to any subsequent modification thereof, you must
        immediately cease all use of the Platform. Accessing or using the Platform in any capacity constitutes your
        legally valid and binding acceptance of these Terms in their entirety.
      </p>

      <section>
        <h2 className={h2}>1. About EasyFlyNStay</h2>
        <p className={p}>
          EasyFlyNStay is a technology-enabled premium travel services platform headquartered in Bengaluru, Karnataka,
          India. We specialize in facilitating high-quality, seamless travel experiences with a particular focus on
          premium cabin bookings, including Business Class and First Class air travel, as well as Economy class domestic
          and international flight bookings. Our platform is designed to cater to discerning travelers who value
          convenience, comfort, personalized service, and comprehensive travel assistance.
        </p>
        <p className={p}>
          EasyFlyNStay operates as an intermediary, aggregator, and technology facilitator between users and a network
          of third-party service providers that includes airlines, aircraft operators, ground transportation partners,
          hotels and accommodation providers, payment gateway partners, and insurance companies. It is important for
          users to understand that EasyFlyNStay does not own, operate, manage, or directly control any of the
          third-party travel services made available through the Platform. Our role is to provide a convenient, trusted
          digital interface through which users can discover, compare, and book travel services, supported by expert
          assistance from our dedicated concierge team.
        </p>
        <p className={p}>
          Our mission is to make premium travel accessible and effortless. We pride ourselves on offering a curated
          selection of flight options, a user-friendly booking experience, transparent pricing, and dedicated 24/7
          customer support. Whether you are booking a last-minute economy ticket or a meticulously planned luxury
          international itinerary, EasyFlyNStay is committed to supporting you at every step of your journey.
        </p>
        <p className={p}>
          EasyFlyNStay also offers ancillary travel services such as travel gift cards, booking management tools,
          itinerary tracking, and travel advisory services. These services are designed to complement the core booking
          experience and provide additional value to our users.
        </p>
      </section>

      <section>
        <h2 className={h2}>2. Acceptance of Terms</h2>
        <p className={p}>
          These Terms apply to all visitors, registered users, and anyone who accesses or uses the Platform in any
          manner whatsoever. By using the Platform, you represent, warrant, and confirm that you have the full legal
          authority and capacity to enter into a binding agreement, and that you accept all the obligations set forth
          in these Terms.
        </p>
        <p className={p}>
          These Terms shall be binding on the User regardless of the mode of access, whether through a desktop browser,
          mobile web browser, native iOS application, Android application, or any other device or digital interface.
          The Terms shall also apply whether you are using the Platform to merely browse available options or to
          complete a purchase or booking transaction.
        </p>
        <p className={p}>
          If you are accessing or using the Platform on behalf of another person, a company, a business entity, or any
          other organization, you represent and warrant that you have the requisite authority to bind such person or
          entity to these Terms, and that by accepting these Terms, such person or entity agrees to be bound by all the
          provisions hereof. In such cases, the term &ldquo;User&rdquo; shall refer to both you individually and the
          entity on whose behalf you are acting.
        </p>
        <p className={p}>
          EasyFlyNStay also reserves the right to deny access to the Platform or any part of its services to any User at
          any time, for any reason, including for conduct that we believe violates these Terms or is harmful to other
          users, us, third parties, or the public.
        </p>
      </section>

      <section>
        <h2 className={h2}>3. Eligibility to Use the Platform</h2>
        <p className={p}>
          The Platform and its services are intended solely for individuals who are legally capable of entering into
          binding contracts under the laws of India and any other jurisdiction applicable to the User. The following
          eligibility conditions apply to all Users:
        </p>
        <ul className={ul}>
          <li>You must be at least 18 years of age to register an account, make a booking, or purchase services on the Platform.</li>
          <li>You must possess the legal capacity to enter into a binding contract under the Indian Contract Act, 1872, and any other applicable laws.</li>
          <li>You must not be a person barred from receiving services under applicable laws of India or any other jurisdiction.</li>
          <li>You must not be subject to any court order, injunction, or legal restriction that would prevent you from entering into contracts.</li>
          <li>If you are a resident of a jurisdiction outside India, you must comply with all applicable laws of your home jurisdiction in addition to these Terms.</li>
        </ul>
        <p className={p}>
          If you are a minor (below 18 years of age), you are not permitted to independently register on the Platform or
          make bookings. However, a minor may use the Platform under the direct supervision and with the active consent
          of a parent or legally recognized guardian who accepts these Terms on the minor&apos;s behalf and takes full
          responsibility for the minor&apos;s use of the Platform and any services availed.
        </p>
        <p className={p}>
          EasyFlyNStay reserves the right to verify the eligibility of any User at any time and to refuse, cancel, or
          reverse any booking or transaction made by a User who does not meet the eligibility criteria. Any such
          refusal or cancellation shall be governed by the applicable refund policy.
        </p>
        <p className={p}>
          By using the Platform, you confirm that all of the above eligibility criteria are met and that you will
          continue to meet them for as long as you remain a registered User or continue to use the Platform.
        </p>
      </section>

      <section>
        <h2 className={h2}>4. User Account, Registration, and Responsibilities</h2>
        <h3 className={h3}>4.1 Account Registration</h3>
        <p className={p}>
          Certain features, services, and functionalities of the Platform require the creation of a registered user
          account. When you register for an account, you are required to provide accurate, complete, truthful, and
          up-to-date personal information, including but not limited to your full legal name as it appears on your
          government-issued photo identification, a valid and active email address, a working mobile phone number, and
          any other details requested during the registration process. You agree to keep all account information updated
          and to promptly notify EasyFlyNStay of any changes to ensure the accuracy of your account details at all
          times.
        </p>
        <p className={p}>
          By completing the registration process, you represent and warrant that all information provided by you is
          true, accurate, current, and complete to the best of your knowledge. The provision of false, misleading, or
          incomplete information constitutes a material breach of these Terms and may result in the suspension or
          permanent termination of your account without prior notice.
        </p>
        <h3 className={h3}>4.2 Account Security and Confidentiality</h3>
        <p className={p}>
          You are solely responsible for maintaining the confidentiality and security of your account credentials,
          including your username, password, OTPs (One-Time Passwords), and any other authentication information. You
          agree to:
        </p>
        <ul className={ul}>
          <li>Create a strong, unique password that is not used for any other online account or service.</li>
          <li>Never share your login credentials, password, or account access with any third party under any circumstances.</li>
          <li>Log out of your account after each session, particularly when accessing the Platform from shared or public devices.</li>
          <li>
            Notify EasyFlyNStay immediately at{" "}
            <a href="mailto:support@easyflynstay.com" className={link}>
              support@easyflynstay.com
            </a>{" "}
            or{" "}
            <a href="tel:+917090005700" className={link}>
              +91 7090005700
            </a>{" "}
            if you suspect any unauthorized access to your account, compromise of your credentials, or any other security breach.
          </li>
          <li>Not allow any other person to use your account to make bookings, purchases, or interact with the Platform.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay will not be held liable for any loss, damage, or unauthorized transactions arising from your
          failure to maintain the security of your account credentials. You acknowledge that all activities conducted
          under your account, whether authorized by you or not, are your sole responsibility unless you have timely
          notified EasyFlyNStay of any unauthorized access.
        </p>
        <h3 className={h3}>4.3 Account Termination and Suspension</h3>
        <p className={p}>
          EasyFlyNStay reserves the right to suspend, deactivate, or permanently terminate your account at any time,
          without prior notice, in the event of:
        </p>
        <ul className={ul}>
          <li>Provision of false, inaccurate, or misleading registration information.</li>
          <li>Breach of any provision of these Terms or any applicable laws or regulations.</li>
          <li>Engagement in fraudulent activities, unauthorized use of payment instruments, or any conduct that harms EasyFlyNStay, other users, or third parties.</li>
          <li>Suspicious or unusual account activity that suggests unauthorized access or misuse.</li>
          <li>Non-compliance with any lawful directive or request from EasyFlyNStay.</li>
        </ul>
        <p className={p}>
          Upon termination of your account, your access to the Platform and its services will be immediately revoked.
          Any pending bookings at the time of termination will be handled in accordance with the applicable cancellation
          and refund policies. EasyFlyNStay shall not be liable to you or any third party for any consequence arising
          from the termination of your account.
        </p>
      </section>

      <section>
        <h2 className={h2}>5. Services Offered by EasyFlyNStay</h2>
        <p className={p}>
          EasyFlyNStay offers a comprehensive suite of travel-related services through the Platform. The scope of our
          services, subject to availability and applicable policies, includes but is not limited to:
        </p>
        <h3 className={h3}>5.1 Flight Bookings</h3>
        <p className={p}>
          EasyFlyNStay facilitates both domestic and international flight bookings across all cabin classes, including
          Economy, Premium Economy, Business Class, and First Class. Users can search, compare, and book flights operated
          by a wide range of domestic and international airlines. All flight bookings are subject to:
        </p>
        <ul className={ul}>
          <li>Real-time seat availability as maintained by the respective airline&apos;s inventory management systems.</li>
          <li>Fare rules, booking conditions, and restrictions applicable to the selected fare class and ticket type.</li>
          <li>The terms and conditions of the operating airline.</li>
          <li>Applicable government regulations, aviation authority directives, and international travel advisories.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay makes no representations or warranties regarding the accuracy, completeness, or currency of
          flight schedules, fares, or availability information. This information is provided by airlines and is subject
          to change at any time without notice.
        </p>
        <h3 className={h3}>5.2 Premium Travel Services</h3>
        <p className={p}>
          As a premium travel platform, EasyFlyNStay specializes in facilitating Business Class and First Class bookings
          with access to a wide portfolio of international carriers. Our premium travel services include dedicated fare
          search across multiple cabin classes, access to consolidated and negotiated fares where available, personalized
          booking assistance, and guidance on airline-specific amenities, lounge access, baggage policies, and upgrade
          options. Premium travel bookings are subject to the same eligibility, pricing, and cancellation terms as
          standard flight bookings unless otherwise specified.
        </p>
        <h3 className={h3}>5.3 Travel Gift Cards</h3>
        <p className={p}>
          EasyFlyNStay offers travel gift cards that can be purchased and redeemed toward flight bookings made through the
          Platform. Gift cards are issued in denominations as specified on the Platform and are subject to their own
          specific terms and conditions, including validity periods, redemption rules, and non-transferability clauses.
          Gift card values are non-refundable in cash unless mandated by applicable law. Gift cards may not be used to
          purchase other gift cards and are not replaceable if lost, stolen, or damaged.
        </p>
        <h3 className={h3}>5.4 Booking Management and Concierge Services</h3>
        <p className={p}>
          EasyFlyNStay provides a dedicated booking management interface that allows registered users to view, track,
          amend, and manage their travel itineraries. Our 24/7 concierge support team is available to assist with
          booking inquiries, modifications, cancellations, special service requests, airline-specific queries, and
          general travel advisory support. Concierge services are provided as a value-added facility and do not
          constitute a guarantee of any specific outcome with respect to airline or service provider actions.
        </p>
      </section>

      <section>
        <h2 className={h2}>6. Pricing, Taxes, and Payment Policy</h2>
        <h3 className={h3}>6.1 Price Display and Currency</h3>
        <p className={p}>
          All prices displayed on the Platform are denominated in Indian Rupees (INR / ₹) unless otherwise explicitly
          stated at the time of the transaction. For international bookings or in cases where users are accessing the
          Platform from outside India, currency conversion rates, foreign transaction fees, or international payment
          processing charges may be applied by the user&apos;s bank or card issuer. EasyFlyNStay is not responsible for
          any such additional charges.
        </p>
        <p className={p}>
          Prices displayed on the Platform are dynamic in nature and are subject to continuous change based on airline
          pricing algorithms, real-time seat inventory, demand fluctuations, seasonal pricing adjustments, fuel
          surcharge revisions, and changes in government-mandated taxes and levies. The fare applicable to a booking
          shall be the fare confirmed at the time of successful payment processing and issuance of the ticket or booking
          confirmation, not necessarily the fare initially displayed during the search.
        </p>
        <h3 className={h3}>6.2 Inclusions and Exclusions in Pricing</h3>
        <p className={p}>The total price displayed at the final checkout screen generally includes the following components:</p>
        <ul className={ul}>
          <li>Base fare as set by the airline or service provider for the selected route and cabin class.</li>
          <li>Airport Development Fees (ADF), User Development Fees (UDF), or Passenger Service Fees as applicable.</li>
          <li>Fuel surcharges, airline-imposed levies, and carrier charges.</li>
          <li>Applicable government taxes including Goods and Services Tax (GST) on the service component.</li>
          <li>EasyFlyNStay service fee or convenience fee (if separately disclosed and applicable).</li>
        </ul>
        <p className={p}>Unless explicitly stated at checkout, the total price does NOT include:</p>
        <ul className={ul}>
          <li>Airline seat selection fees (where seat selection is a paid ancillary service).</li>
          <li>Excess or checked baggage charges beyond the airline&apos;s free baggage allowance.</li>
          <li>In-flight meals, beverages, or entertainment charges (except where included in the fare).</li>
          <li>Travel insurance premiums unless specifically selected and added to the booking.</li>
          <li>Visa fees, passport fees, or any government-imposed border entry charges.</li>
          <li>Ground transportation, hotel accommodation, or any services not explicitly included in the booking.</li>
          <li>Personal expenses including communication charges, tips, porter fees, or similar incidental costs.</li>
        </ul>
        <h3 className={h3}>6.3 Accepted Payment Methods</h3>
        <p className={p}>EasyFlyNStay supports a wide range of payment methods to ensure convenience for all users. The following payment options are available on the Platform:</p>
        <ul className={ul}>
          <li>Credit Cards: Visa, Mastercard, American Express (Amex), RuPay Credit</li>
          <li>Debit Cards: Visa, Mastercard, Maestro, RuPay Debit</li>
          <li>Net Banking: All major Indian banks including SBI, HDFC, ICICI, Axis, Kotak, PNB, Bank of Baroda, and others</li>
          <li>UPI (Unified Payments Interface): Google Pay, PhonePe, Paytm, BHIM UPI, and all other UPI-enabled apps</li>
          <li>Digital Wallets: Paytm Wallet, Amazon Pay, MobiKwik, and other supported wallet platforms</li>
          <li>EasyFlyNStay Gift Cards: Redeemable for eligible bookings as per gift card terms</li>
        </ul>
        <p className={p}>
          Payment method availability may vary based on the nature of the booking, the operating airline&apos;s payment
          preferences, and current gateway configurations. EasyFlyNStay reserves the right to add, modify, or withdraw
          available payment methods at any time without prior notice.
        </p>
        <p className={p}>
          Full payment is mandatory at the time of booking confirmation unless a deferred payment or installment
          arrangement is explicitly offered and confirmed in writing by EasyFlyNStay.
        </p>
        <h3 className={h3}>6.4 Payment Security</h3>
        <p className={p}>
          EasyFlyNStay employs industry-standard security protocols including Secure Socket Layer (SSL) encryption,
          PCI-DSS compliant payment gateways, and multi-factor authentication mechanisms to ensure that all payment
          transactions processed on the Platform are secure. Your sensitive financial information, including card numbers
          and banking credentials, is handled exclusively by our certified payment gateway partners and is never stored
          on EasyFlyNStay&apos;s servers.
        </p>
        <p className="mt-4 rounded-sm border border-primary/20 bg-primary/[0.04] px-4 py-3 text-sm font-semibold leading-relaxed text-foreground">
          IMPORTANT SECURITY NOTICE: EasyFlyNStay representatives will NEVER ask for your credit or debit card number,
          CVV, expiry date, OTP, internet banking password, or any other sensitive financial or personal security
          information via phone, email, SMS, WhatsApp, or any other communication channel. Never share such information
          with anyone claiming to be from EasyFlyNStay. Report any suspicious communication to{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          or call{" "}
          <a href="tel:+917090005700" className={link}>
            +91 7090005700
          </a>{" "}
          immediately.
        </p>
        <h3 className={h3}>6.5 Payment Failures and Disputed Transactions</h3>
        <p className={p}>
          EasyFlyNStay shall not be held liable for payment failures, transaction declines, or delayed processing arising
          from causes beyond our control, including insufficient account balance, card or account restrictions imposed by
          the user&apos;s bank, payment gateway downtime, network connectivity issues, bank server failures, or fraud
          prevention filters activated by the user&apos;s financial institution. In the event of a payment failure, users
          are advised to:
        </p>
        <ul className={ul}>
          <li>Wait at least 30 minutes before retrying the transaction to avoid duplicate charges.</li>
          <li>Verify with their bank whether any amount has been debited from their account.</li>
          <li>Contact EasyFlyNStay customer support if an amount has been debited but no booking confirmation has been received.</li>
        </ul>
        <p className={p}>
          In cases where a payment is debited but no booking confirmation is issued due to a technical error, the
          debited amount will be refunded to the original payment source within 5-7 business days, subject to bank
          processing timelines. EasyFlyNStay does not charge any additional fees for processing such reversals.
        </p>
      </section>

      <section>
        <h2 className={h2}>7. Booking Confirmation, Accuracy, and Obligations</h2>
        <h3 className={h3}>7.1 When Is a Booking Confirmed?</h3>
        <p className={p}>A booking made through EasyFlyNStay is considered confirmed only when all of the following conditions have been met:</p>
        <ul className={ul}>
          <li>Full payment for the booking has been successfully processed and received by EasyFlyNStay without any payment dispute, chargeback, or reversal.</li>
          <li>A valid Passenger Name Record (PNR) or booking reference number has been generated by the respective airline or service provider&apos;s reservation system.</li>
          <li>A booking confirmation email has been dispatched to the registered email address of the user, containing the booking reference, passenger details, itinerary, and PNR.</li>
        </ul>
        <p className={p}>
          The mere act of initiating a booking or receiving a payment receipt does not constitute booking confirmation.
          EasyFlyNStay&apos;s obligation to deliver the booked service is contingent upon the issuance of a confirmed
          ticket or PNR by the respective airline.
        </p>
        <h3 className={h3}>7.2 User Verification Responsibilities</h3>
        <p className={p}>
          Upon receiving the booking confirmation, it is the user&apos;s sole responsibility to carefully verify and
          cross-check the following details before proceeding with travel:
        </p>
        <ul className={ul}>
          <li>Full name of each passenger: Names must match exactly as they appear on the respective government-issued photo identification documents (passport, Aadhaar card, PAN card, Voter ID, or Driving License) to be presented at the airport check-in counter.</li>
          <li>Travel dates, departure and arrival times, and connection durations.</li>
          <li>Origin and destination airports, including terminal information where applicable.</li>
          <li>Flight numbers, airline codes, and operating carrier details.</li>
          <li>Cabin class booked vs. cabin class confirmed by the airline.</li>
          <li>Baggage allowance as per the fare rules and the airline&apos;s current baggage policy.</li>
          <li>Special service requests (SSR) such as meal preferences, wheelchair assistance, or seat assignments, if applicable.</li>
        </ul>
        <p className={p}>
          Any discrepancy, error, or omission in the booking details must be reported to EasyFlyNStay customer support
          within 24 hours of receiving the booking confirmation. EasyFlyNStay will make reasonable efforts to assist in
          correcting such errors, subject to the airline&apos;s amendment policies and applicable charges. EasyFlyNStay
          shall not be responsible for any loss, inconvenience, or travel disruption arising from the user&apos;s
          failure to verify and report errors in a timely manner.
        </p>
        <h3 className={h3}>7.3 Price Discrepancy and Cancellation by EasyFlyNStay</h3>
        <p className={p}>
          In rare instances, booking confirmations may be issued at incorrect prices due to system errors, airline fare
          feed errors, payment gateway discrepancies, or technical glitches. EasyFlyNStay reserves the right to cancel
          any booking where the price charged is materially incorrect, provided that the user is notified within a
          reasonable time and the full amount paid is refunded to the original payment method. EasyFlyNStay shall not be
          obligated to honor bookings made at clearly erroneous or abnormally low prices that are a result of technical
          errors.
        </p>
      </section>

      <section>
        <h2 className={h2}>8. Passenger-Specific Rules and Special Categories</h2>
        <h3 className={h3}>8.1 Infant Passengers (Below 2 Years)</h3>
        <p className={p}>
          Infants are defined as children who have not completed 2 years of age at the time of travel on ALL legs of the
          itinerary. The following rules apply to infant bookings:
        </p>
        <ul className={ul}>
          <li>An infant must not have completed 24 months of age on the date of travel for any segment of the journey for which the infant fare is applied.</li>
          <li>Each infant must be accompanied by a paying adult passenger of at least 18 years of age. Only one infant may be booked per adult.</li>
          <li>Infants are not entitled to a separate seat unless a full child fare or adult fare is purchased. Infants travel on the lap of the accompanying adult.</li>
          <li>Valid proof-of-age documentation (birth certificate or passport) must be carried and presented at the check-in counter and immigration (for international travel).</li>
          <li>If an infant completes 24 months of age during the course of a multi-leg itinerary, a separate booking at child fares must be made for the remaining legs.</li>
          <li>Infant fares are subject to the individual airline&apos;s pricing structure and may vary significantly across carriers and routes.</li>
          <li>Some airlines impose limits on the number of infants permitted per aircraft. Users are advised to check with the airline if booking for multiple infants on the same flight.</li>
        </ul>
        <h3 className={h3}>8.2 Child Passengers (2 to 12 Years)</h3>
        <p className={p}>Children are defined as passengers who have completed 2 years of age but have not completed 12 years of age at the time of travel. The following rules apply:</p>
        <ul className={ul}>
          <li>Child passengers must be accompanied by an adult of at least 18 years of age.</li>
          <li>Valid proof-of-age documentation must be presented at check-in for all child passengers.</li>
          <li>Child fares are applicable only for the specific age range recognized by the booking system and the operating airline. Users are responsible for ensuring that the age of the child is correctly entered at the time of booking.</li>
          <li>Children above a certain age threshold (which varies by airline) may be required to purchase a full adult fare on specific routes or aircraft types.</li>
        </ul>
        <h3 className={h3}>8.3 Unaccompanied Minors</h3>
        <p className={p}>
          Unaccompanied Minor (UM) services are available for children traveling without an adult companion, subject to
          the specific policies of the operating airline. Not all airlines offer UM services, and where available, they
          are typically offered for children within a specific age range (commonly 5 to 15 years, though this varies). UM
          bookings typically involve additional service fees charged directly by the airline. Parents or guardians are
          responsible for completing all UM documentation required by the airline and for ensuring appropriate escort
          arrangements at both origin and destination airports. EasyFlyNStay strongly recommends contacting our customer
          support team before booking unaccompanied minor travel to receive guidance on airline-specific UM policies.
        </p>
        <h3 className={h3}>8.4 Senior Citizens</h3>
        <p className={p}>
          Some airlines offer discounted fares for senior citizen passengers (typically individuals aged 60 or above).
          Such fares are subject to the specific airline&apos;s eligibility criteria and documentation requirements. Valid
          government-issued age-proof documentation (passport, Aadhaar, or other acceptable documents) may be required
          for check-in verification. EasyFlyNStay facilitates the booking of such fares where available but does not
          guarantee their availability on all routes and travel dates.
        </p>
        <h3 className={h3}>8.5 Pregnant Passengers</h3>
        <p className={p}>
          Pregnant passengers must comply with the travel policies and medical clearance requirements of the operating
          airline. Most airlines impose the following general restrictions, though exact rules vary by carrier:
        </p>
        <ul className={ul}>
          <li>Domestic travel: Generally permitted up to 36 weeks of pregnancy, with a medical certificate required after 28 weeks.</li>
          <li>International travel: Generally permitted up to 28 weeks without a medical certificate; beyond 28 weeks, a medical fitness certificate from a registered gynecologist is typically required.</li>
          <li>Travel is generally not permitted for passengers who are 36 weeks or more pregnant on domestic routes or 28 weeks or more on international routes, unless permitted by the specific airline with medical approval.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay strongly recommends that pregnant passengers consult their healthcare provider before booking and
          traveling, and verify pregnancy travel policies directly with the operating airline at the time of booking.
        </p>
        <h3 className={h3}>8.6 Passengers with Disabilities or Special Needs</h3>
        <p className={p}>
          EasyFlyNStay is committed to facilitating accessible travel for passengers with disabilities or special
          assistance requirements. If you or a fellow traveler requires wheelchair assistance, special seating, oxygen
          support, guide dog accommodation, or any other special service, please notify EasyFlyNStay at the time of
          booking or at least 48 hours before departure to allow adequate time for the airline to make appropriate
          arrangements. Special service requests are subject to availability and the operating airline&apos;s capacity
          to accommodate such requests, and EasyFlyNStay cannot guarantee fulfilment in all cases.
        </p>
      </section>

      <section>
        <h2 className={h2}>9. Cancellation, Amendment, and Refund Policy</h2>
        <p className={p}>
          All cancellations, amendments, and refund requests are governed by a combination of the applicable airline&apos;s
          fare rules, the specific terms of the booked service, and EasyFlyNStay&apos;s own service policies as described
          in this section. Users are strongly advised to read and understand the fare conditions applicable to their
          booking before completing the purchase.
        </p>
        <h3 className={h3}>9.1 Flight Booking Cancellations</h3>
        <p className={p}>
          Cancellations of flight bookings may be initiated by the user through the &ldquo;My Bookings&rdquo; section on
          the Platform, via email to{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>
          , or by contacting our customer support team at{" "}
          <a href="tel:+917090005700" className={link}>
            +91 7090005700
          </a>
          . The following conditions govern all cancellations:
        </p>
        <ul className={ul}>
          <li>Each airline has its own cancellation fee structure based on the fare type, booking class, route, and time of cancellation relative to the scheduled departure. These fees are set by the airline and may change without prior notice.</li>
          <li>EasyFlyNStay&apos;s own service fee and convenience charges are non-refundable in all circumstances, regardless of the reason for cancellation.</li>
          <li>Zero Cancellation Fee product premiums, if purchased at the time of booking, are non-refundable even if the booking is subsequently cancelled.</li>
          <li>Flight cancellation insurance or cover premiums are non-refundable.</li>
          <li>Certain promotional, saver, or special fare tickets may be fully non-refundable as per the fare rules specified by the airline at the time of booking. Users are advised to check the fare conditions before completing the purchase.</li>
          <li>Partial cancellations (cancelling one or more passengers from a group booking, or cancelling one leg of a round trip under certain fare types) may not be permitted for specific airlines or fare categories.</li>
          <li>For cancellations within 24 hours of the scheduled departure time, users are strongly advised to contact the airline directly before submitting a cancellation request to EasyFlyNStay to avoid forfeiture of the full fare.</li>
        </ul>
        <h3 className={h3}>9.2 No-Show Policy</h3>
        <p className={p}>
          A &ldquo;no-show&rdquo; occurs when a passenger fails to present themselves at the airport for the scheduled
          flight without having cancelled the booking in advance. In cases of no-show, the applicable refund, if any,
          will be governed by the airline&apos;s no-show policy for the specific fare class booked. In most cases,
          no-show penalties are severe and may result in total forfeiture of the ticket value. For itineraries involving
          multiple segments or a return journey booked under a single PNR, failure to board the outbound or onward sector
          may result in the automatic cancellation of subsequent segments by the airline. Users are advised to
          immediately contact both the airline and EasyFlyNStay if a no-show situation is anticipated.
        </p>
        <p className={p}>
          Refund requests for no-show bookings must be submitted within 90 days from the date of the scheduled departure.
          Requests submitted after this 90-day window will not be entertained, and any outstanding refund amount will be
          deemed permanently forfeited.
        </p>
        <h3 className={h3}>9.3 Amendments and Modifications</h3>
        <p className={p}>
          EasyFlyNStay provides booking amendment assistance for eligible bookings, including changes to travel date,
          time, passenger name corrections (where permitted), and route modifications. The following conditions apply
          to all amendments:
        </p>
        <ul className={ul}>
          <li>Amendment charges are determined by the airline based on the fare rules applicable to the original booking. These fees may vary significantly based on the fare class, route, departure timing, and the extent of the change requested.</li>
          <li>EasyFlyNStay may charge an additional handling or processing fee for facilitating amendments. This fee is separate from the airline&apos;s change fee and will be disclosed before the amendment is confirmed.</li>
          <li>Name changes or corrections are subject to the airline&apos;s name change policy. Most airlines allow minor spelling corrections but do not permit full name transfers. In some cases, name changes may not be permitted at all.</li>
          <li>Date changes may result in a fare difference being charged if the new fare applicable on the revised date of travel is higher than the original fare paid. Conversely, no refund will be issued if the new fare is lower.</li>
          <li>Certain fare types may not permit any form of modification and must be cancelled and rebooked at the prevailing fare.</li>
        </ul>
        <p className={p}>
          In the event of an amendment that results in a rescheduling of the original booking, the original booking
          stands modified accordingly. Any subsequent cancellation of the amended booking shall be treated as a fresh
          cancellation request, and applicable charges shall be levied accordingly.
        </p>
        <h3 className={h3}>9.4 Refund Processing</h3>
        <p className={p}>
          Refunds approved in accordance with the applicable cancellation policy will be processed by EasyFlyNStay only
          after the refund amount has been received from the respective airline or service provider. Refund timelines are
          as follows:
        </p>
        <ul className={ul}>
          <li>Credit or Debit Card Payments: EasyFlyNStay will initiate the refund within 72 hours of receiving the refund from the airline. The amount may take an additional 7 to 10 business days to reflect in the cardholder&apos;s account, depending on the card-issuing bank&apos;s processing timelines.</li>
          <li>Net Banking Transactions: Refunds will be initiated within 72 hours of receipt from the airline and credited within 5 to 7 business days.</li>
          <li>UPI Transactions: Refunds will typically be credited within 3 to 5 business days of processing by EasyFlyNStay.</li>
          <li>Digital Wallet Payments: Refunds will be credited to the respective wallet account within 3 to 5 business days.</li>
        </ul>
        <p className={p}>
          Please note that EasyFlyNStay has no control over the speed of refund processing by the airline or the
          user&apos;s bank. Any delays caused by airline processing backlogs, banking holidays, or bank-side processing
          issues are outside EasyFlyNStay&apos;s control. Users experiencing refund delays beyond the stated timelines are
          advised to contact EasyFlyNStay customer support with their booking reference and transaction details for
          follow-up with the airline.
        </p>
        <h3 className={h3}>9.5 Holiday Package Cancellations</h3>
        <p className={p}>For holiday packages and bundled travel products booked through EasyFlyNStay, the following cancellation fee structure applies:</p>
        <ul className={ul}>
          <li>Cancellation 60 days or more before the date of departure: 25% of the total tour cost will be deducted as a cancellation charge. The remaining 75% will be refunded.</li>
          <li>Cancellation between 30 and 59 days before the date of departure: 50% of the total tour cost will be deducted as a cancellation charge. The remaining 50% will be refunded.</li>
          <li>Cancellation within 15 to 29 days before the date of departure: 75% of the total tour cost will be deducted. 25% will be refunded.</li>
          <li>Cancellation within 14 days or less of the date of departure: 100% of the total tour cost will be forfeited. No refund will be processed.</li>
        </ul>
        <p className={p}>
          Holiday package cancellation requests must be submitted in writing to{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          with the booking reference number. Verbal cancellation requests over the phone will not be processed.
          Additional cancellation conditions specific to individual tour operators or service providers may apply and will
          be communicated at the time of booking.
        </p>
      </section>

      <section>
        <h2 className={h2}>10. Third-Party Services, Providers, and Disclaimer</h2>
        <p className={p}>
          EasyFlyNStay operates exclusively as a technology-enabled intermediary and facilitator. The actual travel
          services, including air transportation, ground transportation, hotel accommodation, and all related services,
          are provided by independent third-party service providers over whom EasyFlyNStay has no ownership, control, or
          supervisory authority.
        </p>
        <p className={p}>EasyFlyNStay shall not be held responsible or liable, directly or indirectly, for any of the following:</p>
        <ul className={ul}>
          <li>Any flight delay, cancellation, rescheduling, route change, diversion, or technical grounding caused by the airline or applicable aviation authority.</li>
          <li>Denied boarding due to overbooking, weight and balance restrictions, government-imposed travel bans, or any other airline decision.</li>
          <li>Changes in aircraft type, seat configuration, or in-flight service offerings made by the airline without notice.</li>
          <li>Baggage loss, damage, delay, or theft, whether at the airport, on the aircraft, or during transit.</li>
          <li>Quality, standard, cleanliness, or safety of services provided by airlines, hotels, ground operators, or any other third-party service provider.</li>
          <li>Discrepancies between hotel or service descriptions on the Platform and the actual facilities or amenities provided by the hotel or service provider.</li>
          <li>Failure of a hotel or property to honor a booking due to overbooking, property closure, renovation, or other factors beyond EasyFlyNStay&apos;s control.</li>
          <li>Health and safety risks, accidents, injuries, or illnesses occurring during travel.</li>
          <li>Adverse weather conditions or natural events that disrupt travel plans.</li>
          <li>Visa rejections, immigration holds, customs issues, or travel bans imposed by government authorities.</li>
        </ul>
        <p className={p}>
          Users are advised to independently verify all critical travel information, including visa requirements, entry
          conditions, health and vaccination requirements, travel advisories issued by the Government of India and
          destination country authorities, and airline-specific terms, prior to making or confirming any booking.
          EasyFlyNStay provides information about third-party services in good faith and does not warrant its accuracy,
          completeness, or currency.
        </p>
        <p className={p}>
          Any complaint or dispute relating to the quality or delivery of services by a third-party service provider must
          be raised directly with the concerned provider. EasyFlyNStay will, on a best-efforts basis, assist users in
          escalating such complaints or disputes, but cannot be held accountable for the resolution, outcomes, or
          compensation decisions made by third parties.
        </p>
      </section>

      <section>
        <h2 className={h2}>11. Fraud Prevention, Scam Awareness, and Security</h2>
        <h3 className={h3}>11.1 EasyFlyNStay&apos;s Security Commitments</h3>
        <p className={p}>
          EasyFlyNStay employs robust technical and organizational security measures to protect the integrity of the
          Platform, user data, and financial transactions. We conduct regular security audits, penetration testing, and
          vulnerability assessments of our systems. However, users are equally responsible for maintaining their own
          security hygiene to ensure safe use of the Platform.
        </p>
        <h3 className={h3}>11.2 What EasyFlyNStay Will Never Do</h3>
        <p className={p}>
          To protect users from phishing attacks, social engineering scams, and fraudulent impersonation, please be
          clearly aware that EasyFlyNStay and its authorized representatives will NEVER:
        </p>
        <ul className={ul}>
          <li>Ask you to share your credit card number, debit card number, card expiry date, CVV, or any card-related security code via phone, email, WhatsApp, or any other channel.</li>
          <li>Ask for your internet banking login credentials, username, or password.</li>
          <li>Request you to share OTPs (One-Time Passwords), PINs, or any other authentication codes.</li>
          <li>Ask you to install any third-party screen-sharing applications, remote access tools, or software that grants access to your device.</li>
          <li>Send unsolicited links asking you to &ldquo;verify&rdquo; or &ldquo;update&rdquo; your payment or account information.</li>
          <li>Ask for payment via informal channels such as personal bank transfers, cryptocurrency, gift cards, or money transfer services.</li>
        </ul>
        <h3 className={h3}>11.3 Fraud Detection and Booking Cancellation</h3>
        <p className={p}>
          EasyFlyNStay actively monitors all transactions and bookings for signs of fraudulent activity. In the event
          that EasyFlyNStay receives a credible fraud alert, complaint, chargeback claim, or directive from the
          user&apos;s bank, payment gateway operator, any authorized law enforcement agency, or judicial authority
          indicating that a booking has been made using fraudulent, stolen, or unauthorized payment credentials,
          EasyFlyNStay reserves the right to:
        </p>
        <ul className={ul}>
          <li>Immediately cancel the concerned booking or service without prior notice or consent from the user.</li>
          <li>Freeze or suspend the associated user account pending investigation.</li>
          <li>Cooperate with law enforcement authorities and disclose relevant booking, payment, and user information as required by law.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay shall not be liable for any loss, inconvenience, or damage caused to the user or any third party as
          a result of a booking cancellation undertaken as a fraud prevention measure. Users who believe their account
          has been compromised or used fraudulently should immediately contact EasyFlyNStay at{" "}
          <a href="tel:+917090005700" className={link}>
            +91 7090005700
          </a>{" "}
          or{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={h2}>12. Prohibited Activities and Conduct</h2>
        <p className={p}>
          EasyFlyNStay is committed to maintaining a safe, lawful, and fair platform for all users. The following
          activities are strictly prohibited on the Platform. By using the Platform, you agree that you will not, under
          any circumstances:
        </p>
        <ol className={ol}>
          <li>Access or use the Platform for any purpose that is unlawful, illegal, harmful, or in violation of any applicable local, national, or international laws, regulations, or governmental orders.</li>
          <li>Provide false, inaccurate, misleading, or fabricated personal information, travel documents, or payment details during registration, booking, or any other interaction with the Platform.</li>
          <li>Attempt to gain unauthorized access to any part of the Platform, its servers, databases, user accounts, payment systems, or administrative interfaces through hacking, password mining, brute force attacks, or any other method.</li>
          <li>Reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code, underlying algorithms, or proprietary data structures of any software component of the Platform.</li>
          <li>Use automated tools, bots, web scrapers, crawlers, scripts, or similar software to access, extract, index, or mirror any content or data from the Platform without the express written consent of EasyFlyNStay.</li>
          <li>Make fraudulent bookings, use stolen or unauthorized payment instruments, or engage in any form of financial fraud, including chargebacks initiated in bad faith.</li>
          <li>Commercially resell, sublicense, or otherwise transfer bookings, tickets, or any EasyFlyNStay services without prior written authorization from EasyFlyNStay.</li>
          <li>Impersonate any person, user, EasyFlyNStay employee, representative, or entity, or falsely claim to be associated with EasyFlyNStay.</li>
          <li>Upload, transmit, or otherwise introduce any virus, malware, ransomware, trojan horse, spyware, or any other malicious code or software designed to disrupt, damage, or interfere with the Platform.</li>
          <li>Engage in any activity that creates a disproportionate or unreasonable burden on the Platform&apos;s infrastructure, servers, or network, including launching denial-of-service attacks or flooding.</li>
          <li>Use the Platform or any content thereof to advertise, promote, or solicit any products, services, or commercial ventures not authorized by EasyFlyNStay.</li>
          <li>Engage in any conduct that is intended to or does harm the reputation, goodwill, or business interests of EasyFlyNStay.</li>
          <li>Share, post, or transmit any content on the Platform that is defamatory, obscene, offensive, hateful, discriminatory, or otherwise objectionable.</li>
          <li>Circumvent, bypass, remove, deactivate, or otherwise interfere with any security, access control, or copy protection measures implemented on the Platform.</li>
          <li>Use the Platform to collect, harvest, or store personal data of other users without their explicit consent.</li>
        </ol>
        <p className={p}>
          Violation of any of the foregoing prohibited activities may result in the immediate suspension or permanent
          termination of the user&apos;s account without notice, cancellation of any pending or future bookings, and
          civil or criminal legal proceedings against the violating user under applicable Indian laws.
        </p>
      </section>

      <section>
        <h2 className={h2}>13. User-Generated Content, Reviews, and Contributions</h2>
        <h3 className={h3}>13.1 Nature of User Contributions</h3>
        <p className={p}>
          EasyFlyNStay may, from time to time, provide features that enable registered users to post reviews, ratings,
          travel experiences, feedback, comments, photographs, or other content (&ldquo;Contributions&rdquo;) on the
          Platform. Such Contributions are intended to help fellow travelers make informed booking decisions and to
          assist EasyFlyNStay in improving its services.
        </p>
        <h3 className={h3}>13.2 Standards for Contributions</h3>
        <p className={p}>By submitting any Contribution to the Platform, you represent, warrant, and agree that:</p>
        <ul className={ul}>
          <li>Your Contribution is based on your genuine firsthand experience with the service, airline, or entity being reviewed.</li>
          <li>Your Contribution is truthful, accurate, complete, and not deliberately misleading or deceptive.</li>
          <li>Your Contribution does not infringe the intellectual property rights, privacy rights, publicity rights, or any other rights of any third party.</li>
          <li>Your Contribution does not contain offensive, abusive, threatening, discriminatory, racially or ethnically objectionable, or otherwise inappropriate language or content.</li>
          <li>Your Contribution does not reference or encourage any illegal activities, including the use of controlled substances, violence, or financial fraud.</li>
          <li>Your Contribution does not constitute unsolicited advertising, promotional material, spam, chain letters, or any form of commercial solicitation.</li>
          <li>You have not been compensated or incentivized by any third party to post a positive or negative review.</li>
        </ul>
        <h3 className={h3}>13.3 License Grant for Contributions</h3>
        <p className={p}>
          By posting any Contribution on the Platform, you grant EasyFlyNStay a perpetual, irrevocable, non-exclusive,
          royalty-free, fully sublicensable, and transferable worldwide license to use, reproduce, modify, adapt,
          translate, publish, distribute, perform, and display such Contribution (in whole or in part) in any media format
          now known or hereafter developed, for any lawful commercial or non-commercial purpose, without any obligation
          to notify or compensate you.
        </p>
        <p className={p}>
          You retain ownership of your original Contributions. By posting them, you do not transfer ownership to
          EasyFlyNStay but grant the license described above. You waive any moral rights you may have in your Contributions
          to the extent permitted by applicable law.
        </p>
        <h3 className={h3}>13.4 Moderation and Removal</h3>
        <p className={p}>
          EasyFlyNStay reserves the right, in its sole and absolute discretion, to review, moderate, edit, reject,
          remove, or permanently delete any Contribution at any time and for any reason, without prior notice to the
          contributing user. EasyFlyNStay does not endorse, verify, or accept liability for the accuracy or reliability
          of any user-submitted Contribution. Users relying on Contributions for travel decisions do so at their own
          risk.
        </p>
      </section>

      <section>
        <h2 className={h2}>14. Intellectual Property Rights</h2>
        <h3 className={h3}>14.1 Ownership of Platform Content</h3>
        <p className={p}>
          The EasyFlyNStay Platform and all of its contents — including but not limited to the EasyFlyNStay brand name,
          logos, taglines, trademarks, service marks, trade dress, website design and layout, color schemes, typography,
          user interface elements, source code, software, databases, algorithms, text content, images, graphics, audio and
          video materials, and all other materials created or owned by EasyFlyNStay (collectively, &ldquo;Platform
          Content&rdquo;) — are the exclusive proprietary property of EasyFlyNStay or its duly authorized licensors. All
          such content is protected under applicable Indian and international intellectual property laws, including the
          Copyright Act, 1957, the Trade Marks Act, 1999, and the Information Technology Act, 2000, as well as
          international treaties and conventions to which India is a signatory.
        </p>
        <h3 className={h3}>14.2 Permitted Use</h3>
        <p className={p}>
          EasyFlyNStay grants you a limited, personal, non-exclusive, non-transferable, non-sublicensable, and fully
          revocable license to access and use the Platform and its content solely for your own personal, non-commercial
          travel booking and planning purposes. This limited license does not constitute a transfer of any intellectual
          property rights and terminates automatically upon any breach of these Terms.
        </p>
        <h3 className={h3}>14.3 Restrictions on Use</h3>
        <p className={p}>Except as expressly permitted under these Terms, you may not:</p>
        <ul className={ul}>
          <li>Copy, reproduce, republish, upload, post, transmit, broadcast, or otherwise make available any Platform Content in any form or by any means.</li>
          <li>Modify, adapt, translate, or create derivative works based on the Platform Content.</li>
          <li>Remove, alter, or obscure any proprietary notices, copyright notices, or trademark identifications on or in the Platform Content.</li>
          <li>Use EasyFlyNStay&apos;s name, brand, trademarks, logos, or any Platform Content in advertising, press releases, or promotional materials without prior written authorization.</li>
          <li>Frame or mirror the Platform or any portion thereof on any other website or application.</li>
          <li>Decompile or reverse-engineer any software or code forming part of the Platform.</li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>15. Privacy and Data Protection</h2>
        <p className={p}>
          The collection, use, processing, storage, sharing, and protection of personal information submitted by users on
          the Platform is governed by EasyFlyNStay&apos;s{" "}
          <Link href="/privacy" className={link}>
            Privacy Policy
          </Link>
          , which forms an integral part of these Terms and is incorporated herein by reference. By using the Platform,
          you acknowledge that you have read and understood the Privacy Policy and consent to the data practices
          described therein.
        </p>
        <p className={p}>
          EasyFlyNStay collects personal data including but not limited to full name, date of birth, gender, nationality,
          email address, mobile number, passport or government-issued ID details, payment information, and travel
          preferences. This data is used for the purposes of processing and confirming bookings, personalizing the user
          experience, communicating relevant service updates, complying with legal and regulatory obligations, fraud
          detection, and improving our services.
        </p>
        <p className={p}>
          EasyFlyNStay is committed to protecting user data in compliance with applicable Indian data protection laws,
          including the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and
          Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection
          Act, 2023 (to the extent applicable and in force at the relevant time). We implement appropriate technical and
          organizational measures to safeguard personal data against unauthorized access, alteration, disclosure, or
          destruction.
        </p>
        <p className={p}>
          EasyFlyNStay does not sell, rent, or trade user personal data to third parties for their independent marketing
          purposes. Data may be shared with airlines, payment gateway partners, and other service providers strictly on a
          need-to-know basis for the purpose of completing the user&apos;s booking or service request. For international
          travel, relevant passenger data including passport information may be shared with government and immigration
          authorities as required by law.
        </p>
      </section>

      <section>
        <h2 className={h2}>16. Communication Policy</h2>
        <p className={p}>
          By creating an account on the Platform or completing a booking, you consent to receive communications from
          EasyFlyNStay through multiple channels, including email, SMS, WhatsApp messages, push notifications (for app
          users), and phone calls. These communications may include:
        </p>
        <ul className={ul}>
          <li>Booking confirmations, cancellation notices, itinerary updates, and schedule change alerts.</li>
          <li>Payment confirmation receipts, refund processing updates, and transaction-related notifications.</li>
          <li>Promotional offers, discounts, travel deals, seasonal campaigns, and personalized fare alerts.</li>
          <li>Platform updates, policy changes, security notices, and important service announcements.</li>
          <li>Customer support follow-ups and resolution confirmations.</li>
        </ul>
        <p className={p}>EasyFlyNStay shall not be held liable for non-receipt of booking confirmation emails, SMS messages, or other communications arising from:</p>
        <ul className={ul}>
          <li>Incorrect email addresses or mobile numbers provided by the user at the time of registration or booking.</li>
          <li>Email delivery failures due to spam filters, blocked senders, or full inbox conditions.</li>
          <li>Mobile network disruptions, SMS filtering by telecom operators, or number porting issues.</li>
        </ul>
        <p className={p}>
          It is the user&apos;s responsibility to ensure that the contact details registered with EasyFlyNStay are
          accurate and up to date. Users who wish to opt out of promotional communications may do so by using the
          unsubscribe option in marketing emails or by contacting{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>
          . Please note that transactional and booking-related communications cannot be opted out of, as they form part of
          the essential service delivery process.
        </p>
        <p className={p}>
          EasyFlyNStay is not under any obligation to proactively alert users about airline-initiated schedule changes,
          flight cancellations, aircraft type changes, or route modifications. While we make reasonable efforts to
          communicate such changes when they come to our attention, users are advised to independently monitor airline
          communications and check their booking status regularly, especially for upcoming travel.
        </p>
      </section>

      <section>
        <h2 className={h2}>17. Disclaimer of Warranties and Limitation of Liability</h2>
        <h3 className={h3}>17.1 Disclaimer of Warranties</h3>
        <p className={p}>
          The Platform and all services offered through it are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS
          AVAILABLE&rdquo; basis without any representation, warranty, or guarantee of any kind, whether express,
          implied, statutory, or otherwise. EasyFlyNStay specifically disclaims all implied warranties of merchantability,
          fitness for a particular purpose, non-infringement, accuracy, completeness, and availability. EasyFlyNStay does
          not warrant that:
        </p>
        <ul className={ul}>
          <li>The Platform will be available, uninterrupted, error-free, or free from defects at all times.</li>
          <li>The information, content, and data displayed on the Platform is always accurate, current, or complete.</li>
          <li>The Platform is free from viruses, malware, or other harmful components.</li>
          <li>The results obtained from use of the Platform will meet your expectations or requirements.</li>
        </ul>
        <p className={p}>
          No advice or information, whether oral or written, obtained from EasyFlyNStay or through the Platform, shall
          create any warranty not expressly stated in these Terms.
        </p>
        <h3 className={h3}>17.2 Limitation of Liability</h3>
        <p className={p}>
          To the fullest extent permitted by applicable law, EasyFlyNStay, its parent company, subsidiaries, affiliates,
          directors, officers, employees, agents, vendors, and licensors shall not be liable for any of the following,
          irrespective of whether the claim is based in contract, tort, negligence, strict liability, or any other legal
          theory:
        </p>
        <ul className={ul}>
          <li>Any indirect, incidental, special, consequential, punitive, or exemplary damages.</li>
          <li>Loss of profits, revenue, business opportunities, goodwill, data, or anticipated savings.</li>
          <li>Travel disruptions, delays, cancellations, or service failures caused by airlines, hotels, or any other third-party service provider.</li>
          <li>Personal injury, illness, or loss of life occurring during the course of travel.</li>
          <li>Errors, omissions, or inaccuracies in information provided by airlines or third-party data providers.</li>
          <li>Any consequence arising from a user&apos;s reliance on Platform content for travel decisions.</li>
          <li>Force majeure events including natural disasters, pandemics, acts of terrorism, wars, or governmental actions.</li>
          <li>Unauthorized access to user accounts due to the user&apos;s failure to maintain account security.</li>
        </ul>
        <p className={p}>
          In any event, EasyFlyNStay&apos;s total aggregate liability to any user, in connection with all claims arising
          from or related to these Terms or the use of the Platform, shall not exceed the total amount actually paid by
          the user to EasyFlyNStay for the specific booking or service that directly gave rise to the claim. This
          limitation shall apply even if EasyFlyNStay has been advised of the possibility of such damages.
        </p>
      </section>

      <section>
        <h2 className={h2}>18. Indemnification</h2>
        <p className={p}>
          You agree, at your own cost and expense, to fully indemnify, defend, and hold harmless EasyFlyNStay, its parent
          company, affiliates, subsidiaries, directors, officers, employees, agents, shareholders, licensors, and service
          providers from and against any and all claims, demands, actions, liabilities, losses, damages, costs,
          penalties, fines, expenses, and attorney&apos;s fees arising out of or in connection with:
        </p>
        <ul className={ul}>
          <li>Your use or misuse of the Platform, its services, or any content accessed through it.</li>
          <li>Your violation of any provision of these Terms, any applicable law, or any third-party rights.</li>
          <li>Any Contribution or content you post, submit, or transmit through the Platform.</li>
          <li>Any transaction, booking, or financial activity conducted under your user account, whether authorized or unauthorized by you.</li>
          <li>Your fraudulent conduct, willful misconduct, or gross negligence in connection with the Platform.</li>
          <li>Any third-party claim arising from your actions or omissions while using the Platform.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay reserves the right, at its own expense, to assume exclusive defense and control of any matter
          subject to indemnification by you. In such event, you agree to cooperate fully with EasyFlyNStay&apos;s defense
          of such claims and to not settle any such claim without EasyFlyNStay&apos;s prior written consent.
        </p>
      </section>

      <section>
        <h2 className={h2}>19. Force Majeure</h2>
        <p className={p}>
          EasyFlyNStay shall not be held liable or in breach of these Terms for any failure, delay, or inability to
          perform any of its obligations hereunder where such failure or delay is caused by, or arises from, events or
          circumstances that are beyond EasyFlyNStay&apos;s reasonable control (&ldquo;Force Majeure Event&rdquo;). Force
          Majeure Events include, but are not limited to:
        </p>
        <ul className={ul}>
          <li>Acts of God, including earthquakes, floods, tsunamis, volcanic eruptions, cyclones, lightning, or other natural disasters.</li>
          <li>Pandemics, epidemics, disease outbreaks, or public health emergencies declared by governmental or international health authorities.</li>
          <li>Acts of war, armed conflict, invasion, military operations, terrorism, civil unrest, riots, or rebellion.</li>
          <li>Governmental actions, decrees, sanctions, travel restrictions, national emergency declarations, or regulatory interventions.</li>
          <li>Strikes, lockouts, or labor disputes affecting airlines, airports, fuel suppliers, or other critical service providers.</li>
          <li>Power outages, internet or telecom network failures, or widespread infrastructure breakdowns not attributable to EasyFlyNStay&apos;s negligence.</li>
          <li>Airline-specific technical groundings, safety notices, or mandatory aircraft maintenance events.</li>
          <li>Cyber-attacks, distributed denial of service attacks, or other malicious interference with EasyFlyNStay&apos;s systems.</li>
        </ul>
        <p className={p}>
          In the event of a Force Majeure Event, EasyFlyNStay will use commercially reasonable efforts to notify affected
          users through available communication channels and to facilitate rescheduling, alternative arrangements, or
          refunds to the extent possible, subject to the policies of the affected airline or service provider. However,
          EasyFlyNStay cannot guarantee any specific outcome in such circumstances, and any refunds or compensation will be
          governed by the third-party service provider&apos;s applicable policies.
        </p>
      </section>

      <section>
        <h2 className={h2}>20. Modification and Discontinuation of Services</h2>
        <p className={p}>
          EasyFlyNStay reserves the right to modify, enhance, upgrade, suspend, partially restrict, or completely
          discontinue any feature, service, tool, or section of the Platform at any time, with or without prior notice,
          for any reason deemed appropriate by EasyFlyNStay at its sole discretion. Reasons for modification or
          discontinuation may include, but are not limited to, technical upgrades, compliance with legal or regulatory
          requirements, commercial considerations, or the discovery of security vulnerabilities.
        </p>
        <p className={p}>
          EasyFlyNStay also reserves the right to introduce new services, features, or offerings on the Platform, which
          may be subject to additional or separate terms and conditions. Such new features or services shall be governed
          by the additional terms applicable to them, in addition to these Terms.
        </p>
        <p className={p}>
          EasyFlyNStay shall not be liable to you or any third party for any modification, suspension, or discontinuation
          of the Platform or its services. Your continued use of the Platform following any modification constitutes your
          acceptance of the modifications.
        </p>
      </section>

      <section>
        <h2 className={h2}>21. Governing Law, Dispute Resolution, and Jurisdiction</h2>
        <h3 className={h3}>21.1 Governing Law</h3>
        <p className={p}>
          These Terms, your use of the Platform, and any dispute, claim, or matter arising out of or in connection with
          these Terms or the services provided by EasyFlyNStay shall be governed by, construed, and interpreted
          exclusively in accordance with the laws of the Republic of India, without regard to its conflict of law
          principles or provisions.
        </p>
        <h3 className={h3}>21.2 Dispute Resolution</h3>
        <p className={p}>
          In the event of any dispute, controversy, or claim arising out of or in connection with these Terms, the
          services provided by EasyFlyNStay, or the use of the Platform, the parties agree to first attempt resolution
          through good-faith negotiation. Either party may initiate this process by providing written notice of the
          dispute to the other party, with a clear description of the nature of the dispute and the resolution sought.
        </p>
        <p className={p}>
          If the dispute is not resolved through negotiation within 30 calendar days of the receipt of the written notice,
          either party may pursue resolution through mediation by a mutually agreed mediator or through the courts of
          competent jurisdiction as described below.
        </p>
        <p className={p}>
          For minor consumer complaints and disputes, users may also approach the National Consumer Helpline or file a
          complaint before the relevant Consumer Disputes Redressal Forum/Commission under the Consumer Protection Act,
          2019.
        </p>
        <h3 className={h3}>21.3 Jurisdiction</h3>
        <p className={p}>
          Subject to any mandatory provisions of applicable law, all disputes that are not resolved through negotiation or
          mediation shall be subject to the exclusive jurisdiction of the courts of competent jurisdiction located in
          Bengaluru, Karnataka, India. Both parties irrevocably submit to the personal jurisdiction of such courts and
          waive any objection to the venue or jurisdiction of such courts.
        </p>
      </section>

      <section>
        <h2 className={h2}>22. Severability</h2>
        <p className={p}>
          If any provision, clause, or part of a clause of these Terms is determined to be invalid, void, unenforceable,
          or contrary to applicable law by any court or tribunal of competent jurisdiction, such invalidity or
          unenforceability shall be limited in scope to the minimum extent necessary. The remaining provisions of these
          Terms shall remain in full force and effect and shall continue to bind both parties as if the invalid provision
          had never been included. Where possible, the invalid provision shall be interpreted or reformed to most closely
          reflect the original intention of the parties within the bounds of applicable law.
        </p>
      </section>

      <section>
        <h2 className={h2}>23. Entire Agreement and Waiver</h2>
        <p className={p}>
          These Terms, together with the Privacy Policy, Refund &amp; Cancellation Policy, Gift Card Terms (where
          applicable), and any other written agreements or addenda expressly referenced herein, constitute the entire
          agreement between you and EasyFlyNStay with respect to the subject matter hereof. These Terms supersede all
          prior communications, representations, negotiations, agreements, or understandings, whether oral, written,
          electronic, or implied, between the parties relating to the same subject matter.
        </p>
        <p className={p}>
          No failure or delay by EasyFlyNStay in exercising any right, power, or privilege under these Terms shall
          constitute a waiver of such right, power, or privilege. Any waiver granted by EasyFlyNStay shall be effective
          only if made in writing and signed by an authorized representative of EasyFlyNStay. A waiver of any breach of a
          provision of these Terms shall not be construed as a waiver of any subsequent breach of the same or any other
          provision.
        </p>
      </section>

      <section>
        <h2 className={h2}>24. Grievance Officer</h2>
        <p className={p}>
          In accordance with the Information Technology Act, 2000, and the rules made thereunder, EasyFlyNStay has
          designated a Grievance Officer to address user complaints and grievances relating to the Platform and its
          services. Users who have any complaint regarding the content on the Platform or any conduct of EasyFlyNStay that
          they believe violates their rights may address their grievance in writing to:
        </p>
        <div className="mt-4 border border-border bg-muted/30 px-5 py-4 text-[15px] leading-relaxed text-foreground/90">
          <p className="font-semibold text-foreground">Grievance Officer — EasyFlyNStay</p>
          <ul className="mt-3 list-none space-y-2 pl-0">
            <li>
              Email:{" "}
              <a href="mailto:support@easyflynstay.com" className={link}>
                support@easyflynstay.com
              </a>
            </li>
            <li>Subject Line: &ldquo;Grievance — [Nature of Complaint]&rdquo;</li>
            <li>
              Address: Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka
              560066
            </li>
          </ul>
        </div>
        <p className={p}>
          EasyFlyNStay shall acknowledge receipt of grievances within 48 hours and endeavor to resolve them within 30
          days of receipt, in accordance with applicable laws. Users are requested to include their name, registered
          email address, booking reference number (if applicable), a detailed description of the complaint, and copies
          of any supporting documentation when submitting a grievance.
        </p>
      </section>

      <section>
        <h2 className={h2}>25. Contact Information and Customer Support</h2>
        <p className={p}>
          EasyFlyNStay is committed to providing timely, professional, and helpful customer support. For all queries,
          booking assistance, complaints, feedback, or general inquiries, please contact us through the following channels:
        </p>
        <div className="mt-4 border border-border bg-muted/30 px-5 py-4 text-[15px] leading-relaxed text-foreground/90">
          <p className="font-semibold text-foreground">EasyFlyNStay Customer Support</p>
          <ul className="mt-3 list-none space-y-2 pl-0">
            <li>
              Website:{" "}
              <a href="https://www.easyflynstay.com" className={link} target="_blank" rel="noopener noreferrer">
                www.easyflynstay.com
              </a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:support@easyflynstay.com" className={link}>
                support@easyflynstay.com
              </a>
            </li>
            <li>
              Phone / WhatsApp Concierge:{" "}
              <a href="tel:+917090005700" className={link}>
                +91 7090005700
              </a>{" "}
              (Available 24/7, 365 days a year)
            </li>
            <li>
              Address: Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka
              560066
            </li>
          </ul>
        </div>
        <p className={p}>
          Our dedicated customer support and concierge team is available around the clock to assist you with flight
          bookings, amendments, cancellations, refund status inquiries, special service requests, and any other
          travel-related concerns. We take pride in offering prompt, knowledgeable, and empathetic support to all our
          users.
        </p>
        <p className={p}>
          For complaints related to data privacy or the handling of your personal information, please specifically
          address your email to{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          with the subject line &ldquo;Data Privacy Concern.&rdquo;
        </p>
      </section>

      <footer className="mt-14 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>
          These Terms &amp; Conditions are subject to change. Please review regularly at{" "}
          <Link href="/terms" className={link}>
            www.easyflynstay.com/terms
          </Link>
        </p>
        <p className="mt-2">
          © 2026 EasyFlyNStay. All Rights Reserved. | Bengaluru, Karnataka, India
        </p>
      </footer>
    </article>
  );
}
