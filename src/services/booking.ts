import api from "@/lib/api";

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
  giftcardCode?: string;
  giftcardAmountUsed?: number;
  /** Set when user is logged in so the booking appears in My Bookings */
  customerId?: string;
  /** Required when paying with gift card: 6-digit payment PIN */
  paymentPin?: string;
}

export interface BookingResponse {
  booking_id: string;
  customer_id?: string;
  message: string;
  tracking_link?: string;
  email_sent?: boolean;
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

/** URL to download the attached ticket. Uses full API URL when set so the request hits the backend that has the file. */
export function getTicketDownloadUrl(bookingId: string, email?: string): string {
  const params = email ? `?email=${encodeURIComponent(email)}` : "";
  const pathAndQuery = `/api/booking/${encodeURIComponent(bookingId)}/ticket${params}`;
  const base = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") : "";
  if (base) return `${base}${pathAndQuery}`;
  return pathAndQuery;
}
