import api from "@/lib/api";

export interface ValidateCouponResponse {
  valid: boolean;
  message?: string;
  /** Coupon's configured percent off (e.g. 15 = 15%) */
  discount_percent?: number;
  discount_inr?: number;
  payable_inr?: number;
  code?: string;
}

export async function validateCoupon(code: string, orderAmountInr: number): Promise<ValidateCouponResponse> {
  const { data } = await api.post<ValidateCouponResponse>("/coupons/validate", {
    code,
    orderAmountInr,
  });
  return data;
}

export interface AdminGenerateCouponsResponse {
  codes: string[];
  count: number;
  discount_percent: number;
}

export async function adminGenerateCoupons(
  count: number,
  discountPercent: number
): Promise<AdminGenerateCouponsResponse> {
  const { data } = await api.post<AdminGenerateCouponsResponse>(
    "/coupons/admin/generate",
    { count, discountPercent },
    { withCredentials: true }
  );
  return data;
}
