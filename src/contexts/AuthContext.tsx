"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  login as loginApi,
  signUp as signUpApi,
  getMe,
  type LoginPayload,
  type SignUpPayload,
  type UserProfile,
} from "@/services/auth";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (payload: LoginPayload) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  });

  const hydrateUser = useCallback(async () => {
    const storedToken = localStorage.getItem("access_token");
    if (!storedToken) {
      setState({ user: null, token: null, loading: false });
      return;
    }
    try {
      const profile = await getMe();
      setState({ user: profile, token: storedToken, loading: false });
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setState({ user: null, token: null, loading: false });
    }
  }, []);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  const login = useCallback(async (payload: LoginPayload) => {
    const res = await loginApi(payload);
    localStorage.setItem("access_token", res.access_token);
    const profile: UserProfile = {
      customer_id: res.customer_id,
      email: res.email,
      first_name: res.first_name,
      last_name: res.last_name,
      phone: res.phone ?? "",
      created_at: "",
      has_payment_pin: res.has_payment_pin ?? false,
    };
    localStorage.setItem("user", JSON.stringify(profile));
    setState({ user: profile, token: res.access_token, loading: false });
  }, []);

  const signUp = useCallback(async (payload: SignUpPayload) => {
    const res = await signUpApi(payload);
    localStorage.setItem("access_token", res.access_token);
    const profile: UserProfile = {
      customer_id: res.customer_id,
      email: res.email,
      first_name: res.first_name,
      last_name: res.last_name,
      phone: res.phone ?? "",
      created_at: "",
      has_payment_pin: res.has_payment_pin ?? false,
    };
    localStorage.setItem("user", JSON.stringify(profile));
    setState({ user: profile, token: res.access_token, loading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setState({ user: null, token: null, loading: false });
  }, []);

  const refreshUser = useCallback(async () => {
    await hydrateUser();
  }, [hydrateUser]);

  return (
    <AuthContext.Provider value={{ ...state, login, signUp, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
