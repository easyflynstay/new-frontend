import api from "@/lib/api";

export interface PassengerDetail {
  firstName: string;
  lastName: string;
  dob: string; // YYYY-MM-DD
  gender: string;
}

/** Matches API FlightSegmentResponse / search card segments (connecting flights). */
export interface FlightSegmentSnapshot {
  carrierCode: string;
  carrierName: string;
  flightNumber: string;
  aircraft: string;
  departureAirport: string;
  departureTime: string;
  departureTerminal: string;
  arrivalAirport: string;
  arrivalTime: string;
  arrivalTerminal: string;
  duration: string;
  stops: number;
  layoverAfter?: string;
}

export interface CreateBookingPayload {
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  tripType: "one-way" | "round";
  checkIn: string;
  checkOut: string;
  class: string;
  travelers: string;
  /** When travelers > 1: first/last name, DOB, gender for each passenger */
  passengerDetails?: PassengerDetail[];
  giftcardCode?: string;
  giftcardAmountUsed?: number;
  giftcards?: { giftcardCode: string; amountUsed: number }[];
  /** Set when user is logged in so the booking appears in My Bookings */
  customerId?: string;
  /** Required when paying with gift card: 6-digit payment PIN */
  paymentPin?: string;
  /** Single-use coupon */
  couponCode?: string;
  /** Fare in INR after volume-tier discount; must match server tier math when couponCode is set */
  orderAmountInr?: number;
  /** Fare subtotal before volume-tier discount (required by API; matches checkout fare total). */
  grossFareInr: number;
  /** Optional snapshot from flight results (camelCase matches API). */
  airlineName?: string;
  flightNumber?: string;
  departureTime?: string;
  arrivalTime?: string;
  stops?: number;
  layoverTime?: string;
  /** Wall-clock total journey (e.g. "8h 45m"); from search card. */
  journeyDuration?: string;
  /** Per-leg details when itinerary has stops / connections. */
  flightSegments?: FlightSegmentSnapshot[];
}

export interface BookingResponse {
  booking_id: string;
  customer_id?: string;
  message: string;
  tracking_link?: string;
  email_sent?: boolean;
  /** Same object the server POSTs to BOOKING_WEBHOOK_URL (if configured). */
  webhook_payload?: Record<string, unknown>;
}

export interface BookingOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
}

export interface TrackBookingResponse {
  booking_id: string;
  customer_id: string | null;
  name: string;
  email: string;
  phone: string;
  from_place: string;
  to_place: string;
  trip_type: string;
  check_in: string;
  check_out: string;
  class_type: string;
  travelers: string;
  created_at: string;
  pnr?: string | null;
  ticket_path?: string | null;
}

export interface MyBookingItem {
  booking_id: string;
  customer_id: string | null;
  name: string;
  email: string;
  phone: string;
  from_place: string;
  to_place: string;
  trip_type: string;
  check_in: string;
  check_out: string;
  class_type: string;
  travelers: string;
  created_at: string;
  status: "confirmed" | "completed";
  pnr?: string | null;
  ticket_path?: string | null;
}

export interface MyBookingsResponse {
  bookings: MyBookingItem[];
}

export async function createBookingOrder(amount: number): Promise<BookingOrderResponse> {
  const { data } = await api.post<BookingOrderResponse>("/booking/order", { amount });
  return data;
}

export async function createBooking(payload: CreateBookingPayload): Promise<BookingResponse> {
  const { data } = await api.post<BookingResponse>("/booking", payload);
  return data;
}

export async function trackBooking(
  bookingId: string,
  email?: string
): Promise<TrackBookingResponse> {
  const params = new URLSearchParams({ booking_id: bookingId });
  if (email) params.set("email", email);
  const { data } = await api.get<TrackBookingResponse>("/booking/track", { params });
  return data;
}

export async function getMyBookings(): Promise<MyBookingItem[]> {
  const { data } = await api.get<MyBookingsResponse>("/booking/my");
  return data.bookings;
}

/** Admin: update PNR for a booking. Requires admin sign-in (session cookie). */
export async function adminUpdatePnr(
  bookingId: string,
  pnr: string
): Promise<{ ok: boolean; booking_id: string; pnr: string | null }> {
  const { data } = await api.patch<{ ok: boolean; booking_id: string; pnr: string | null }>(
    `/booking/${encodeURIComponent(bookingId)}/pnr`,
    { pnr: pnr.trim() },
    { withCredentials: true }
  );
  return data;
}

/** Admin: attach ticket file (PDF/image) to a booking. User can download from track-booking page. Requires admin sign-in. */
export async function adminUploadTicket(
  bookingId: string,
  file: File
): Promise<{ ok: boolean; booking_id: string; ticket_attached: boolean }> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post<{ ok: boolean; booking_id: string; ticket_attached: boolean }>(
    `/booking/${encodeURIComponent(bookingId)}/ticket`,
    form,
    { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
  );
  return data;
}

/** Admin: re-send booking confirmation email with tracking link. Requires admin sign-in. */
export async function adminSendTrackingEmail(
  bookingId: string
): Promise<{ ok: boolean; booking_id: string; email: string }> {
  const { data } = await api.post<{ ok: boolean; booking_id: string; email: string }>(
    `/booking/${encodeURIComponent(bookingId)}/notify`,
    {},
    { withCredentials: true }
  );
  return data;
}

/** URL to download the attached ticket. Uses full API URL when set so the request hits the backend that has the file. */
export function getTicketDownloadUrl(bookingId: string, email?: string): string {
  const params = email ? `?email=${encodeURIComponent(email)}` : "";
  const pathAndQuery = `/api/booking/${encodeURIComponent(bookingId)}/ticket${params}`;
  const base = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") : "";
  if (base) return `${base}${pathAndQuery}`;
  return pathAndQuery;
}

export async function submitQuoteScreenshot(form: FormData): Promise<{ ok: boolean; reference: string; message?: string }> {
  const { data } = await api.post<{ ok: boolean; reference: string; message?: string }>(
    "/booking/quote-screenshot",
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

