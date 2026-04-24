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
  const { data } = await api.get<{ giftcards?: GiftCard[] }>("/giftcards/my");
  return Array.isArray(data?.giftcards) ? data.giftcards : [];
}

export type GiftCardEliteShipping = {
  apartment: string;
  street: string;
  city: string;
  district: string;
  pincode: string;
};

export async function buyGiftCard(
  faceValue: number,
  shipping?: GiftCardEliteShipping
): Promise<GiftCardBuyResponse> {
  const { data } = await api.post<GiftCardBuyResponse>("/giftcards/buy", {
    face_value: faceValue,
    ...(shipping ? { shipping } : {}),
  });
  return data;
}

export type GiftCardVerifyResult = {
  message: string;
  giftcard_id: string;
  code: string;
  balance: string;
  expiry_date: string;
};

export async function verifyGiftCardPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  face_value: number;
  shipping?: GiftCardEliteShipping;
}): Promise<GiftCardVerifyResult> {
  const { data } = await api.post<GiftCardVerifyResult>("/giftcards/verify-payment", payload);
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
