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
      <main className="flex-1 flex">
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src="https://images.unsplash.com/photo-1540339832862-474599807836?w=800&h=1000&fit=crop"
            alt="First class cabin"
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
              <h2 className="font-heading text-3xl font-bold">Welcome Back</h2>
              <p className="mt-3 text-white/80 max-w-sm">Sign in to access your bookings, wallet, and exclusive travel deals with Easyflynstay.</p>
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
                <h1 className="font-heading text-2xl font-semibold text-foreground">Sign in</h1>
                <p className="text-sm text-muted-foreground">Enter your credentials to access your account.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" required />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 border-border" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <a href="#" className="text-accent hover:underline">Forgot password?</a>
                  </div>
                  <Button type="submit" variant="accent" className="w-full text-primary" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account? <Link href="/signup" className="font-medium text-accent hover:underline">Sign up</Link>
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
