import api from "@/lib/api";

export interface GiftCard {
  giftcard_id: string;
  code: string;
  customer_id: string;
  initial_amount: number;
  balance: number;
  expiry_date: string;
  status: string;
  created_at: string;
}

export interface GiftCardBuyResponse {
  order_id: string;
  amount: number;
  currency: string;
  message: string;
}

export interface TransferPayload {
  giftcard_code: string;
  recipient_email: string;
  payment_pin: string;
}

export interface RenewPayload {
  giftcard_code: string;
}

export async function getMyGiftCards(): Promise<GiftCard[]> {
  const { data } = await api.get<{ giftcards: GiftCard[] }>("/giftcards/my");
  return data.giftcards;
}

export async function buyGiftCard(amount: number): Promise<GiftCardBuyResponse> {
  const { data } = await api.post<GiftCardBuyResponse>("/giftcards/buy", { amount });
  return data;
}

export async function verifyGiftCardPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) {
  const { data } = await api.post("/giftcards/verify-payment", payload);
  return data;
}

export async function transferGiftCard(payload: TransferPayload) {
  const { data } = await api.post("/giftcards/transfer", payload);
  return data;
}

export async function renewGiftCard(payload: RenewPayload) {
  const { data } = await api.post("/giftcards/renew", payload);
  return data;
}
