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
