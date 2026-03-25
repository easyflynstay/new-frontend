import api from "@/lib/api";

export type CouponDiscountType = "percent" | "inr";

export interface ValidateCouponResponse {
  valid: boolean;
  message?: string;
  discount_type?: CouponDiscountType;
  discount_percent?: number;
  /** Face value in INR for fixed-amount coupons */
  discount_amount_inr?: number;
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
  discount_type: CouponDiscountType;
  discount_percent?: number;
  discount_amount_inr?: number;
}

export type AdminGenerateCouponsPayload =
  | { count: number; discountType: "percent"; discountPercent: number }
  | { count: number; discountType: "inr"; discountAmountInr: number };

export async function adminGenerateCoupons(
  payload: AdminGenerateCouponsPayload
): Promise<AdminGenerateCouponsResponse> {
  const { data } = await api.post<AdminGenerateCouponsResponse>(
    "/coupons/admin/generate",
    payload,
    { withCredentials: true }
  );
  return data;
}
