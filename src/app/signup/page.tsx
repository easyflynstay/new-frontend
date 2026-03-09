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

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, login, user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      await signUp({ firstName, lastName, email, password });
      await login({ email, password });
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex">
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&h=1000&fit=crop"
            alt="Travel adventure"
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
              <h2 className="font-heading text-3xl font-bold">Join Easyflynstay</h2>
              <p className="mt-3 text-white/80 max-w-sm">Create an account to unlock exclusive deals, manage bookings, and earn rewards on every trip.</p>
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
                <h1 className="font-heading text-2xl font-semibold text-foreground">Create account</h1>
                <p className="text-sm text-muted-foreground">Sign up to manage bookings, wallet, and more.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>First name</Label><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1" required /></div>
                    <div><Label>Last name</Label><Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1" required /></div>
                  </div>
                  <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" required /></div>
                  <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" required minLength={6} /></div>
                  <div className="text-xs text-muted-foreground">
                    By creating an account, you agree to our <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link> and <Link href="/terms" className="text-accent hover:underline">Privacy Policy</Link>.
                  </div>
                  <Button type="submit" variant="accent" className="w-full text-primary" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account? <Link href="/login" className="font-medium text-accent hover:underline">Sign in</Link>
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
