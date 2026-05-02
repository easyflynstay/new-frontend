import Link from "next/link";

const p = "mt-3 text-[15px] sm:text-base leading-[1.75] text-foreground/[0.88]";
const ul = "mt-3 list-disc space-y-2 pl-6 text-[15px] sm:text-base leading-[1.75] text-foreground/[0.88]";
const ol = "mt-3 list-decimal space-y-2 pl-6 text-[15px] sm:text-base leading-[1.75] text-foreground/[0.88]";
const h2 = "font-body text-lg sm:text-xl font-bold tracking-tight text-foreground scroll-mt-24";
const h3 = "font-body text-base font-semibold text-foreground mt-6";
const link = "text-primary underline underline-offset-2 hover:text-primary/80";

export function RefundCancellationDocument() {
  return (
    <article className="text-left [&>section]:mt-12 [&>section]:border-t [&>section]:border-border/70 [&>section]:pt-10 sm:[&>section]:mt-14 sm:[&>section]:pt-12 [&>section:first-of-type]:mt-14 sm:[&>section:first-of-type]:mt-16">
      <header className="border-b border-border pb-8">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">EasyFlyNStay</p>
        <h1 className="font-body mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Refund &amp; Cancellation Policy
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
            +91 70 9000 5700
          </a>
        </p>
      </header>

      <p className={p}>
        This Refund &amp; Cancellation Policy (&ldquo;Policy&rdquo;) is an integral part of the EasyFlyNStay User
        Agreement and is to be read in conjunction with our{" "}
        <Link href="/terms" className={link}>
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className={link}>
          Privacy Policy
        </Link>
        . It sets out the complete framework governing all cancellations, amendments, modifications, refund requests,
        and related procedures for bookings made through the EasyFlyNStay platform (
        <a href="https://www.easyflynstay.com" className={link} target="_blank" rel="noopener noreferrer">
          www.easyflynstay.com
        </a>
        ) and its associated mobile applications (collectively, the &ldquo;Platform&rdquo;).
      </p>
      <p className={p}>
        EasyFlyNStay operates as a technology-enabled intermediary facilitating access to travel services provided by
        third-party airlines, service operators, and payment processors. As such, a significant portion of the
        cancellation and refund terms applicable to any given booking are determined by the respective airline&apos;s
        fare rules and cancellation policies, which are beyond EasyFlyNStay&apos;s control. EasyFlyNStay&apos;s own
        service charges and convenience fees, however, are governed exclusively by the terms set out in this Policy.
      </p>
      <p className={p}>
        By completing a booking on the Platform, you unconditionally acknowledge that you have read, understood, and
        agreed to be fully bound by this Policy. If you do not agree to any provision of this Policy, you must refrain
        from making bookings on the Platform.
      </p>
      <p className="mt-4 rounded-sm border border-primary/20 bg-primary/[0.04] px-4 py-3 text-sm font-semibold leading-relaxed text-foreground">
        <span className="uppercase tracking-wide">Important:</span> EasyFlyNStay strongly recommends that all users
        carefully review the fare rules applicable to their specific ticket at the time of booking — before confirming
        payment — to fully understand their cancellation and refund entitlements. Fare rules are displayed during the
        booking process and are available in the &ldquo;My Bookings&rdquo; section post-booking.
      </p>

      <section>
        <h2 className={h2}>1. General Policy Framework</h2>
        <p className={p}>
          EasyFlyNStay acts as an intermediary, facilitator, and aggregator between users and third-party travel service
          providers including airlines, hotels, and ancillary service operators. The following overarching principles
          govern all cancellations, amendments, and refund requests processed through the Platform:
        </p>
        <h3 className={h3}>1.1 Role of EasyFlyNStay</h3>
        <p className={p}>
          EasyFlyNStay&apos;s role is to assist users in initiating, processing, and tracking cancellation and refund
          requests with the relevant airline or service provider. EasyFlyNStay itself does not set airline cancellation
          charges, fare rules, or refund quantum. These are determined exclusively by the operating airline or
          third-party service provider based on the ticket type, fare class, route, and timing of cancellation.
        </p>
        <p className={p}>
          When you request a cancellation through EasyFlyNStay, we transmit your request to the relevant airline on your
          behalf, track the status of the refund from the airline, and upon receipt, credit the refundable amount to your
          original payment method after deducting EasyFlyNStay&apos;s applicable non-refundable service charges.
          EasyFlyNStay cannot compel an airline to issue a refund beyond what the airline&apos;s fare rules provide for.
        </p>
        <h3 className={h3}>1.2 Non-Refundable Components</h3>
        <p className={p}>
          The following components are non-refundable under all circumstances, regardless of the reason for cancellation,
          the timing of the request, or the nature of the fare:
        </p>
        <ul className={ul}>
          <li>
            EasyFlyNStay Service Fee / Convenience Fee: The service or convenience fee charged by EasyFlyNStay at the time
            of booking is strictly non-refundable in all cases. This fee covers EasyFlyNStay&apos;s cost of providing
            booking facilitation, customer support, and platform services.
          </li>
          <li>
            Payment Gateway Processing Charges: Any payment gateway transaction fee charged at the time of payment
            processing is non-refundable, as it is collected and retained by the payment gateway operator.
          </li>
          <li>
            Zero Cancellation Cover Premium: If you opted for the Zero Cancellation protection product at the time of
            booking, the premium paid for this product is non-refundable in all cases — even if the underlying booking is
            cancelled and a full refund of the base fare is processed.
          </li>
          <li>
            Travel Insurance Premium: If travel insurance was purchased in connection with your booking, the insurance
            premium is non-refundable. Claims under the travel insurance policy are to be processed directly with the
            insurance provider as per the terms of the insurance policy.
          </li>
          <li>
            Seat Selection, Meal, and Ancillary Add-On Fees: Paid ancillary charges such as advance seat selection fees,
            pre-ordered in-flight meals, and excess baggage pre-purchases are generally non-refundable, subject to the
            specific airline&apos;s policy on ancillary refunds.
          </li>
          <li>
            Non-Refundable Taxes and Surcharges: Certain government-imposed levies, fuel surcharges, and passenger
            service fees may be non-refundable as per the airline&apos;s policy and applicable government regulations.
          </li>
        </ul>
        <h3 className={h3}>1.3 Applicable Fare Rules</h3>
        <p className={p}>
          Every flight ticket booked on EasyFlyNStay is subject to a specific set of fare rules defined by the operating
          airline for the selected fare class, origin-destination pair, and booking date. These fare rules may classify a
          ticket as one of the following:
        </p>
        <ul className={ul}>
          <li>
            Fully Refundable Fares: These tickets allow cancellation with a partial or full refund of the base fare
            after deduction of the airline&apos;s applicable cancellation penalty. Refundable fares typically carry a
            higher base price in exchange for flexibility.
          </li>
          <li>
            Partially Refundable Fares: These tickets permit cancellation with a refund of only certain components (e.g.,
            base fare minus a penalty, or taxes only), while other components are forfeited.
          </li>
          <li>
            Non-Refundable / Saver Fares: These tickets do not permit any refund of the base fare upon cancellation. Only
            certain government-imposed taxes that are mandatorily refundable under applicable law may be refunded. These
            fares carry the lowest price point but offer no flexibility.
          </li>
        </ul>
        <p className={p}>
          Users are strongly advised to check the fare rules specific to their ticket before booking. EasyFlyNStay
          displays the applicable fare rules during the booking process on the fare summary and at the payment
          confirmation stage. The fare rules applicable to your booking are also accessible in the &ldquo;My
          Bookings&rdquo; section of your account after booking completion.
        </p>
      </section>

      <section>
        <h2 className={h2}>2. Flight Booking Cancellation Policy</h2>
        <h3 className={h3}>2.1 How to Initiate a Cancellation Request</h3>
        <p className={p}>
          Cancellation requests for flight bookings must be formally and officially initiated through one of the
          following channels only. Verbal cancellation requests made over the phone without a written follow-up will
          not be recognized as valid cancellation requests and will not trigger the refund process:
        </p>
        <ul className={ul}>
          <li>
            &ldquo;My Bookings&rdquo; Section: Log in to your EasyFlyNStay account at www.easyflynstay.com, navigate to
            &ldquo;My Bookings&rdquo; or &ldquo;My Trips&rdquo;, select the relevant booking, and click on the
            &ldquo;Cancel Booking&rdquo; or &ldquo;Request Cancellation&rdquo; button to initiate the process online.
          </li>
          <li>
            Email Request: Send a cancellation request email to{" "}
            <a href="mailto:support@easyflynstay.com" className={link}>
              support@easyflynstay.com
            </a>{" "}
            from your registered email address. The email must include your full name, booking reference number
            (PNR/booking ID), the names of all passengers to be cancelled, the specific flight(s) to be cancelled, and
            the reason for cancellation.
          </li>
          <li>
            Customer Support Phone / WhatsApp: Contact our 24/7 concierge team at{" "}
            <a href="tel:+917090005700" className={link}>
              +91 70 9000 5700
            </a>
            . Please note that while a phone or WhatsApp inquiry may initiate the cancellation process, a formal written
            confirmation (email or online request) may be required for the request to be fully processed.
          </li>
        </ul>
        <p className={p}>
          The date and time of cancellation shall be calculated based on the timestamp at which the cancellation request
          is successfully received and logged in EasyFlyNStay&apos;s system — not the time at which it was sent or verbally
          communicated. Users are advised to ensure they receive an acknowledgment of their cancellation request before
          assuming it has been processed.
        </p>
        <h3 className={h3}>2.2 Cancellation by the User — Domestic Flights</h3>
        <p className={p}>
          For domestic flight bookings (within India), the following general cancellation framework applies, subject to
          the specific fare rules of the booked ticket. Cancellation charges are imposed by the airline and are passed
          through to the user net of any applicable refund:
        </p>
        <ul className={ul}>
          <li>
            Cancellations made more than 7 days (168 hours) prior to the scheduled departure: Cancellation charges as per
            airline fare rules apply. Refundable fares typically attract a moderate per-sector cancellation fee ranging
            from INR 500 to INR 3,500 per passenger, depending on the airline and fare class. Non-refundable fares: zero
            refund of base fare; only refundable government taxes (if any) will be returned.
          </li>
          <li>
            Cancellations made between 2 days (48 hours) and 7 days (168 hours) prior to scheduled departure: Cancellation
            charges are generally higher and may range from INR 2,000 to INR 4,500 per passenger per sector for refundable
            fares. Non-refundable fares: zero refund.
          </li>
          <li>
            Cancellations made between 4 hours and 48 hours prior to scheduled departure: Cancellation charges are at
            their highest, typically equivalent to 50% to 100% of the base fare for refundable fares. Non-refundable
            fares: zero refund.
          </li>
          <li>
            Cancellations made within 4 hours of the scheduled departure time: Most airlines do not permit online
            cancellations within 4 hours of departure. Users must contact the airline directly. No refund is typically
            applicable for last-minute cancellations; the booking may be treated as a no-show.
          </li>
        </ul>
        <p className={p}>
          <strong className="font-semibold text-foreground">Important:</strong> Actual cancellation charges vary
          significantly by airline (IndiGo, Air India, Vistara, Akasa Air, SpiceJet, etc.), fare class (Saver, Flexi,
          Business), and route. The exact refundable amount will be clearly displayed to you on the cancellation
          confirmation screen before you confirm the cancellation request. You are advised to review this amount carefully
          before proceeding.
        </p>
        <h3 className={h3}>2.3 Cancellation by the User — International Flights</h3>
        <p className={p}>
          For international flight bookings, cancellation terms are predominantly governed by the specific fare rules of
          the international airline (domestic and foreign carriers). International cancellation policies are typically
          more complex and vary significantly by carrier, fare class, route, and booking class. The following general
          guidelines apply:
        </p>
        <ul className={ul}>
          <li>
            Fully Flexible / Business Class Fares: These fares typically permit cancellation with a moderate penalty (or in
            some cases, at no charge) up to a specified number of hours before departure. The penalty, if any, may range
            from USD 50 to USD 300 or equivalent per passenger.
          </li>
          <li>
            Semi-Flexible / Premium Economy Fares: These fares allow cancellation with a moderate to high penalty,
            typically ranging from USD 100 to USD 400 per passenger depending on the airline.
          </li>
          <li>
            Economy Saver / Promotional Fares: These fares are generally fully non-refundable or permit only a refund of
            refundable government taxes. The base fare, fuel surcharge, and airline-imposed levies are typically forfeited
            in full upon cancellation.
          </li>
          <li>
            For round-trip international bookings issued under a single PNR: If the passenger is marked as a no-show for
            the outbound sector, the entire PNR including the return sector will typically be cancelled by the airline
            automatically. Users facing such situations must contact both the airline and EasyFlyNStay immediately prior to
            the no-show to explore available options.
          </li>
        </ul>
        <p className={p}>
          EasyFlyNStay will clearly communicate the applicable cancellation charges and estimated refund amount (if any)
          before processing an international cancellation request. For complex international itineraries involving
          connecting flights, codeshare services, or multi-airline routes, cancellation may need to be coordinated with
          one or more airlines, and processing timelines may be longer than standard.
        </p>
        <h3 className={h3}>2.4 Cancellations within 24 Hours of Scheduled Departure</h3>
        <p className={p}>
          For cancellations requested within 24 hours of the scheduled departure time, EasyFlyNStay strongly recommends
          that users contact the operating airline directly to initiate the cancellation, as many airlines do not permit
          third-party online cancellations within this window. Users should then:
        </p>
        <ol className={ol}>
          <li>Contact the operating airline&apos;s customer care or airport counter directly to request cancellation of the ticket.</li>
          <li>Obtain a written confirmation or reference number from the airline confirming the cancellation.</li>
          <li>
            Submit a refund request to EasyFlyNStay at{" "}
            <a href="mailto:support@easyflynstay.com" className={link}>
              support@easyflynstay.com
            </a>{" "}
            or through the &ldquo;My Bookings&rdquo; portal, attaching the airline&apos;s cancellation confirmation.
          </li>
        </ol>
        <p className={p}>
          Please note that EasyFlyNStay does not automatically receive alerts or notifications when a ticket is cancelled
          directly with an airline. It is the user&apos;s responsibility to inform EasyFlyNStay of any such direct
          airline cancellation for the refund to be processed on EasyFlyNStay&apos;s end.
        </p>
        <h3 className={h3}>2.5 Partial Cancellations</h3>
        <p className={p}>Partial cancellations refer to scenarios where only some of the passengers in a group booking, or only one leg of a multi-sector or round-trip booking, are cancelled. The following conditions apply:</p>
        <ul className={ul}>
          <li>Not all fare types and airlines permit partial cancellations. Some fares require all passengers and all sectors to be cancelled simultaneously.</li>
          <li>For round-trip bookings, cancelling only the outbound sector may void the return sector in certain fare classes. Similarly, cancelling only the return sector may result in the airline treating the outbound segment as a one-way booking and recalculating the fare difference.</li>
          <li>For group bookings (6 or more passengers), partial cancellations may affect the group fare discount and may result in recalculation of fares for the remaining passengers.</li>
          <li>For multi-city or open-jaw international itineraries, the cancellation of any one segment may affect the fare eligibility and booking conditions of all other segments in the itinerary.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay will clearly indicate whether a partial cancellation is permitted for your specific booking and will
          communicate the implications of such cancellation before you confirm the request. Users are strongly advised to
          seek clarification from EasyFlyNStay customer support before proceeding with any partial cancellation.
        </p>
        <h3 className={h3}>2.6 Airline-Initiated Cancellations</h3>
        <p className={p}>
          In the event that a flight is cancelled by the operating airline (as opposed to the passenger), users are
          entitled to one of the following remedies as per the airline&apos;s policy and applicable aviation regulations:
        </p>
        <ul className={ul}>
          <li>Full Refund of the Ticket Price: A complete refund of the fare paid, including applicable taxes, to the original payment method. In such cases, EasyFlyNStay&apos;s service fee / convenience fee may also be refunded at EasyFlyNStay&apos;s discretion.</li>
          <li>Alternative Flight Option: The airline may offer to rebook the passenger on the next available flight to the same destination at no additional charge, subject to seat availability.</li>
          <li>Credit Shell / Future Travel Credit: Some airlines offer a travel credit voucher (valid for a specified period) in lieu of a cash refund, particularly in cases of operational cancellations.</li>
        </ul>
        <p className={p}>
          <strong className="font-semibold text-foreground">Important:</strong> EasyFlyNStay does not receive automatic
          notifications from airlines when a flight is cancelled. If your flight has been cancelled by the airline and you
          have not heard from EasyFlyNStay within a reasonable time, please contact our customer support team at{" "}
          <a href="tel:+917090005700" className={link}>
            +91 70 9000 5700
          </a>{" "}
          or{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          immediately. Please also inform EasyFlyNStay if you have directly contacted the airline for a refund, so that
          we can track the refund on our end and credit it to your account once received.
        </p>
      </section>

      <section>
        <h2 className={h2}>3. Flight Booking Amendment and Modification Policy</h2>
        <h3 className={h3}>3.1 Types of Amendments</h3>
        <p className={p}>EasyFlyNStay provides amendment facilitation services for eligible flight bookings. The following types of amendments may be available depending on the airline and fare conditions:</p>
        <ul className={ul}>
          <li>Date Change: Modification of the outbound or return travel date to a different date on the same route. Date changes are subject to seat availability on the new date and may attract a fare difference if the new fare is higher than the original fare. No credit is issued if the new fare is lower.</li>
          <li>Time Change: Modification of the departure time to a different flight on the same date and route (same day change), subject to availability.</li>
          <li>Name Correction: Minor spelling corrections to a passenger&apos;s name where it does not match the travel document. Most airlines allow minor corrections (up to 3 characters) but do not permit full name changes or name transfers to a different person.</li>
          <li>Cabin Class Upgrade: Upgrade from Economy to Premium Economy, Business, or First Class, subject to availability and payment of the applicable fare difference and upgrade fee.</li>
          <li>Route Modification: Changes to origin or destination airports may be treated as a full cancellation of the original booking and rebooking on a new itinerary, with applicable cancellation charges and new fare pricing.</li>
        </ul>
        <h3 className={h3}>3.2 Amendment Charges</h3>
        <p className={p}>Amendment charges for flight bookings consist of two components:</p>
        <ul className={ul}>
          <li>Airline Amendment / Change Fee: A fee charged by the airline for processing the modification. This fee varies by airline, fare class, route, and the timing of the amendment relative to the departure date. For refundable / flexible fares, change fees may range from INR 500 to INR 3,500 per passenger per sector for domestic flights, and from USD 75 to USD 350 per passenger for international flights. Non-refundable / saver fares typically do not permit date changes or attract very high change fees.</li>
          <li>EasyFlyNStay Amendment Processing Fee: EasyFlyNStay charges a nominal amendment processing fee for facilitating the modification on the user&apos;s behalf. This fee will be communicated to you before you confirm the amendment request and is non-refundable once the amendment has been processed.</li>
          <li>Fare Difference: If the new fare applicable to the modified itinerary is higher than the original fare paid, the difference in fare must be paid by the user. If the new fare is lower, no refund of the fare difference will be issued.</li>
        </ul>
        <p className={p}>
          All amendment charges are in addition to the original booking cost. The total cost of the amendment (airline fee
          + EasyFlyNStay processing fee + fare difference) will be clearly communicated to you for your approval before the
          amendment is confirmed.
        </p>
        <h3 className={h3}>3.3 How to Request an Amendment</h3>
        <p className={p}>Amendment requests must be submitted through the following channels:</p>
        <ul className={ul}>
          <li>Online: Log in to your account at www.easyflynstay.com, go to &ldquo;My Bookings&rdquo; or &ldquo;My Trips&rdquo;, select the relevant booking, and choose the &ldquo;Modify Booking&rdquo; or &ldquo;Change Date&rdquo; option if available.</li>
          <li>Email: Send a detailed amendment request to <a href="mailto:support@easyflynstay.com" className={link}>support@easyflynstay.com</a> with your booking reference number, passenger names, current travel dates, and the desired new travel dates or changes.</li>
          <li>Customer Support: Contact our concierge team at <a href="tel:+917090005700" className={link}>+91 70 9000 5700</a> (24/7) for assistance with complex amendments, especially for multi-sector international itineraries.</li>
        </ul>
        <p className={p}>
          Amendment requests are processed subject to seat availability on the preferred new travel date and the applicable
          fare conditions. EasyFlyNStay cannot guarantee the availability of seats on any specific date or flight.
        </p>
        <h3 className={h3}>3.4 Effect of Amendment on Cancellation Terms</h3>
        <p className={p}>
          Once an amendment is processed and the original booking has been rescheduled to a new date or time, the
          original booking is considered modified. Any subsequent cancellation of the amended booking will be treated as a
          fresh cancellation request, and the cancellation charges applicable at the time of the cancellation request will be
          levied on the modified booking — not on the original fare or booking date. Users should be aware that the total
          charges incurred (amendment fee + cancellation fee on the modified booking) may in some cases exceed the
          original ticket value.
        </p>
      </section>

      <section>
        <h2 className={h2}>4. No-Show and Missed Flight Policy</h2>
        <h3 className={h3}>4.1 Definition of No-Show</h3>
        <p className={p}>
          A &ldquo;No-Show&rdquo; occurs when a passenger holding a confirmed booking fails to present themselves at the
          airport check-in counter or boarding gate before the check-in deadline for the scheduled flight, without having
          cancelled or modified the booking in advance through any authorized channel. A no-show also occurs when a
          passenger checks in but fails to board the aircraft before the boarding gate closes.
        </p>
        <h3 className={h3}>4.2 Consequences of a No-Show</h3>
        <p className={p}>No-show situations carry significant consequences with respect to refund eligibility and subsequent travel segments:</p>
        <ul className={ul}>
          <li>Refund on No-Show Fares: In most cases, no-show penalties imposed by airlines are equivalent to the full value of the ticket — effectively resulting in zero refund on the base fare. Some airlines may permit a refund of certain government-imposed taxes (such as Passenger Service Fee or Airport Development Fee) that are mandatorily refundable even in no-show scenarios, subject to the airline&apos;s policy.</li>
          <li>Impact on Connecting or Return Segments: For itineraries involving multiple segments or connecting flights issued under a single PNR, a no-show on the outbound segment will automatically trigger the cancellation of all subsequent segments by the airline&apos;s reservation system. Users who anticipate missing a connection or outbound flight must contact the airline and EasyFlyNStay immediately to explore options and mitigate the impact on their return or onward journey.</li>
          <li>For International Round-Trip Bookings under a Single PNR: If the passenger is marked as a no-show for the outbound (departing) sector, the return sector will also be automatically cancelled by the airline. In such cases, the passenger must contact the airline directly before the outbound departure time to request alternative arrangements.</li>
        </ul>
        <h3 className={h3}>4.3 No-Show Refund Request Deadline</h3>
        <p className={p}>
          Refund requests related to no-show or unutilized bookings must be submitted to EasyFlyNStay within 90 calendar
          days from the originally scheduled date of departure. Any refund requests submitted after the expiry of this
          90-day window will not be considered, and any amount that may otherwise have been refundable will be treated as
          permanently forfeited. EasyFlyNStay will not be held responsible for any loss arising from the user&apos;s failure
          to submit a timely refund request.
        </p>
        <h3 className={h3}>4.4 Missed Connections</h3>
        <p className={p}>
          If a passenger misses a connecting flight due to a delay in the incoming flight (where both segments are booked
          under the same PNR or are protected by the airline), the airline is generally obligated to rebook the passenger
          on the next available flight to the destination at no additional charge. However, if the connecting flight was
          booked on a separate PNR (even if booked through EasyFlyNStay), EasyFlyNStay cannot guarantee rebooking
          assistance, and the passenger may need to purchase a new ticket for the missed connection. EasyFlyNStay recommends
          always booking connecting flights under a single PNR to benefit from airline-protected connection guarantees.
        </p>
      </section>

      <section>
        <h2 className={h2}>5. Airline-Initiated Schedule Changes, Delays, and Diversions</h2>
        <h3 className={h3}>5.1 Schedule Changes</h3>
        <p className={p}>
          Airlines may, from time to time and at their discretion, change the scheduled departure or arrival times of
          flights, modify routes, swap aircraft types, or alter terminal assignments. These changes are beyond
          EasyFlyNStay&apos;s control. In the event of a significant schedule change (generally defined as a change of more
          than 60 minutes to the originally scheduled departure or arrival time), the following options may be available to
          affected passengers:
        </p>
        <ul className={ul}>
          <li>Acceptance of the New Schedule: If the revised schedule is acceptable, the passenger may retain their booking at no additional charge.</li>
          <li>Rescheduling to an Alternative Flight: The passenger may request to be moved to an earlier or later flight on the same route on the same day or an alternative date, subject to seat availability and airline policy.</li>
          <li>Full Cancellation with Refund: If the schedule change is significant and the passenger does not wish to travel on the revised schedule or an alternative flight, a full refund of the ticket value (including base fare, taxes, and surcharges) may be processed. In such cases, EasyFlyNStay will also endeavor to refund its service fee / convenience fee at its discretion.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay will make reasonable efforts to communicate schedule changes communicated to us by airlines to
          affected users. However, EasyFlyNStay cannot guarantee that all airline-initiated schedule changes will be
          communicated to users in real time, as airlines do not always proactively notify booking agencies of minor
          adjustments. Users are advised to regularly check their booking status, the airline&apos;s website, or the airport
          information systems closer to their travel date.
        </p>
        <h3 className={h3}>5.2 Flight Delays</h3>
        <p className={p}>
          In the event of a flight delay, passengers retain their booking and are entitled to board the delayed flight
          unless the delay exceeds the airline&apos;s threshold for offering alternative options. Refunds for
          passenger-initiated cancellations arising from flight delays are subject to the airline&apos;s delay refund
          policy. EasyFlyNStay cannot guarantee refunds for cancelled bookings arising from flight delays, as the extent
          of the refund is determined entirely by the airline. Passengers affected by significant delays are advised to
          contact the airline directly at the airport for immediate assistance, and to inform EasyFlyNStay for follow-up
          support.
        </p>
        <h3 className={h3}>5.3 Flight Diversions</h3>
        <p className={p}>
          In the event of a flight diversion (where the aircraft lands at a different airport than originally planned due
          to operational, meteorological, or safety reasons), the airline is responsible for arranging alternative transport
          to the original destination, providing accommodation where required, and making alternative arrangements for the
          passenger. EasyFlyNStay is not a party to such arrangements and cannot be held liable for costs, losses, or
          inconveniences arising from flight diversions. Any compensation claims must be directed to the operating
          airline.
        </p>
      </section>

      <section>
        <h2 className={h2}>6. Refund Policy — Processing, Timelines, and Methods</h2>
        <h3 className={h3}>6.1 Conditions for Refund Eligibility</h3>
        <p className={p}>A refund will be initiated and processed by EasyFlyNStay only when all of the following conditions are satisfied:</p>
        <ol className={ol}>
          <li>A valid cancellation request has been formally submitted through EasyFlyNStay&apos;s official channels (online portal, email to support@easyflynstay.com, or customer support).</li>
          <li>The applicable fare rules of the booked ticket permit a refund (partial or full) for the cancellation in question.</li>
          <li>The airline or service provider has processed the cancellation on their end and confirmed the refundable amount to EasyFlyNStay.</li>
          <li>The refund request has been submitted within the applicable time window (for no-show and unutilized bookings, within 90 days from the date of travel).</li>
          <li>No fraud alert, chargeback dispute, or account suspension is associated with the booking in question.</li>
        </ol>
        <h3 className={h3}>6.2 Refund Processing Timelines</h3>
        <p className={p}>
          EasyFlyNStay will initiate the refund processing on its end within 72 hours of receiving the confirmed refund
          amount from the airline or service provider. The following timelines apply from the date of EasyFlyNStay&apos;s
          refund initiation:
        </p>
        <p className={`${p} font-semibold text-foreground`}>Domestic Flight Bookings:</p>
        <ul className={ul}>
          <li>Credit Card / Debit Card: Refund credited to the cardholder&apos;s account within 7 to 10 business days from EasyFlyNStay&apos;s initiation, subject to the card-issuing bank&apos;s processing cycle.</li>
          <li>Net Banking: Refund credited to the source bank account within 5 to 7 business days.</li>
          <li>UPI: Refund credited to the source UPI-linked account within 3 to 5 business days.</li>
          <li>Digital Wallets: Refund credited to the source wallet account within 3 to 5 business days.</li>
        </ul>
        <p className={`${p} font-semibold text-foreground`}>International Flight Bookings:</p>
        <ul className={ul}>
          <li>Credit Card / Debit Card: Refund credited within 14 to 21 business days, as international airline refund processing typically takes longer than domestic.</li>
          <li>Net Banking / UPI: Refund credited within 10 to 15 business days.</li>
          <li>For certain complex international itineraries or when multiple airlines are involved: Processing may take up to 30 to 45 business days, depending on the carrier&apos;s internal refund processing timelines.</li>
        </ul>
        <p className={`${p} font-semibold text-foreground`}>Airline-Cancelled Flights:</p>
        <p className={p}>
          Where the airline itself cancels a flight and authorizes a full refund: EasyFlyNStay will initiate the refund
          within 72 hours of receiving the airline&apos;s confirmation. Credit timelines follow the same
          payment-method-specific schedules listed above.
        </p>
        <p className={p}>
          EasyFlyNStay is not responsible for delays in the credit of refunds caused by airline processing backlogs,
          bank-side delays, payment gateway processing queues, or bank holidays. If a refund has not been received within
          the timelines stated above, users are requested to contact EasyFlyNStay at{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          with their booking reference, PNR number, and bank transaction details, and we will investigate and follow up
          with the relevant airline or payment gateway on a priority basis.
        </p>
        <h3 className={h3}>6.3 Mode of Refund</h3>
        <p className={p}>All refunds will be credited exclusively to the original payment method used at the time of booking, as follows:</p>
        <ul className={ul}>
          <li>Bookings paid via Credit Card: Refund credited to the same credit card.</li>
          <li>Bookings paid via Debit Card: Refund credited to the same debit card / linked bank account.</li>
          <li>Bookings paid via Net Banking: Refund credited to the source bank account.</li>
          <li>Bookings paid via UPI: Refund credited to the source UPI-linked bank account.</li>
          <li>Bookings paid via Digital Wallet: Refund credited to the source wallet account.</li>
          <li>Bookings paid using EasyFlyNStay Gift Cards: Refund credited back to the gift card value or as EasyFlyNStay travel credit, as applicable.</li>
        </ul>
        <p className={p}>
          In exceptional circumstances where the original payment method is no longer valid (e.g., expired card, closed
          bank account), EasyFlyNStay may request alternative bank account details from the user for manual NEFT/RTGS
          transfer of the refund amount. This process may require identity verification and may take additional time.
        </p>
        <h3 className={h3}>6.4 Calculation of Refund Amount</h3>
        <p className={p}>
          The net refund amount credited to the user is calculated as follows: Net Refund = Total Amount Paid − Airline
          Cancellation Penalty − Non-Refundable Taxes (if any) − EasyFlyNStay Service Fee / Convenience Fee − Payment
          Gateway Fee (if applicable)
        </p>
        <p className={p}>
          For promotional bookings where a coupon code, promotional discount, or cashback was applied at the time of
          booking, the discount or cashback amount may be deducted from the refund. The exact refundable amount will be
          clearly displayed on the cancellation confirmation screen prior to the user confirming the cancellation request.
          Users are strongly advised to review the net refund amount carefully before confirming.
        </p>
        <p className={p}>
          EasyFlyNStay&apos;s service fee / convenience fee is non-refundable in all cases. Even if the airline waives its
          cancellation charge in full (e.g., in case of airline-initiated cancellations), EasyFlyNStay&apos;s service fee
          will be retained, unless EasyFlyNStay decides to waive it at its sole discretion.
        </p>
        <h3 className={h3}>6.5 Refunds for Bookings Older than Six Months</h3>
        <p className={p}>
          For bookings that are more than six months old at the time the refund is processed, EasyFlyNStay reserves the
          right to credit the refund amount to the user&apos;s EasyFlyNStay Travel Wallet or as platform credit rather than
          to the original payment method. The Travel Wallet credit can be applied toward any future booking made through
          EasyFlyNStay and remains valid for 12 months from the date of credit. Users who wish to receive the refund to
          their original payment method may request a bank transfer of the wallet balance by contacting EasyFlyNStay
          customer support, subject to applicable processing procedures.
        </p>
      </section>

      <section>
        <h2 className={h2}>7. EasyFlyNStay Gift Card Policy</h2>
        <h3 className={h3}>7.1 Purchase and Nature of Gift Cards</h3>
        <p className={p}>
          EasyFlyNStay Gift Cards are prepaid travel credits that can be purchased through the Platform and redeemed
          toward eligible flight bookings and other travel services available on EasyFlyNStay. Gift cards are issued in
          fixed denominations as specified on the Platform at the time of purchase and are subject to the terms set out in
          this section.
        </p>
        <h3 className={h3}>7.2 Non-Refundability of Gift Cards</h3>
        <p className={p}>
          EasyFlyNStay Gift Cards are non-refundable and non-cancellable once purchased. This means that once a gift card
          purchase has been completed and payment has been processed, EasyFlyNStay will not refund, reverse, or otherwise
          reimburse the amount paid for the gift card under any circumstances, except where mandated by applicable
          consumer protection law. Users are advised to ensure the accuracy of all gift card purchase details before
          completing the transaction.
        </p>
        <h3 className={h3}>7.3 Redemption of Gift Cards</h3>
        <p className={p}>
          Gift cards may be redeemed toward eligible bookings on the Platform by entering the gift card code during the
          payment stage of the booking process. The following redemption conditions apply:
        </p>
        <ul className={ul}>
          <li>Gift cards can be used for full or partial payment toward an eligible booking. If the booking value exceeds the gift card balance, the remaining amount must be paid through another accepted payment method.</li>
          <li>Gift cards cannot be used to purchase other gift cards or to top up an EasyFlyNStay wallet balance.</li>
          <li>Multiple gift cards may be combined for a single booking, subject to platform limitations.</li>
          <li>Gift cards have no cash value and cannot be redeemed for cash, bank transfer, or any other form of monetary payment.</li>
        </ul>
        <h3 className={h3}>7.4 Validity and Expiry</h3>
        <p className={p}>
          Each gift card carries a specific validity period from the date of purchase, as clearly indicated on the gift
          card at the time of issuance. Gift cards that are not redeemed before their expiry date will automatically become
          void and cannot be revalidated, extended, or refunded. EasyFlyNStay may, at its sole discretion, offer a one-time
          validity extension for gift cards, subject to applicable processing fees and platform policies at the relevant
          time.
        </p>
        <h3 className={h3}>7.5 Cancellation of Bookings Made with Gift Cards</h3>
        <p className={p}>If a booking made using a gift card is subsequently cancelled:</p>
        <ul className={ul}>
          <li>The refundable portion of the booking (if any, as per fare rules) will be credited back to the gift card used for the booking, not to any other payment method.</li>
          <li>If the booking was partially paid with a gift card and partially with another payment method, the refund will be split proportionately — the gift card component returned to the gift card, and the other payment component returned to its original method.</li>
          <li>The gift card value restored upon cancellation will be subject to the same expiry terms as the original gift card.</li>
        </ul>
        <h3 className={h3}>7.6 Transferability</h3>
        <p className={p}>
          Gift cards issued by EasyFlyNStay may be transferred to another person unless the gift card was issued under a
          specific promotional campaign that restricts transferability. Promotional or complimentary gift cards issued as
          part of a marketing offer or compensation may be non-transferable and subject to additional restrictions
          communicated at the time of issuance.
        </p>
      </section>

      <section>
        <h2 className={h2}>8. Failed Transactions, Duplicate Payments, and Technical Errors</h2>
        <h3 className={h3}>8.1 Failed Booking Transactions</h3>
        <p className={p}>
          A failed booking transaction occurs when a payment is successfully debited from the user&apos;s payment
          instrument but a confirmed booking with a valid PNR is not generated due to a technical error, payment gateway
          timeout, airline seat inventory lapse, or communication failure between EasyFlyNStay&apos;s payment gateway and
          the airline&apos;s reservation system.
        </p>
        <p className={p}>In such cases, EasyFlyNStay will:</p>
        <ul className={ul}>
          <li>Automatically detect the failed booking through our payment reconciliation process, which runs continuously.</li>
          <li>Initiate a full refund of the debited amount to the original payment method within 5 to 10 business days of detecting the failed transaction.</li>
          <li>Send an email and SMS notification to the user&apos;s registered contact details confirming the refund initiation and the expected credit timeline.</li>
        </ul>
        <p className={p}>
          If you have made a payment and have not received a booking confirmation email within 30 minutes, please do NOT
          retry the transaction immediately. Instead, check your bank statement to confirm whether the payment was debited,
          and then contact EasyFlyNStay customer support at{" "}
          <a href="tel:+917090005700" className={link}>
            +91 70 9000 5700
          </a>{" "}
          or{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          with your transaction details for investigation. Retrying the transaction immediately risks creating a duplicate
          payment.
        </p>
        <h3 className={h3}>8.2 Duplicate Payments</h3>
        <p className={p}>If a duplicate payment is made (i.e., the same booking amount is charged more than once due to a technical glitch, multiple button clicks, or bank-side retry mechanisms), EasyFlyNStay will:</p>
        <ul className={ul}>
          <li>Identify the duplicate payment through its payment reconciliation process.</li>
          <li>Retain the payment corresponding to the confirmed booking and refund the duplicate payment in full to the original payment method.</li>
          <li>Process the duplicate payment refund within 5 to 7 business days of identification.</li>
        </ul>
        <p className={p}>
          Users who believe they have been charged more than once for the same booking should contact EasyFlyNStay
          immediately with their transaction reference numbers and bank debit details for priority investigation.
        </p>
        <h3 className={h3}>8.3 Price Discrepancy and Booking Cancellation by EasyFlyNStay</h3>
        <p className={p}>
          In rare instances where a booking is confirmed at an incorrect fare due to a technical error in the
          airline&apos;s pricing feed, the payment gateway, or EasyFlyNStay&apos;s booking system, EasyFlyNStay reserves
          the right to cancel the affected booking and issue a full refund of the amount paid to the original payment
          method. In such cases, the user will be notified immediately and given the option to rebook at the correct fare.
          EasyFlyNStay is not obligated to honor bookings confirmed at materially incorrect prices resulting from
          technical errors.
        </p>
      </section>

      <section>
        <h2 className={h2}>9. Chargeback Policy and Dispute Resolution</h2>
        <h3 className={h3}>9.1 What Is a Chargeback?</h3>
        <p className={p}>
          A chargeback is a process by which a cardholder disputes a transaction directly with their bank or card issuer,
          requesting the transaction to be reversed. While chargebacks exist as a consumer protection mechanism, the
          initiation of a chargeback against a legitimate EasyFlyNStay booking without prior contact with EasyFlyNStay
          customer support constitutes a breach of the terms of this Policy.
        </p>
        <h3 className={h3}>9.2 EasyFlyNStay&apos;s Approach to Chargebacks</h3>
        <p className={p}>
          EasyFlyNStay strongly encourages users to contact our customer support team at{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          or{" "}
          <a href="tel:+917090005700" className={link}>
            +91 70 9000 5700
          </a>{" "}
          before initiating a chargeback or payment dispute with their bank. The vast majority of genuine payment and
          refund concerns can be resolved quickly and satisfactorily through direct communication with our support team.
        </p>
        <p className={p}>
          If a user initiates a chargeback or dispute without prior contact with EasyFlyNStay, or initiates a chargeback
          in bad faith for a legitimate confirmed booking, EasyFlyNStay reserves the right to:
        </p>
        <ul className={ul}>
          <li>Suspend or permanently terminate the user&apos;s EasyFlyNStay account pending investigation of the dispute.</li>
          <li>Cancel any active or pending bookings associated with the account without refund.</li>
          <li>Deny access to future services through the Platform.</li>
          <li>Submit evidence to the bank or card network in defense of the transaction, which may include booking confirmation records, communication logs, and payment receipts.</li>
          <li>Pursue recovery of disputed funds through appropriate legal channels if the chargeback is found to be fraudulent or in bad faith.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay cooperates fully with all bank-initiated chargeback investigations and will provide all available
          documentation to support the resolution process.
        </p>
      </section>

      <section>
        <h2 className={h2}>10. Refunds and Cancellations Due to Force Majeure Events</h2>
        <p className={p}>
          Force Majeure Events are events or circumstances beyond the reasonable control of EasyFlyNStay or the airline that
          prevent or significantly impair the performance of the booked travel services. Force Majeure Events include but
          are not limited to:
        </p>
        <ul className={ul}>
          <li>Natural disasters such as earthquakes, floods, cyclones, tsunamis, volcanic eruptions, or other acts of God.</li>
          <li>Pandemics, epidemics, or public health emergencies declared by the World Health Organization (WHO), the Government of India, or any relevant national or state health authority.</li>
          <li>Wars, armed conflicts, civil unrest, terrorism, military operations, or government-imposed travel bans or restrictions.</li>
          <li>Government-imposed lockdowns, border closures, airspace restrictions, or suspension of airline operations by aviation regulators.</li>
          <li>Strikes or labor actions by airline staff, airport personnel, or air traffic control authorities.</li>
        </ul>
        <p className={p}>In the event of a Force Majeure Event that results in flight cancellations or travel restrictions:</p>
        <ul className={ul}>
          <li>Refund eligibility and quantum will be determined by the operating airline&apos;s Force Majeure or Irregular Operations (IROPS) policy.</li>
          <li>EasyFlyNStay will proactively communicate available options (rescheduling, credit shell, or refund) to affected users as information becomes available from the airline.</li>
          <li>EasyFlyNStay&apos;s service fee / convenience fee will not be refunded in Force Majeure situations unless EasyFlyNStay decides to waive it at its sole discretion.</li>
          <li>Where the airline issues a credit shell or future travel voucher in lieu of a cash refund, EasyFlyNStay will pass on the credit shell value to the affected user for use toward future bookings on the same airline, subject to the validity and conditions of the credit shell.</li>
        </ul>
        <p className={p}>
          EasyFlyNStay cannot guarantee cash refunds in Force Majeure situations where the airline or service provider has
          not authorized a cash refund. Users are advised to take out comprehensive travel insurance that covers Force
          Majeure cancellations and travel disruptions.
        </p>
      </section>

      <section>
        <h2 className={h2}>11. Fraudulent Bookings, Misuse, and Abuse of Refund Policy</h2>
        <p className={p}>
          EasyFlyNStay actively monitors all bookings and refund requests for signs of fraudulent activity, misuse of the
          Platform, or abuse of refund policies. EasyFlyNStay reserves the right to deny refunds and take appropriate
          legal action in any of the following circumstances:
        </p>
        <ul className={ul}>
          <li>Bookings made using stolen, cloned, or unauthorized credit or debit card details.</li>
          <li>Bookings made using false, fabricated, or misrepresented passenger identity documents.</li>
          <li>Multiple cancellations and rebookings that exhibit a pattern designed to exploit pricing differences, promotional offers, or fare discrepancies.</li>
          <li>Submission of fraudulent cancellation requests or forged airline cancellation confirmations.</li>
          <li>Abuse of the Zero Cancellation protection product — for example, booking and cancelling repeatedly to exploit the product beyond its intended single-use benefit.</li>
          <li>Providing false bank account details or payment information for the purpose of diverting refunds.</li>
        </ul>
        <p className={p}>In cases of suspected fraud or policy abuse, EasyFlyNStay will:</p>
        <ol className={ol}>
          <li>Immediately freeze the affected booking and user account pending investigation.</li>
          <li>Notify the user of the freeze and request documentary evidence or clarification within a specified timeframe.</li>
          <li>Report the suspected fraud to the relevant payment gateway, bank, law enforcement agency, or judicial authority as appropriate.</li>
          <li>Pursue recovery of any fraudulently obtained funds through civil or criminal legal proceedings under applicable Indian law.</li>
        </ol>
      </section>

      <section>
        <h2 className={h2}>12. Step-by-Step Guide: How to Request a Cancellation or Refund</h2>
        <p className={p}>
          To ensure that your cancellation and refund request is processed as efficiently and accurately as possible,
          please follow the steps outlined below:
        </p>
        <p className={`${p} font-semibold text-foreground`}>Step 1: Check Your Fare Rules</p>
        <p className={p}>
          Before initiating a cancellation, log in to your EasyFlyNStay account and navigate to &ldquo;My Bookings&rdquo;.
          Open your booking and review the Fare Rules section to understand whether your ticket is refundable, partially
          refundable, or non-refundable, and what cancellation charges apply.
        </p>
        <p className={`${p} font-semibold text-foreground`}>Step 2: Initiate the Cancellation Request</p>
        <p className={p}>Initiate your cancellation request through one of the official channels:</p>
        <ul className={ul}>
          <li>Online via the &ldquo;My Bookings&rdquo; section (recommended for fastest processing).</li>
          <li>Email to support@easyflynstay.com with full booking details.</li>
          <li>Phone / WhatsApp via +91 70 9000 5700 (24/7 concierge support).</li>
        </ul>
        <p className={`${p} font-semibold text-foreground`}>Step 3: Review the Refund Amount</p>
        <p className={p}>
          Before confirming the cancellation, carefully review the net refund amount displayed on the cancellation
          confirmation screen. This amount reflects the base refund after deduction of airline cancellation penalties,
          EasyFlyNStay&apos;s service fee, and any other applicable non-refundable charges.
        </p>
        <p className={`${p} font-semibold text-foreground`}>Step 4: Confirm the Cancellation</p>
        <p className={p}>
          If you are satisfied with the refund amount, confirm the cancellation. You will receive a cancellation
          confirmation email with the refund details and estimated credit timeline.
        </p>
        <p className={`${p} font-semibold text-foreground`}>Step 5: Track Your Refund</p>
        <p className={p}>
          You can track the status of your refund by logging in to your EasyFlyNStay account and checking the
          &ldquo;Refund Status&rdquo; in the &ldquo;My Bookings&rdquo; section. You may also contact our support team for
          refund status updates.
        </p>
        <p className={`${p} font-semibold text-foreground`}>Step 6: Contact Support for Delays</p>
        <p className={p}>
          If the refund has not been credited within the timelines stated in this Policy, contact EasyFlyNStay at{" "}
          <a href="mailto:support@easyflynstay.com" className={link}>
            support@easyflynstay.com
          </a>{" "}
          or{" "}
          <a href="tel:+917090005700" className={link}>
            +91 70 9000 5700
          </a>
          , providing your booking reference number and bank transaction details. We will investigate the delay and
          provide an update within 48 hours.
        </p>
        <p className={`${p} font-semibold text-foreground`}>What to Include in Your Cancellation / Refund Request:</p>
        <ul className={ul}>
          <li>Full name of the passenger(s) as per the booking.</li>
          <li>EasyFlyNStay Booking ID / PNR Number.</li>
          <li>Flight details (date, route, airline, flight number).</li>
          <li>Reason for cancellation (optional but helpful).</li>
          <li>Preferred refund method (if applicable).</li>
          <li>Any supporting documentation (e.g., airline cancellation confirmation, medical certificate in case of medical emergency cancellations).</li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>13. Updates and Modifications to This Policy</h2>
        <p className={p}>
          EasyFlyNStay reserves the right to update, revise, supplement, or replace any part of this Refund &amp;
          Cancellation Policy at any time and at its sole discretion, in response to changes in airline industry
          practices, applicable consumer protection laws, payment gateway policies, or business operational requirements.
          Any changes to this Policy will be effective immediately upon being published on the Platform at{" "}
          <Link href="/refund-cancellation" className={link}>
            www.easyflynstay.com/refund-cancellation
          </Link>
          . The &ldquo;Last Updated&rdquo; date at the top of this Policy will be revised to reflect the date of the most
          recent modification.
        </p>
        <p className={p}>
          Users are responsible for reviewing this Policy periodically to remain informed of any changes. Your continued
          use of the Platform and booking of services after any changes have been published constitutes your
          acknowledgment and acceptance of the updated Policy. EasyFlyNStay will make reasonable efforts to notify users of
          material changes to this Policy through email notifications, in-app notifications, or prominent notices on the
          Platform&apos;s homepage.
        </p>
      </section>

      <section>
        <h2 className={h2}>14. Contact Us for Cancellation and Refund Support</h2>
        <p className={p}>
          EasyFlyNStay is committed to providing transparent, responsive, and helpful support for all cancellation and
          refund-related matters. Our dedicated support team is available 24 hours a day, 7 days a week, 365 days a year
          to assist you. Please use the following contact details for all cancellation, amendment, and refund queries:
        </p>
        <div className="mt-4 border border-border bg-muted/30 px-5 py-4 text-[15px] leading-relaxed text-foreground/90">
          <p className="font-semibold text-foreground">EasyFlyNStay Customer Support &amp; Concierge Team</p>
          <ul className="mt-3 list-none space-y-2 pl-0">
            <li>
              Website:{" "}
              <a href="https://www.easyflynstay.com" className={link} target="_blank" rel="noopener noreferrer">
                www.easyflynstay.com
              </a>
            </li>
            <li>
              Cancellations &amp; Refunds Portal:{" "}
              <Link href="/track-booking" className={link}>
                www.easyflynstay.com/track-booking
              </Link>{" "}
              (via My Bookings)
            </li>
            <li>
              Email:{" "}
              <a href="mailto:support@easyflynstay.com" className={link}>
                support@easyflynstay.com
              </a>{" "}
              (Subject: &ldquo;Cancellation Request&rdquo; or &ldquo;Refund Query&rdquo;)
            </li>
            <li>
              Phone / WhatsApp:{" "}
              <a href="tel:+917090005700" className={link}>
                +91 70 9000 5700
              </a>{" "}
              (24/7 — Available round the clock, including weekends and public holidays)
            </li>
            <li>
              Address: Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka
              560066, India
            </li>
          </ul>
        </div>
        <p className={p}>
          Please include your Booking ID / PNR, full passenger name(s), and travel date in all communications to ensure the
          fastest possible resolution. EasyFlyNStay aims to acknowledge all cancellation and refund queries within 2 hours
          and to provide a resolution or status update within 24 to 48 hours of receipt.
        </p>
      </section>

      <footer className="mt-14 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>
          This Refund &amp; Cancellation Policy is subject to periodic review. Always refer to the latest version at{" "}
          <Link href="/refund-cancellation" className={link}>
            www.easyflynstay.com/refund-cancellation
          </Link>
        </p>
        <p className="mt-2">© 2026 EasyFlyNStay. All Rights Reserved. | Bengaluru, Karnataka, India</p>
      </footer>
    </article>
  );
}
