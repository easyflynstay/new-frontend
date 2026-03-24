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
import { forgotPassword } from "@/services/auth";
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
  authSuccessAlertClassName,
} from "@/lib/auth-page-ui";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || "Something went wrong. Please try again.";
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
          imageSrc="https://images.unsplash.com/photo-1540339832862-474599807836?w=800&h=1000&fit=crop"
          imageAlt="Premium travel"
          title="Reset your password"
          description="We’ll email you a secure link to choose a new password."
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
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">Security</p>
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-primary">Forgot password</h1>
                <p className="text-sm text-muted-foreground">Use the email on your account.</p>
              </CardHeader>
              <CardContent className="pb-8">
                {sent ? (
                  <div className="space-y-5">
                    <div role="status" className={authSuccessAlertClassName}>
                      If an account exists for this email, we&apos;ve sent a link to reset your password. Check your
                      inbox and spam folder.
                    </div>
                    <Link href="/login" className="block">
                      <Button variant="accent" className={authPrimaryButtonClassName}>
                        Back to sign in
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div role="alert" className={authErrorAlertClassName}>
                        {error}
                      </div>
                    )}
                    <div className="space-y-1">
                      <Label htmlFor="forgot-email" className={authLabelClassName}>
                        Email
                      </Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={authInputClassName}
                        autoComplete="email"
                        required
                      />
                    </div>
                    <Button type="submit" variant="accent" className={authPrimaryButtonClassName} disabled={loading}>
                      {loading ? "Sending…" : "Send reset link"}
                    </Button>
                    <p className="border-t border-border/80 pt-6 text-center text-sm text-muted-foreground">
                      <Link href="/login" className="font-semibold text-accent hover:underline">
                        Back to sign in
                      </Link>
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
