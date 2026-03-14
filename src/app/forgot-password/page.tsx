"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
              <h2 className="font-heading text-3xl font-bold">Reset your password</h2>
              <p className="mt-3 text-white/80 max-w-sm">Enter your email and we&apos;ll send you a link to set a new password.</p>
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
                <h1 className="font-heading text-2xl font-semibold text-foreground">Forgot password</h1>
                <p className="text-sm text-muted-foreground">Enter the email linked to your account.</p>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm">
                      If an account exists for this email, we&apos;ve sent a link to reset your password. Check your inbox and spam folder.
                    </div>
                    <Link href="/login">
                      <Button variant="accent" className="w-full text-primary">Back to Sign in</Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                        {error}
                      </div>
                    )}
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1"
                        required
                      />
                    </div>
                    <Button type="submit" variant="accent" className="w-full text-primary" disabled={loading}>
                      {loading ? "Sending…" : "Send reset link"}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      <Link href="/login" className="font-medium text-accent hover:underline">Back to Sign in</Link>
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
