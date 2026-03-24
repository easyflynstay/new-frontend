import Link from "next/link";

const p = "mt-3 text-[15px] sm:text-base leading-[1.75] text-foreground/[0.88]";
const ul = "mt-3 list-disc space-y-2 pl-6 text-[15px] sm:text-base leading-[1.75] text-foreground/[0.88]";
const h2 = "font-body text-lg sm:text-xl font-bold tracking-tight text-foreground scroll-mt-24";
const h3 = "font-body text-base font-semibold text-foreground mt-6";
const h4 = "font-body text-sm font-semibold text-foreground mt-4";
const link = "text-primary underline underline-offset-2 hover:text-primary/80";

export function PrivacyDocument() {
  return (
    <article className="text-left [&>section]:mt-12 [&>section]:border-t [&>section]:border-border/70 [&>section]:pt-10 sm:[&>section]:mt-14 sm:[&>section]:pt-12 [&>section:first-of-type]:mt-14 sm:[&>section:first-of-type]:mt-16">
      <header className="border-b border-border pb-8">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">EasyFlyNStay</p>
        <h1 className="font-body mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Effective Date: March 2026&nbsp;&nbsp;|&nbsp;&nbsp;Last Updated: March 2026
        </p>
        <p className={`${p} mt-2 text-sm`}>
          Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066, India
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

      <p className={p}>
        EasyFlyNStay (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;, &ldquo;Company&rdquo;, &ldquo;Platform
        Operator&rdquo;) is deeply committed to protecting the privacy, confidentiality, and security of the personal
        information and data entrusted to us by our users. This Privacy Policy (&ldquo;Policy&rdquo;) has been carefully
        drafted to provide you, the user (&ldquo;you&rdquo;, &ldquo;your&rdquo;, &ldquo;User&rdquo;), with a clear,
        transparent, and comprehensive understanding of how EasyFlyNStay collects, receives, uses, stores, processes,
        shares, discloses, protects, and otherwise handles your personal data when you access or use the EasyFlyNStay
        website (
        <a href="https://www.easyflynstay.com" className={link} target="_blank" rel="noopener noreferrer">
          www.easyflynstay.com
        </a>
        ), mobile applications, and all associated services (collectively, the &ldquo;Platform&rdquo;).
      </p>
      <p className={p}>
        This Policy is applicable to all persons who access, browse, register on, or otherwise interact with the
        Platform in any capacity, whether as a guest visitor, a registered user, a person making an inquiry, a person
        completing a booking, or a person accessing any of our ancillary services such as gift cards or travel advisory.
        The terms &ldquo;personal data&rdquo; and &ldquo;personal information&rdquo; are used interchangeably throughout
        this Policy and refer to any information that identifies or can be used to identify you, directly or
        indirectly.
      </p>
      <p className={p}>
        This Privacy Policy forms an integral and inseparable part of our{" "}
        <Link href="/terms" className={link}>
          Terms &amp; Conditions
        </Link>
        . By accessing the Platform, creating an account, or making a booking, you confirm that you have read this
        Policy in its entirety, understood its contents, and provided your free, informed, and unambiguous consent to
        the collection, use, processing, storage, and disclosure of your personal information in the manner described
        herein. If you do not agree with any provision of this Policy, you must immediately discontinue use of the
        Platform.
      </p>
      <p className={p}>
        EasyFlyNStay reserves the right to update or revise this Privacy Policy from time to time to reflect changes in
        our data practices, applicable laws, business operations, or technology infrastructure. The revised Policy will be
        published on the Platform with an updated &ldquo;Last Updated&rdquo; date. We encourage you to review this Policy
        periodically to remain informed about how we are protecting your data. Your continued use of the Platform after
        the publication of any changes constitutes your acceptance of the updated Policy.
      </p>

      <section>
        <h2 className={h2}>1. Definitions and Interpretation</h2>
        <p className={p}>
          For the purpose of this Privacy Policy, the following definitions shall apply unless the context otherwise
          requires:
        </p>
        <ul className={ul}>
          <li>
            &ldquo;Personal Data&rdquo; or &ldquo;Personal Information&rdquo; means any data or information that relates
            to a natural person (i.e., the Data Principal) and which, either directly or in combination with other
            available data, is capable of identifying that person. This includes name, date of birth, gender, contact
            details, identification numbers, financial data, travel preferences, and behavioral data.
          </li>
          <li>
            &ldquo;Sensitive Personal Data or Information (SPDI)&rdquo; means personal data that is deemed particularly
            sensitive under applicable Indian law, including financial information (bank account details, credit/debit
            card numbers, payment instrument details), passwords, biometric data, physical and mental health information,
            sexual orientation, and any other data notified as SPDI under applicable law.
          </li>
          <li>&ldquo;Data Principal&rdquo; means the individual to whom the personal data relates, i.e., the user of the Platform.</li>
          <li>&ldquo;Data Fiduciary&rdquo; means EasyFlyNStay, which determines the purpose and means of processing personal data.</li>
          <li>
            &ldquo;Data Processor&rdquo; means any third party engaged by EasyFlyNStay to process personal data on
            EasyFlyNStay&apos;s behalf, in accordance with EasyFlyNStay&apos;s instructions.
          </li>
          <li>
            &ldquo;Processing&rdquo; means any operation or set of operations performed on personal data, including
            collection, recording, organization, structuring, storage, adaptation, retrieval, use, disclosure,
            transmission, dissemination, erasure, or destruction.
          </li>
          <li>
            &ldquo;Consent&rdquo; means a freely given, specific, informed, and unambiguous indication of the Data
            Principal&apos;s wishes, either by a statement or by a clear affirmative action, signifying agreement to the
            processing of personal data relating to them.
          </li>
          <li>
            &ldquo;Cookies&rdquo; means small text files placed on your device by the Platform that enable us to recognize
            your browser, remember your preferences, and improve your experience.
          </li>
          <li>
            &ldquo;Platform&rdquo; means the EasyFlyNStay website (www.easyflynstay.com), mobile applications (iOS and
            Android), and all digital interfaces through which EasyFlyNStay provides its services.
          </li>
          <li>
            &ldquo;Third-Party Service Providers&rdquo; means airlines, hotels, payment gateways, insurance companies,
            analytics providers, marketing platforms, and other external vendors engaged by EasyFlyNStay in the course of
            providing its services.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>2. Legal Framework and Regulatory Compliance</h2>
        <p className={p}>
          EasyFlyNStay processes personal data in strict compliance with the applicable data protection laws and regulations
          of India. Our data protection framework is grounded in the following legislative instruments:
        </p>
        <ul className={ul}>
          <li>The Information Technology Act, 2000 (as amended), which governs the use of electronic data and information technology in India.</li>
          <li>
            The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
            Information) Rules, 2011, which prescribe the standards for handling sensitive personal information.
          </li>
          <li>
            The Digital Personal Data Protection Act, 2023 (DPDPA), which, upon full enforcement, provides a comprehensive
            legal framework for the protection of digital personal data in India, including rights of Data Principals,
            obligations of Data Fiduciaries, and conditions for consent-based processing.
          </li>
          <li>
            Any other applicable sector-specific regulations, guidelines, or directives issued by the Reserve Bank of
            India (RBI), the Insurance Regulatory and Development Authority of India (IRDAI), or any other competent
            regulatory authority.
          </li>
        </ul>
        <p className={p}>
          For users accessing the Platform from jurisdictions outside India, please note that your personal data will be
          primarily processed in India. By using the Platform, you acknowledge that data protection regulations applicable
          in India may differ from those of your country of residence, and you consent to your data being processed in
          India in accordance with Indian law.
        </p>
        <p className={p}>EasyFlyNStay processes personal data on one or more of the following lawful bases:</p>
        <ul className={ul}>
          <li>
            Consent: Where you have given clear, specific, informed, and unambiguous consent for the processing of your
            personal data for one or more specific purposes.
          </li>
          <li>
            Performance of Contract: Where processing is necessary to perform a contract to which you are a party, or to
            take steps at your request before entering into a contract — for example, processing your booking details to
            confirm a flight reservation.
          </li>
          <li>
            Compliance with Legal Obligations: Where processing is necessary for EasyFlyNStay to comply with a legal
            obligation, such as sharing passenger data with immigration authorities for international travel or complying
            with tax regulations.
          </li>
          <li>
            Legitimate Interests: Where processing is necessary for the purposes of EasyFlyNStay&apos;s legitimate
            business interests, provided that such interests are not overridden by your fundamental rights and freedoms.
            Examples include fraud prevention, network security, and service improvement analytics.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>3. Categories of Personal Data We Collect</h2>
        <p className={p}>
          EasyFlyNStay collects various categories of personal data from users, both directly (data provided by you) and
          indirectly (data collected automatically through your use of the Platform). The following describes in detail
          the types of personal data we collect:
        </p>
        <h3 className={h3}>3.1 Identity and Contact Information</h3>
        <p className={p}>
          When you create an account, make a booking, or contact us for support, we collect personal identification and
          contact details, including but not limited to:
        </p>
        <ul className={ul}>
          <li>Full legal name as it appears on your government-issued photo identification document (passport, Aadhaar card, PAN card, Voter ID, or Driving License).</li>
          <li>Date of birth and age for age verification, age-specific fare eligibility, and compliance purposes.</li>
          <li>Gender, which may be required by airlines for ticketing and check-in processing.</li>
          <li>Nationality and country of residence, particularly relevant for international flight bookings.</li>
          <li>Email address for sending booking confirmations, itinerary updates, account notifications, and promotional communications.</li>
          <li>Mobile phone number for sending booking confirmations via SMS, OTP-based authentication, WhatsApp notifications, and customer support communications.</li>
          <li>Residential or billing address for invoice generation, financial compliance, and identity verification purposes.</li>
        </ul>
        <h3 className={h3}>3.2 Travel Document Information</h3>
        <p className={p}>
          For the purpose of completing flight bookings, particularly international travel, we may collect and process
          travel document information, including:
        </p>
        <ul className={ul}>
          <li>Passport number, country of issuance, date of issue, and date of expiry. This information is mandatory for international bookings and is shared with airlines and immigration authorities as required.</li>
          <li>Visa details, including visa type, visa number, country of issuance, and validity period, where required for the destination or transit country.</li>
          <li>Government-issued identification document numbers (Aadhaar, PAN, Voter ID, or Driving License number) for domestic bookings where the airline requires ID verification.</li>
          <li>For Liberalized Remittance Scheme (LRS) compliance related to international bookings, your PAN details may be required and collected as per Reserve Bank of India guidelines.</li>
        </ul>
        <h3 className={h3}>3.3 Financial and Payment Information</h3>
        <p className={p}>
          When you make a payment through the Platform, financial data is processed. EasyFlyNStay does not store full
          credit or debit card numbers on its servers. Payment processing is handled by certified, PCI-DSS compliant
          third-party payment gateway partners. The following limited financial information may be retained by EasyFlyNStay
          for record-keeping and compliance purposes:
        </p>
        <ul className={ul}>
          <li>Last four digits of the credit or debit card used for the transaction (for transaction reference purposes only).</li>
          <li>Payment method type (e.g., credit card, debit card, UPI, net banking, wallet).</li>
          <li>Transaction reference numbers, payment gateway response codes, and transaction status records.</li>
          <li>Bank name and account type (for net banking or UPI transactions, as provided by the payment gateway).</li>
          <li>GST number and billing address where applicable for invoicing and tax compliance purposes.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay does not share your complete financial data with any third party other than the payment gateway
          required to process your transaction and financial institutions or authorities as required by law.
        </p>
        <h3 className={h3}>3.4 Booking and Travel Information</h3>
        <p className={p}>In connection with your travel bookings and service usage, we collect the following booking-related data:</p>
        <ul className={ul}>
          <li>Origin and destination cities, airports, travel dates, and times.</li>
          <li>Flight preferences including cabin class, seat preferences, meal preferences, and special service requests.</li>
          <li>Co-passenger details including names, ages, nationality, and travel document information for fellow travelers included in your booking.</li>
          <li>Hotel, accommodation, and ancillary service booking details where applicable.</li>
          <li>Booking reference numbers, PNR numbers, e-ticket numbers, and itinerary details.</li>
          <li>Travel history, booking patterns, and past transaction records maintained for service improvement, fraud detection, and personalization.</li>
          <li>Frequent flyer numbers or airline loyalty program details where voluntarily provided.</li>
        </ul>
        <p className={p}>
          If you are making a booking on behalf of other travelers, you represent and warrant that each co-traveler has
          consented to the collection and sharing of their personal data as described in this Policy, and that you have
          the authority to provide their information to EasyFlyNStay.
        </p>
        <h3 className={h3}>3.5 Account and Profile Information</h3>
        <p className={p}>When you register and maintain an account on the Platform, we collect and store the following profile data:</p>
        <ul className={ul}>
          <li>Username, login credentials (passwords are stored in a securely hashed and encrypted format), and account creation date.</li>
          <li>Profile preferences such as preferred cabin class, preferred airlines, saved traveler profiles, and communication preferences.</li>
          <li>Saved payment methods (stored tokenized references only — actual card data is not stored).</li>
          <li>Search history, recently viewed flights, and wishlist items maintained for personalization and user convenience.</li>
          <li>Customer support interaction history, complaint records, and feedback submissions.</li>
        </ul>
        <h3 className={h3}>3.6 Device, Technical, and Usage Data</h3>
        <p className={p}>
          When you access the Platform, we automatically collect technical and usage data through cookies, web beacons,
          log files, and similar tracking technologies. This data includes:
        </p>
        <ul className={ul}>
          <li>IP address and approximate geographic location derived from the IP address.</li>
          <li>Device type (mobile, tablet, desktop), operating system, and version.</li>
          <li>Browser type, version, and language settings.</li>
          <li>Unique device identifiers such as IMEI numbers or mobile advertising IDs (for app users).</li>
          <li>Pages visited, search queries entered, time spent on each page, and navigation paths within the Platform.</li>
          <li>Clickstream data, button interactions, and feature usage patterns.</li>
          <li>Referring URLs (the website from which you arrived at our Platform).</li>
          <li>Error logs, crash reports, and performance data collected for technical diagnostics and quality improvement.</li>
          <li>Session data including session duration, frequency of visits, and time of access.</li>
        </ul>
        <h3 className={h3}>3.7 Location Data</h3>
        <p className={p}>
          With your permission (and subject to your device and browser location-sharing settings), EasyFlyNStay may
          collect your precise or approximate geographic location data to:
        </p>
        <ul className={ul}>
          <li>Provide location-relevant search results such as nearby departure airports.</li>
          <li>Personalize fare suggestions and travel recommendations based on your current location or frequently visited cities.</li>
          <li>Comply with geo-specific legal requirements or restrictions.</li>
        </ul>
        <p className={p}>
          You may withdraw your consent to location data collection at any time by disabling location permissions in your
          device settings or browser. Disabling location access will not prevent you from using the core booking features
          of the Platform.
        </p>
        <h3 className={h3}>3.8 Communications Data</h3>
        <p className={p}>
          If you contact EasyFlyNStay for customer support via email, phone, live chat, WhatsApp, or any other channel,
          we may collect and retain:
        </p>
        <ul className={ul}>
          <li>The content of your communications, including complaint descriptions, feedback, and queries.</li>
          <li>Call recordings (where calls are recorded for quality assurance and training purposes; you will be notified at the beginning of any recorded call).</li>
          <li>Chat transcripts from live chat or WhatsApp interactions with our support team.</li>
          <li>Email correspondence including the full content of emails and attachments.</li>
        </ul>
        <h3 className={h3}>3.9 Social Media and Third-Party Login Data</h3>
        <p className={p}>
          If you choose to register or log in to EasyFlyNStay using a third-party social media account (such as Google,
          Facebook, or Apple Sign-In), we may receive and store the following data from that platform, subject to your
          privacy settings on the respective platform:
        </p>
        <ul className={ul}>
          <li>Social media user ID, name, and profile photograph.</li>
          <li>Email address linked to the social media account.</li>
          <li>Any other information you have made publicly available on that social media platform or have explicitly authorized us to access.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay does not post to your social media accounts without your express permission, and we do not access
          your social media account beyond what is necessary for authentication and profile creation.
        </p>
      </section>

      <section>
        <h2 className={h2}>4. How We Use Your Personal Data</h2>
        <p className={p}>
          EasyFlyNStay processes personal data for specific, explicitly stated, and legitimate purposes. We do not
          process personal data in a manner incompatible with the purpose for which it was originally collected. The
          following sets out a comprehensive description of how we use the personal data we collect:
        </p>
        <h3 className={h3}>4.1 Booking Processing and Service Delivery</h3>
        <p className={p}>The primary and most critical use of your personal data is to facilitate, process, and deliver the travel services you have requested. This includes:</p>
        <ul className={ul}>
          <li>Searching available flights, fares, and travel options based on your search criteria and preferences.</li>
          <li>Processing and confirming flight bookings, generating e-tickets, and issuing PNR numbers.</li>
          <li>Transmitting passenger information to the relevant airline or service provider to secure your reservation.</li>
          <li>Sending booking confirmation emails, e-tickets, itineraries, and boarding pass information to your registered contact details.</li>
          <li>Processing payment transactions securely through our payment gateway partners.</li>
          <li>Managing booking amendments, cancellations, and refund requests in accordance with applicable policies.</li>
          <li>Facilitating ancillary service requests such as seat selection, meal preferences, and special assistance arrangements.</li>
        </ul>
        <h3 className={h3}>4.2 Account Management and User Experience</h3>
        <ul className={ul}>
          <li>Creating, maintaining, verifying, and managing your registered user account.</li>
          <li>Enabling secure login and authentication through password-based or OTP-based verification.</li>
          <li>Personalizing your Platform experience based on your search history, booking patterns, and stated preferences.</li>
          <li>Displaying relevant flight recommendations, fare alerts, and promotional offers tailored to your travel preferences and history.</li>
          <li>Maintaining saved traveler profiles, saved payment methods (in tokenized form), and saved searches for your convenience.</li>
          <li>Enabling itinerary tracking, booking status updates, and trip management through the Platform.</li>
        </ul>
        <h3 className={h3}>4.3 Customer Support and Communication</h3>
        <ul className={ul}>
          <li>Responding to your customer support inquiries, complaints, booking queries, and feedback in a timely and effective manner.</li>
          <li>Proactively communicating important booking updates, schedule changes, cancellation alerts, and travel advisories related to your active bookings.</li>
          <li>Sending transactional communications such as payment receipts, refund confirmation notices, and account activity alerts.</li>
          <li>Conducting follow-up communications to resolve open support tickets or pending refund cases.</li>
        </ul>
        <h3 className={h3}>4.4 Marketing and Promotional Communications</h3>
        <p className={p}>Subject to your marketing communication preferences, EasyFlyNStay may use your personal data to:</p>
        <ul className={ul}>
          <li>Send you promotional emails, SMS messages, WhatsApp notifications, and push notifications containing travel deals, fare discounts, new service announcements, seasonal offers, and personalized travel recommendations.</li>
          <li>Conduct targeted advertising campaigns on third-party platforms (such as Google Ads, Meta/Facebook Ads, or programmatic ad networks) using anonymized or hashed versions of your contact data.</li>
          <li>Personalize marketing content and offers based on your travel history, stated preferences, and browsing behavior on the Platform.</li>
        </ul>
        <p className={p}>
          You have the right to opt out of receiving marketing communications at any time by clicking the
          &ldquo;Unsubscribe&rdquo; link in any marketing email, by adjusting your notification preferences in your account
          settings, or by contacting{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>
          . Opting out of marketing communications will not affect your receipt of transactional or booking-related
          messages, which are essential to the service.
        </p>
        <h3 className={h3}>4.5 Fraud Detection and Prevention</h3>
        <ul className={ul}>
          <li>Monitoring transactions and account activities for patterns indicative of fraud, identity theft, unauthorized access, or financial crime.</li>
          <li>Verifying the identity of users for high-risk transactions, particularly for bookings involving large sums, unusual itineraries, or multiple payment method changes.</li>
          <li>Complying with directives from payment gateways, banks, law enforcement agencies, or judicial authorities regarding suspected fraudulent transactions.</li>
          <li>Investigating and taking action in response to fraud alerts, chargeback claims, or reports of unauthorized account activity.</li>
        </ul>
        <h3 className={h3}>4.6 Legal Compliance and Regulatory Obligations</h3>
        <ul className={ul}>
          <li>Complying with applicable Indian laws, including tax obligations under the Goods and Services Tax (GST) framework, the Income Tax Act, and foreign exchange regulations under the Foreign Exchange Management Act (FEMA) and the Liberalized Remittance Scheme (LRS) of the Reserve Bank of India.</li>
          <li>Sharing passenger data with airlines, airport authorities, immigration departments, customs authorities, and other government agencies as required for domestic or international travel clearance.</li>
          <li>Responding to lawful requests from courts, law enforcement agencies, regulatory authorities, or government bodies as mandated by applicable law.</li>
          <li>Maintaining statutory records and audit trails as required under applicable laws and regulations.</li>
        </ul>
        <h3 className={h3}>4.7 Analytics, Research, and Service Improvement</h3>
        <ul className={ul}>
          <li>Conducting internal analytics on aggregated, anonymized user data to understand usage trends, identify popular routes, optimize the Platform&apos;s search and booking algorithms, and improve overall service quality.</li>
          <li>Using behavioral data to identify and fix bugs, technical issues, and performance bottlenecks in the Platform.</li>
          <li>Conducting user research, A/B testing, and usability studies to enhance the user interface and user experience.</li>
          <li>Generating business intelligence reports to inform strategic decisions, pricing strategies, and product development roadmaps.</li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>5. Sharing, Disclosure, and Transfer of Personal Data</h2>
        <p className={p}>
          EasyFlyNStay does not sell, rent, or trade your personal data to any third party for their independent
          commercial use. However, in the course of providing our services and fulfilling our legal obligations, we may
          share your personal data with the following categories of recipients:
        </p>
        <h3 className={h3}>5.1 Airlines and Travel Service Providers</h3>
        <p className={p}>
          When you make a booking, your personal data including name, contact details, travel document information, and
          any special service requests is shared with the operating airline or relevant travel service provider. This
          sharing is strictly necessary for the purpose of:
        </p>
        <ul className={ul}>
          <li>Issuing and confirming your flight ticket or PNR.</li>
          <li>Check-in processing and seat assignment.</li>
          <li>Baggage handling and special service arrangements.</li>
          <li>Compliance with airline check-in and security requirements.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay does not authorize airlines or service providers to use your information for any purpose other
          than fulfilling the booked service. However, airlines and service providers are independent data controllers
          once they receive your data, and their use of that data is subject to their own privacy policies, over which
          EasyFlyNStay has no control. Users are advised to review the privacy policies of the relevant airlines.
        </p>
        <h3 className={h3}>5.2 Payment Gateway and Financial Partners</h3>
        <p className={p}>
          Your payment transaction data is processed by our certified payment gateway partners who are PCI-DSS compliant.
          We share only the minimum payment information necessary to process your transaction. Payment gateway partners
          are contractually prohibited from using your financial data for any purpose other than processing the specific
          transaction. Relevant financial data may also be shared with:
        </p>
        <ul className={ul}>
          <li>Banks, card networks (Visa, Mastercard, RuPay, Amex), and UPI service providers as required to complete payment processing.</li>
          <li>Financial intelligence units, banks, or payment gateway operators if a fraud alert or chargeback claim is raised in connection with your transaction.</li>
        </ul>
        <h3 className={h3}>5.3 Technology and Service Vendors</h3>
        <p className={p}>EasyFlyNStay engages various third-party technology vendors, cloud service providers, and service partners to operate, maintain, and improve the Platform. These include:</p>
        <ul className={ul}>
          <li>Cloud hosting and data storage providers who host the Platform&apos;s infrastructure and databases.</li>
          <li>Analytics service providers (such as Google Analytics or similar platforms) that help us understand Platform usage patterns using aggregated and anonymized data.</li>
          <li>Email delivery and SMS communication service providers used to send transactional and marketing messages.</li>
          <li>Customer relationship management (CRM) software providers that help us manage user interactions and support cases.</li>
          <li>Cybersecurity and fraud detection service providers.</li>
        </ul>
        <p className={p}>
          All third-party vendors engaged by EasyFlyNStay are required to sign Data Processing Agreements (DPAs) and are
          contractually bound to process personal data only in accordance with EasyFlyNStay&apos;s written instructions,
          to maintain appropriate technical and organizational security measures, and not to use or disclose the data for
          any purpose beyond what is specified in the agreement.
        </p>
        <h3 className={h3}>5.4 Government Authorities and Law Enforcement</h3>
        <p className={p}>EasyFlyNStay may be required to disclose personal data to government agencies, law enforcement authorities, tax authorities, courts, or other regulatory bodies under the following circumstances:</p>
        <ul className={ul}>
          <li>To comply with a court order, subpoena, summons, or other legally binding directive.</li>
          <li>To respond to requests from law enforcement agencies investigating criminal activity, terrorism, or national security threats.</li>
          <li>To comply with reporting obligations under applicable tax laws, anti-money laundering regulations, or foreign exchange regulations.</li>
          <li>To share passenger information with immigration, customs, or aviation security authorities as required for international travel processing.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay will, to the extent permitted by law, attempt to notify affected users of such disclosures in
          advance unless prohibited by the applicable legal process. We will challenge legally excessive or
          disproportionate data requests to the fullest extent permitted by law.
        </p>
        <h3 className={h3}>5.5 Business Transfers and Corporate Transactions</h3>
        <p className={p}>
          In the event of a merger, acquisition, corporate restructuring, sale of all or substantially all of the
          Company&apos;s assets, or any other similar corporate transaction, your personal data may be transferred to
          the acquiring entity or successor organization as part of the transaction. In such cases, EasyFlyNStay will
          ensure that the receiving entity is bound by obligations at least as protective as those in this Privacy
          Policy. You will be notified of any such transfer and any material changes to how your data will be processed.
        </p>
        <h3 className={h3}>5.6 Marketing and Affiliate Partners (With Consent)</h3>
        <p className={p}>
          With your prior, explicit consent, EasyFlyNStay may share limited personal data (such as name, email address,
          and general travel preferences) with carefully selected affiliate partners, co-branding partners, or loyalty
          program operators who may offer complementary travel-related products and services. You will always be clearly
          informed and given the choice to opt in or opt out of such sharing. EasyFlyNStay does not share personal data
          with marketing partners without your consent.
        </p>
      </section>

      <section>
        <h2 className={h2}>6. Cookies, Tracking Technologies, and Analytics</h2>
        <h3 className={h3}>6.1 What Are Cookies?</h3>
        <p className={p}>
          Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit
          a website. They are widely used to make websites function efficiently, to provide a personalized experience, and
          to give website operators analytical information about user behavior. Cookies do not contain or transmit
          viruses and cannot access or read other information stored on your device.
        </p>
        <h3 className={h3}>6.2 Types of Cookies We Use</h3>
        <p className={p}>EasyFlyNStay uses the following categories of cookies on the Platform:</p>
        <h4 className={h4}>a) Strictly Necessary Cookies</h4>
        <p className={p}>
          These cookies are essential for the Platform to function correctly. They enable core functionalities such as
          user authentication, session management, shopping cart management, and security features. The Platform cannot
          function properly without these cookies, and they cannot be disabled.
        </p>
        <h4 className={h4}>b) Functional or Preference Cookies</h4>
        <p className={p}>
          These cookies allow the Platform to remember choices you have made (such as your preferred language, currency,
          cabin class preference, or login status) and to provide enhanced, personalized features. They may be set by
          EasyFlyNStay or by third-party providers whose services we have added to our pages. If you disable these cookies,
          some or all of these functionalities may not work as intended.
        </p>
        <h4 className={h4}>c) Performance and Analytics Cookies</h4>
        <p className={p}>
          These cookies collect information about how visitors use the Platform — for example, which pages are visited
          most often, how long users spend on certain pages, and whether users encounter any error messages. This
          information is used in aggregated and anonymized form to improve the Platform&apos;s performance and user
          experience. EasyFlyNStay uses tools such as Google Analytics for this purpose.
        </p>
        <h4 className={h4}>d) Marketing and Targeting Cookies</h4>
        <p className={p}>
          These cookies are set by EasyFlyNStay or our advertising partners to track your browsing activity across
          websites and to serve you relevant advertisements on third-party websites and social media platforms. They
          remember that you have visited our Platform and may be used to build a profile of your interests. We use
          platforms such as Google Ads, Meta Pixel, and other retargeting tools for this purpose. These cookies require
          your explicit consent before being activated.
        </p>
        <h4 className={h4}>e) Session Cookies vs. Persistent Cookies</h4>
        <p className={p}>
          Session cookies are temporary and expire once you close your browser. Persistent cookies remain on your device
          for a specified duration (or until you delete them). Most marketing and preference cookies are persistent, while
          authentication cookies are typically session-based.
        </p>
        <h3 className={h3}>6.3 Other Tracking Technologies</h3>
        <p className={p}>In addition to cookies, EasyFlyNStay may use the following tracking technologies:</p>
        <ul className={ul}>
          <li>Web Beacons (also called &ldquo;pixel tags&rdquo; or &ldquo;clear GIFs&rdquo;): These are tiny invisible images embedded in web pages or emails that allow us to track whether a web page has been accessed or an email has been opened. We use web beacons to measure the effectiveness of our email campaigns and to gather aggregate statistics about Platform usage.</li>
          <li>Mobile Device Identifiers: For mobile app users, we may use mobile advertising IDs (such as Google&apos;s Advertising ID or Apple&apos;s IDFA) to measure ad effectiveness and provide personalized in-app experiences, subject to your device&apos;s advertising tracking settings.</li>
          <li>Log Files: Our servers automatically record log files when you access the Platform, which include IP addresses, browser types, referring URLs, and page visit timestamps. These are used for security monitoring, error debugging, and aggregate analytics.</li>
        </ul>
        <h3 className={h3}>6.4 Managing and Controlling Cookies</h3>
        <p className={p}>You have the right to control and manage cookies through the following mechanisms:</p>
        <ul className={ul}>
          <li>Browser Settings: Most web browsers allow you to view, manage, delete, and block cookies through the browser&apos;s settings or preferences menu. Instructions vary by browser (Chrome, Firefox, Safari, Edge, etc.).</li>
          <li>Cookie Consent Banner: When you first visit the Platform, a cookie consent banner will appear, giving you the option to accept all cookies, customize your cookie preferences by category, or reject non-essential cookies.</li>
          <li>Third-Party Opt-Out Tools: You may opt out of targeted advertising cookies from Google through Google&apos;s Ad Settings or by visiting the Network Advertising Initiative (NAI) opt-out page. For Facebook/Meta ads, you can manage ad preferences in your Facebook account settings.</li>
        </ul>
        <p className={p}>
          Please note that disabling certain cookies may affect the functionality of the Platform, and you may not be able
          to access some features or personalized services if all cookies are blocked.
        </p>
      </section>

      <section>
        <h2 className={h2}>7. Data Retention Policy</h2>
        <p className={p}>
          EasyFlyNStay retains personal data only for as long as is necessary to fulfill the purposes for which it was
          collected, or as required by applicable laws and regulations. The following principles govern our data retention
          practices:
        </p>
        <h3 className={h3}>7.1 Account Data</h3>
        <p className={p}>
          Personal data associated with your registered user account (including profile information, contact details, and
          account preferences) is retained for the duration of your active account and for a period of up to 3 years after
          your last interaction with the Platform or your account closure, whichever is later. This retention period
          allows us to handle any post-closure queries, legal claims, or compliance requirements that may arise.
        </p>
        <h3 className={h3}>7.2 Booking and Transaction Records</h3>
        <p className={p}>
          Booking records, e-ticket copies, transaction histories, payment records, and associated correspondence are
          retained for a minimum period of 7 years from the date of the transaction, in compliance with the requirements
          of the Income Tax Act, 1961 and the GST compliance framework. This retention is necessary for audit, financial
          reporting, and dispute resolution purposes.
        </p>
        <h3 className={h3}>7.3 Communication Records</h3>
        <p className={p}>
          Records of customer support interactions, email correspondence, and chat transcripts are retained for a period
          of 3 years from the date of the last interaction. Call recordings, where applicable, are retained for a period of
          6 months unless a specific complaint or legal matter requires extended retention.
        </p>
        <h3 className={h3}>7.4 Consent Records</h3>
        <p className={p}>
          Records of your consent to specific data processing activities, including marketing opt-ins and cookie
          preferences, are retained for the duration of the consent&apos;s validity and for an additional period of 3 years
          after withdrawal of consent or account closure, to demonstrate compliance.
        </p>
        <h3 className={h3}>7.5 Legal Hold and Regulatory Obligations</h3>
        <p className={p}>
          In certain circumstances, EasyFlyNStay may be required to retain personal data beyond the standard retention
          periods described above, where such retention is mandated by:
        </p>
        <ul className={ul}>
          <li>Ongoing legal proceedings, investigations, or disputes in which the data is relevant evidence.</li>
          <li>A court order, legal hold notice, or regulatory direction requiring preservation of specific data.</li>
          <li>Specific statutory requirements that mandate retention for defined periods beyond our standard retention schedule.</li>
        </ul>
        <h3 className={h3}>7.6 Deletion and Anonymization</h3>
        <p className={p}>
          Upon the expiry of the applicable retention period, personal data will be securely deleted, destroyed, or
          anonymized in a manner that prevents its reconstruction or re-identification. Data that has been anonymized
          (i.e., all identifying information has been irreversibly removed) may be retained indefinitely for analytical
          and business intelligence purposes, as it no longer constitutes personal data.
        </p>
      </section>

      <section>
        <h2 className={h2}>8. Data Security Measures</h2>
        <p className={p}>
          EasyFlyNStay implements a comprehensive set of technical, administrative, and physical security measures to protect
          your personal data against unauthorized access, accidental loss, alteration, disclosure, or destruction. Our
          security framework includes, but is not limited to:
        </p>
        <h3 className={h3}>8.1 Technical Security Measures</h3>
        <ul className={ul}>
          <li>SSL/TLS Encryption in Transit: All data transmitted between your browser or app and EasyFlyNStay&apos;s servers is encrypted using industry-standard Secure Socket Layer (SSL) or Transport Layer Security (TLS) protocols. This ensures that your personal data, login credentials, and payment information are protected during transmission.</li>
          <li>Data Encryption at Rest: Sensitive personal data and financial records stored in EasyFlyNStay&apos;s databases are encrypted at rest using strong encryption algorithms to prevent unauthorized access even in the event of a server or storage breach.</li>
          <li>PCI-DSS Compliant Payment Processing: All payment transactions are processed through payment gateways that are certified as compliant with the Payment Card Industry Data Security Standard (PCI-DSS), the highest security standard for payment processing.</li>
          <li>Password Hashing: User passwords are never stored in plaintext. They are hashed using strong, industry-standard cryptographic hashing algorithms (such as bcrypt) before being stored, making them practically impossible to reverse-engineer.</li>
          <li>Firewalls and Intrusion Detection Systems: EasyFlyNStay&apos;s infrastructure is protected by enterprise-grade firewalls, intrusion detection systems (IDS), and intrusion prevention systems (IPS) that continuously monitor and block malicious traffic and unauthorized access attempts.</li>
          <li>Vulnerability Assessments and Penetration Testing: EasyFlyNStay conducts regular security assessments, vulnerability scans, and penetration tests to proactively identify and remediate security weaknesses in the Platform.</li>
          <li>Multi-Factor Authentication (MFA): MFA is available for user accounts to provide an additional layer of security beyond username and password.</li>
        </ul>
        <h3 className={h3}>8.2 Administrative Security Measures</h3>
        <ul className={ul}>
          <li>Access controls and role-based permissions that restrict access to personal data to only those employees, contractors, or service providers who have a genuine need to access it for their job functions.</li>
          <li>Background verification and confidentiality agreements for employees and contractors who handle personal data.</li>
          <li>Regular security awareness training for employees on data protection best practices, phishing prevention, and incident response procedures.</li>
          <li>Internal data handling policies and procedures that govern the classification, processing, storage, and disposal of personal data.</li>
          <li>Periodic internal audits of data access logs and processing activities to detect and address any unauthorized or anomalous data access.</li>
        </ul>
        <h3 className={h3}>8.3 Organizational and Physical Security Measures</h3>
        <ul className={ul}>
          <li>EasyFlyNStay&apos;s data processing systems and server infrastructure are housed in secure facilities with controlled physical access, CCTV surveillance, and environmental controls.</li>
          <li>Secure workstation policies, including screen locking, device encryption, and clean desk practices, are enforced for all employees handling personal data.</li>
        </ul>
        <h3 className={h3}>8.4 Limitations of Security</h3>
        <p className={p}>
          Despite EasyFlyNStay&apos;s best efforts to implement robust security measures, no method of data transmission
          over the internet or electronic storage is 100% secure. EasyFlyNStay cannot guarantee absolute security of your
          personal data. In the event of a data security breach that is likely to result in a high risk to your rights and
          freedoms, EasyFlyNStay will notify you in accordance with the obligations prescribed under applicable Indian data
          protection laws and will take all reasonable steps to mitigate the impact of the breach.
        </p>
        <p className={p}>
          If you become aware of or suspect any unauthorized access to your account or any breach of your personal data,
          please contact us immediately at{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          or call{" "}
          <a href="tel:+917090005700" className={link}>
            +91 7090005700
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={h2}>9. Your Rights as a Data Principal</h2>
        <p className={p}>
          Under applicable Indian data protection laws, including the Digital Personal Data Protection Act, 2023, and
          other relevant legislation, you have the following rights with respect to your personal data processed by
          EasyFlyNStay. EasyFlyNStay is committed to facilitating the exercise of these rights in a timely, transparent,
          and accessible manner.
        </p>
        <h3 className={h3}>9.1 Right of Access and Confirmation</h3>
        <p className={p}>
          You have the right to obtain confirmation from EasyFlyNStay as to whether your personal data is being processed,
          and if so, to access a copy of the personal data we hold about you, along with information about the purposes
          of processing, the categories of data processed, the recipients with whom it has been shared, and the
          applicable retention period. You may submit a data access request by emailing{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          with the subject line &ldquo;Data Access Request&rdquo; from your registered email address.
        </p>
        <h3 className={h3}>9.2 Right to Correction and Completion</h3>
        <p className={p}>
          You have the right to request the correction of inaccurate, incomplete, or outdated personal data we hold about
          you. For account-related data (name, contact details, preferences), you may update this information directly
          through your account settings on the Platform. For data that cannot be self-updated (such as booking records or
          transaction histories), please submit a correction request to{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>
          .
        </p>
        <h3 className={h3}>9.3 Right to Erasure (Right to be Forgotten)</h3>
        <p className={p}>You have the right to request the deletion of your personal data where:</p>
        <ul className={ul}>
          <li>The personal data is no longer necessary for the purposes for which it was collected.</li>
          <li>You have withdrawn your consent and there is no other lawful basis for continued processing.</li>
          <li>The personal data has been unlawfully processed.</li>
          <li>Deletion is required to comply with a legal obligation applicable to EasyFlyNStay.</li>
        </ul>
        <p className={p}>
          Please note that the right to erasure is subject to limitations. EasyFlyNStay may be unable to delete certain
          data where retention is necessary for compliance with legal obligations (such as tax record-keeping
          requirements), for the establishment, exercise, or defense of legal claims, or where the data is required to
          complete a service you have contracted for.
        </p>
        <h3 className={h3}>9.4 Right to Withdraw Consent</h3>
        <p className={p}>
          Where EasyFlyNStay processes your personal data based on your consent, you have the right to withdraw that
          consent at any time. Withdrawal of consent does not affect the lawfulness of processing that occurred before the
          withdrawal. Please note that withdrawing consent for data that is essential for service delivery (such as
          booking data) may result in EasyFlyNStay&apos;s inability to provide those services to you. To withdraw
          consent for optional processing activities (such as marketing communications or analytics), please contact{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          or use the unsubscribe mechanism in our marketing emails.
        </p>
        <h3 className={h3}>9.5 Right to Grievance Redressal</h3>
        <p className={p}>
          If you believe that your personal data has been processed in violation of applicable law or this Privacy
          Policy, or if you have any complaint related to data privacy, you have the right to raise a grievance with
          EasyFlyNStay&apos;s designated Grievance Officer. Details of the Grievance Officer are provided in Section 13 of
          this Policy. You also have the right to escalate unresolved complaints to the Data Protection Board of India,
          once it is formally constituted and operational under the Digital Personal Data Protection Act, 2023.
        </p>
        <h3 className={h3}>9.6 Right to Nominate</h3>
        <p className={p}>
          In the event of your death or incapacity, you may nominate a person who shall exercise your data protection
          rights on your behalf. This nomination may be submitted to EasyFlyNStay in writing to{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>
          .
        </p>
        <h3 className={h3}>9.7 How to Exercise Your Rights</h3>
        <p className={p}>
          To exercise any of the rights listed above, please submit a written request to EasyFlyNStay&apos;s customer
          support team at{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          with the subject line indicating the specific right you wish to exercise (e.g., &ldquo;Data Access Request&rdquo;
          or &ldquo;Data Deletion Request&rdquo;). Please include your full name, registered email address, and a brief
          description of your request. EasyFlyNStay will:
        </p>
        <ul className={ul}>
          <li>Acknowledge receipt of your request within 48 hours.</li>
          <li>Verify your identity before processing the request to prevent unauthorized access to your data.</li>
          <li>Respond to your request within 30 days of receipt, or inform you of any extension as permitted by applicable law.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay will process all rights requests free of charge in most cases. However, for manifestly unfounded or
          excessive requests (particularly repetitive requests), a reasonable administrative fee may be charged, or the
          request may be declined with a written explanation.
        </p>
      </section>

      <section>
        <h2 className={h2}>10. Children&apos;s Privacy</h2>
        <p className={p}>
          The Platform is not designed for, directed at, or intended for use by children below the age of 18 years.
          EasyFlyNStay does not knowingly collect, solicit, or process personal data from minors without the verifiable
          consent of a parent or legal guardian. If EasyFlyNStay becomes aware that personal data of a minor below the age
          of 18 has been collected without appropriate parental or guardian consent, we will take immediate steps to
          delete such data from our systems.
        </p>
        <p className={p}>
          If you are a parent or guardian and believe that your minor child has provided personal data to EasyFlyNStay
          without your consent, please contact us immediately at{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          or call{" "}
          <a href="tel:+917090005700" className={link}>
            +91 7090005700
          </a>
          . We will investigate and take appropriate action, including data deletion, within 30 days of receiving your
          request.
        </p>
        <p className={p}>
          Where a minor is included as a co-traveler in a booking made by an adult user, the adult user is responsible for
          ensuring that the minor&apos;s data has been provided with appropriate consent and authority, and that the minor
          (or their guardian, on the minor&apos;s behalf) has agreed to the data practices described in this Policy.
        </p>
      </section>

      <section>
        <h2 className={h2}>11. Third-Party Websites, Links, and Embedded Content</h2>
        <p className={p}>
          The Platform may contain hyperlinks, embedded content, widgets, or references to third-party websites,
          applications, or services that are not owned or operated by EasyFlyNStay. These may include airline websites,
          hotel booking engines, travel insurance portals, government visa and immigration portals, and social media
          platforms. The inclusion of a link to a third-party website does not constitute an endorsement of that website
          or its privacy practices by EasyFlyNStay.
        </p>
        <p className={p}>
          EasyFlyNStay has no control over the privacy policies, data collection practices, content, or security standards
          of third-party websites. When you navigate away from the EasyFlyNStay Platform to a third-party website, your
          personal data becomes subject to the privacy policy of that third party. EasyFlyNStay strongly recommends that
          you carefully review the privacy policy of any third-party website before providing any personal data to that
          site.
        </p>
        <p className={p}>
          Similarly, when you sign in to EasyFlyNStay using a third-party authentication service (such as Google Sign-In
          or Facebook Login), your use of that service is governed by the third party&apos;s own terms of service and
          privacy policy, in addition to this Policy. EasyFlyNStay is not responsible for the data practices of
          third-party authentication providers.
        </p>
      </section>

      <section>
        <h2 className={h2}>12. Cross-Border Data Transfers</h2>
        <p className={p}>
          EasyFlyNStay primarily processes and stores personal data in India. However, in connection with the delivery of
          our travel services, certain personal data may be transferred to and processed in countries outside India. Such
          cross-border transfers may occur in the following contexts:
        </p>
        <ul className={ul}>
          <li>Sharing passenger data with international airlines for the purpose of confirming international flight reservations.</li>
          <li>Transferring data to cloud service providers or data centers that may be located in jurisdictions outside India.</li>
          <li>Engaging third-party vendors or service partners based outside India (such as international analytics platforms or CRM providers) to process data on our behalf.</li>
          <li>Complying with international travel regulations that require sharing passenger data with foreign immigration, customs, or aviation security authorities.</li>
        </ul>
        <p className={p}>
          Where personal data is transferred outside India, EasyFlyNStay ensures that such transfers are conducted in
          compliance with applicable Indian law. Where required, EasyFlyNStay will implement appropriate safeguards such
          as contractual clauses, data processing agreements, or standard contractual terms approved by competent
          authorities to ensure that your personal data receives a standard of protection equivalent to that provided
          under Indian law.
        </p>
        <p className={p}>
          By using the Platform and consenting to this Privacy Policy, you explicitly consent to the transfer of your
          personal data outside India where necessary for the provision of our services, subject to the safeguards
          described above.
        </p>
      </section>

      <section>
        <h2 className={h2}>13. Grievance Officer and Data Protection Contact</h2>
        <p className={p}>
          In accordance with the Information Technology Act, 2000, the Information Technology (Intermediary Guidelines
          and Digital Media Ethics Code) Rules, 2021, and the Digital Personal Data Protection Act, 2023 (as applicable),
          EasyFlyNStay has designated a Grievance Officer responsible for addressing user complaints, grievances, and
          queries related to the processing of personal data. The Grievance Officer acts as the primary point of contact
          for all data-related concerns.
        </p>
        <div className="mt-4 border border-border bg-muted/30 px-5 py-4 text-[15px] leading-relaxed text-foreground/90">
          <p className="font-semibold text-foreground">Grievance Officer — EasyFlyNStay</p>
          <ul className="mt-3 list-none space-y-2 pl-0">
            <li>Designation: Grievance Officer / Data Protection Officer</li>
            <li>Organization: EasyFlyNStay</li>
            <li>
              Email:{" "}
              <a href="mailto:support@easyflynstay.com" className={link}>
                support@easyflynstay.com
              </a>{" "}
              (Subject: &ldquo;Privacy Grievance&rdquo; or &ldquo;Data Protection Query&rdquo;)
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+917090005700" className={link}>
                +91 7090005700
              </a>{" "}
              (24/7 Concierge Support)
            </li>
            <li>
              Postal Address: Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru,
              Karnataka 560066, India
            </li>
          </ul>
        </div>
        <p className={p}>EasyFlyNStay&apos;s Grievance Officer will:</p>
        <ul className={ul}>
          <li>Acknowledge receipt of all data-related grievances within 48 hours of submission.</li>
          <li>Investigate the grievance thoroughly and provide a substantive response or resolution within 30 calendar days from the date of receipt, unless an extension is required under applicable law, in which case the user will be informed accordingly.</li>
          <li>Escalate unresolved grievances to appropriate internal stakeholders or regulatory authorities where required.</li>
        </ul>
        <p className={p}>
          Users who are not satisfied with the response or resolution provided by the Grievance Officer may escalate their
          complaint to the Data Protection Board of India (once formally constituted under the Digital Personal Data
          Protection Act, 2023) or any other competent authority having jurisdiction over data protection matters.
        </p>
      </section>

      <section>
        <h2 className={h2}>14. Changes and Updates to This Privacy Policy</h2>
        <p className={p}>
          EasyFlyNStay reserves the right to update, revise, supplement, or otherwise modify this Privacy Policy at any
          time, at its sole discretion, to reflect changes in our data processing practices, applicable laws and
          regulations, business operations, technology infrastructure, or to respond to evolving privacy standards and
          best practices.
        </p>
        <p className={p}>
          Any changes to this Policy will be effective immediately upon being published on the Platform. The &ldquo;Last
          Updated&rdquo; date at the top of this Policy will be revised to reflect the date of the most recent
          modifications. EasyFlyNStay will endeavor to provide notice of material changes to this Policy through one or
          more of the following means:
        </p>
        <ul className={ul}>
          <li>Publishing a prominent notice on the Platform&apos;s homepage or login page.</li>
          <li>Sending an email notification to your registered email address.</li>
          <li>Displaying an in-app notification to mobile app users at the time of their next login.</li>
        </ul>
        <p className={p}>
          We strongly encourage you to review this Privacy Policy periodically to stay informed about how we are
          protecting your personal data and to understand your rights. Your continued use of the Platform after the
          publication of any changes to this Policy constitutes your acknowledgment of the modified Policy and your
          consent to be bound by the revised terms.
        </p>
        <p className={p}>
          If you do not agree with the changes to this Privacy Policy, you must immediately discontinue use of the
          Platform and, if you wish, request deletion of your account and associated personal data in accordance with
          Section 9 of this Policy.
        </p>
      </section>

      <section>
        <h2 className={h2}>15. Contact Us</h2>
        <p className={p}>
          If you have any questions, concerns, or requests regarding this Privacy Policy, the handling of your personal
          data, or the exercise of your data protection rights, please do not hesitate to contact EasyFlyNStay through
          the following channels. Our team is committed to responding to all privacy-related inquiries in a thorough and
          timely manner.
        </p>
        <div className="mt-4 border border-border bg-muted/30 px-5 py-4 text-[15px] leading-relaxed text-foreground/90">
          <p className="font-semibold text-foreground">EasyFlyNStay Privacy and Data Protection Team</p>
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
              Phone / WhatsApp:{" "}
              <a href="tel:+917090005700" className={link}>
                +91 7090005700
              </a>{" "}
              (24/7 Concierge — Available round the clock)
            </li>
            <li>
              Postal Address: Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru,
              Karnataka 560066, India
            </li>
          </ul>
        </div>
        <p className={p}>
          For data access requests, data deletion requests, or consent withdrawal requests, please email us at{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          with the appropriate subject line (e.g., &ldquo;Data Access Request&rdquo;, &ldquo;Data Deletion Request&rdquo;,
          or &ldquo;Consent Withdrawal&rdquo;) from your registered email address, along with your full name and booking
          reference number where applicable.
        </p>
      </section>

      <footer className="mt-14 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>
          This Privacy Policy is subject to periodic review. The current version is always available at{" "}
          <Link href="/privacy" className={link}>
            www.easyflynstay.com/privacy
          </Link>
        </p>
        <p className="mt-2">© 2026 EasyFlyNStay. All Rights Reserved. | Bengaluru, Karnataka, India</p>
      </footer>
    </article>
  );
}
