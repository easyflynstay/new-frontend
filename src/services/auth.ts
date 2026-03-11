import api from "@/lib/api";

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  customer_id: string;
  email: string;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
  has_payment_pin?: boolean;
}

export interface UserProfile {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  has_payment_pin?: boolean;
}

export async function setPaymentPin(pin: string): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>("/auth/pin/set", { pin });
  return data;
}

export async function verifyPaymentPin(pin: string): Promise<{ valid: boolean }> {
  const { data } = await api.post<{ valid: boolean }>("/auth/pin/verify", { pin });
  return data;
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
  const { data } = await api.post<SignUpResponse>("/auth/signup", payload);
  return data;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function getMe(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>("/auth/me");
  return data;
}
