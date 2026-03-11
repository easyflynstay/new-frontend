import api from "@/lib/api";

export interface WalletTransaction {
  id: number;
  customer_id: string;
  type: string;
  amount: number;
  description: string | null;
  reference_type: string | null;
  reference_id: string | null;
  created_at: string;
}

export interface WalletResponse {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
}

export interface WalletAddOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
}

export async function getWallet(): Promise<WalletResponse> {
  const { data } = await api.get<WalletResponse>("/wallet");
  return data;
}

export async function createWalletAddOrder(amount: number): Promise<WalletAddOrderResponse> {
  const { data } = await api.post<WalletAddOrderResponse>("/wallet/add-order", { amount });
  return data;
}

export async function verifyWalletPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<{ balance: number; currency: string; message: string }> {
  const { data } = await api.post("/wallet/verify", payload);
  return data;
}
