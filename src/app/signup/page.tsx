"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { AuthMarketingPanel } from "@/components/auth/AuthMarketingPanel";
import { AuthBrandLogo } from "@/components/auth/AuthBrandLogo";
import {
  authCardClassName,
  authFormColumnClassName,
  authInputClassName,
  authLabelClassName,
  authMainClassName,
  authPrimaryButtonClassName,
  authErrorAlertClassName,
} from "@/lib/auth-page-ui";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setError("Enter a valid phone number (10–15 digits).");
      return;
    }
    setLoading(true);
    try {
      await signUp({ firstName, lastName, email, phone: phone.trim(), password });
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || "Sign up failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={authMainClassName}>
        <AuthMarketingPanel
          imageSrc="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&h=1000&fit=crop"
          imageAlt="Travel adventure"
          title="Join EASYFLYNSTAY"
          description="Unlock exclusive fares, manage every booking, and earn more on every trip."
        />

        <div className={authFormColumnClassName}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            <Card className={authCardClassName}>
              <CardHeader className="space-y-1 pb-2 text-center">
                <div className="mb-5 flex justify-center lg:hidden">
                  <AuthBrandLogo variant="compact" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">New member</p>
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-primary">Create account</h1>
                <p className="text-sm text-muted-foreground">A few details to get you started.</p>
              </CardHeader>
              <CardContent className="pb-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div role="alert" className={authErrorAlertClassName}>
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="signup-first" className={authLabelClassName}>
                        First name
                      </Label>
                      <Input
                        id="signup-first"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={authInputClassName}
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="signup-last" className={authLabelClassName}>
                        Last name
                      </Label>
                      <Input
                        id="signup-last"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={authInputClassName}
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="signup-email" className={authLabelClassName}>
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={authInputClassName}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="signup-phone" className={authLabelClassName}>
                      Phone
                    </Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={authInputClassName}
                      autoComplete="tel"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="signup-password" className={authLabelClassName}>
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={authInputClassName}
                      autoComplete="new-password"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="font-medium text-accent hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-medium text-accent hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <Button type="submit" variant="accent" className={authPrimaryButtonClassName} disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                  </Button>
                  <p className="border-t border-border/80 pt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-accent hover:underline">
                      Sign in
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
