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

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
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
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={authMainClassName}>
        <AuthMarketingPanel
          imageSrc="https://images.unsplash.com/photo-1540339832862-474599807836?w=800&h=1000&fit=crop"
          imageAlt="First class cabin"
          title="Welcome back"
          description="Sign in for your bookings, wallet, and member-only fares."
          priority
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
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">Account</p>
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-primary">Sign in</h1>
                <p className="text-sm text-muted-foreground">Enter your credentials to continue.</p>
              </CardHeader>
              <CardContent className="pb-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div role="alert" className={authErrorAlertClassName}>
                      {error}
                    </div>
                  )}
                  <div className="space-y-1">
                    <Label htmlFor="email" className={authLabelClassName}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={authInputClassName}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className={authLabelClassName}>
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={authInputClassName}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        className="h-4 w-4 shrink-0 rounded-none border-primary/30 text-accent accent-accent focus:ring-2 focus:ring-accent/30 focus:ring-offset-0"
                      />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="shrink-0 font-medium text-accent hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" variant="accent" className={authPrimaryButtonClassName} disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                  <p className="border-t border-border/80 pt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-semibold text-accent hover:underline">
                      Sign up
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
