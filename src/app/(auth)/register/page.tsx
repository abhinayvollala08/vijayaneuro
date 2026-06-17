"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, User, Mail, Lock, Phone, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { NeuralBackground } from "@/components/shared/NeuralBackground";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Registration failed. Please try again.");
        toast.error(data.error || "Registration failed.");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      setRegistered(true);
      setLoading(false);
    } catch (err: any) {
      console.error("Registration error:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 justify-center mb-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-brand-orange animate-pulse" />
            </div>
            <div className="text-left">
              <span className="font-display font-bold text-xl text-white block leading-none">
                Vijaya Neuro
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-brand-orange font-bold">
                Hospital
              </span>
            </div>
          </Link>
          <h2 className="font-display font-semibold text-lg text-white/80">
            Create Patient Account
          </h2>
        </div>

        {/* Register Card */}
        <Card className="p-8 border-white/10 bg-white/95 shadow-glass">
          {registered ? (
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-display font-bold text-navy-700 text-2xl mb-2">
                Account Created!
              </h3>
              <p className="text-text-muted font-sans text-sm max-w-xs mb-8">
                Your patient registration is complete. You can now log in to access your portal.
              </p>
              <Link href="/login" className="w-full">
                <Button className="w-full justify-center" size="lg">
                  Go to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="flex gap-2 p-3.5 bg-red-50 text-red-700 text-xs font-sans rounded-xl border border-red-200/50 animate-fade-in">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <Input
                label="Full Name *"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email Address *"
                type="email"
                placeholder="patient@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Mobile Number (Optional)"
                placeholder="e.g. +91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">
                  Password * (Min 6 characters)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="flex h-11 w-full rounded-xl border border-border bg-white pl-4 pr-10 py-2 text-sm font-sans text-text-body placeholder:text-text-subtle transition-all focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text-muted transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full justify-center mt-4" size="lg">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          )}

          {/* Login link */}
          {!registered && (
            <div className="border-t border-navy-50 pt-6 mt-6 text-center text-xs font-sans text-text-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-orange font-bold hover:underline">
                Sign In
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
