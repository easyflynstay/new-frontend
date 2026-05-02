"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { PasswordFieldWithStrength } from "@/components/auth/PasswordFieldWithStrength";
import { resetPassword } from "@/services/auth";
import { isPasswordStrong } from "@/lib/password-policy";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const token = searchParams.get("token") ?? "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid or missing reset link. Request a new one from the forgot password page.");
  }, [token]);

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!isPasswordStrong(newPassword)) {
      setError("Your password must satisfy every requirement shown under the new password field.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, newPassword, confirmPassword);
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || "Failed to reset password. The link may have expired.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm">
          Your password has been reset. You can now sign in with your new password.
        </div>
        <Link href="/login">
          <Button variant="accent" className="w-full text-primary">Sign in</Button>
        </Link>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          Invalid or missing reset link. Request a new one from the forgot password page.
        </div>
        <Link href="/forgot-password">
          <Button variant="accent" className="w-full text-primary">Forgot password</Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}
      <div>
        <PasswordFieldWithStrength
          id="new-password"
          label="New password"
          value={newPassword}
          onChange={setNewPassword}
          autoComplete="new-password"
          showStrengthHints
        />
      </div>
      <div>
        <PasswordFieldWithStrength
          id="confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          showStrengthHints={false}
        />
      </div>
      <Button
        type="submit"
        variant="accent"
        className="w-full text-primary"
        disabled={loading || !isPasswordStrong(newPassword) || newPassword !== confirmPassword}
      >
        {loading ? "Resetting…" : "Reset password"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-accent hover:underline">Back to Sign in</Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex">
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src="https://images.unsplash.com/photo-1540339832862-474599807836?w=800&h=1000&fit=crop"
            alt="Travel"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center bg-accent">
                  <span className="font-heading text-3xl font-bold text-primary">E</span>
                </div>
              </div>
              <h2 className="font-heading text-3xl font-bold">Set new password</h2>
              <p className="mt-3 text-white/80 max-w-sm">Use the link from your email to reset your password.</p>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="border-2 overflow-hidden">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4 lg:hidden">
                  <div className="flex h-12 w-12 items-center justify-center bg-primary">
                    <span className="font-heading text-xl font-bold text-accent">E</span>
                  </div>
                </div>
                <h1 className="font-heading text-2xl font-semibold text-foreground">Reset password</h1>
                <p className="text-sm text-muted-foreground">Enter your new password below.</p>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
                  <ResetPasswordForm />
                </Suspense>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
