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

export function openRazorpayCheckout({
  orderId,
  amountPaise,
  currency,
  userName,
  userEmail,
  onSuccess,
  onDismiss,
}: {
  orderId: string;
  amountPaise: number;
  currency: string;
  userName?: string;
  userEmail?: string;
  onSuccess: (response: RazorpayResponse) => void;
  onDismiss?: () => void;
}): void {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!keyId) {
    throw new Error("NEXT_PUBLIC_RAZORPAY_KEY_ID is not set");
  }

  const options: RazorpayOptions = {
    key: keyId,
    amount: amountPaise,
    currency,
    name: "Easyflynstay",
    description: "Gift Card Purchase",
    order_id: orderId,
    handler: onSuccess,
    prefill: {
      name: userName || "",
      email: userEmail || "",
    },
    theme: { color: "#C9A227" },
    modal: { ondismiss: onDismiss },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
