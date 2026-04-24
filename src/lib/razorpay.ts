declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: () => void) => void;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

let scriptLoaded = false;
let scriptLoading: Promise<void> | null = null;

export function loadRazorpayScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });

  return scriptLoading;
}

/**
 * Opens Razorpay Checkout (same SDK for Test and Live — use test key in Test Mode, live key in Live Mode).
 * Frontend NEXT_PUBLIC_RAZORPAY_KEY_ID must match the key used by the backend to create the order.
 */
export function openRazorpayCheckout({
  orderId,
  amountPaise,
  currency,
  userName,
  userEmail,
  userContact,
  onSuccess,
  onDismiss,
  onError,
}: {
  orderId: string;
  amountPaise: number;
  currency: string;
  userName?: string;
  userEmail?: string;
  userContact?: string;
  onSuccess: (response: RazorpayResponse) => void;
  onDismiss?: () => void;
  onError?: (err: Error) => void;
}): void {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!keyId || keyId.trim() === "") {
    const err = new Error("Payment is not configured. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID (use the same Key ID as your backend).");
    onError?.(err);
    throw err;
  }

  if (typeof window === "undefined" || !window.Razorpay) {
    const err = new Error("Razorpay checkout script did not load. Check your connection or try again.");
    onError?.(err);
    throw err;
  }

  const options: RazorpayOptions = {
    key: keyId,
    amount: Math.round(Number(amountPaise)),
    currency,
    name: "Easyflynstay",
    description: "EasyFlyNStay Gift Card",
    order_id: String(orderId),
    handler: onSuccess,
    prefill: {
      name: userName || "",
      email: userEmail || "",
      contact: userContact || "",
    },
    theme: { color: "#C9A227" },
    modal: { ondismiss: onDismiss },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    const e = err instanceof Error ? err : new Error(String(err));
    onError?.(e);
    throw e;
  }
}
