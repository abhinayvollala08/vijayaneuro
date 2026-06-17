"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Brain, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { NeuralBackground } from "@/components/shared/NeuralBackground";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMsg("Invalid email or password. Please try again.");
        toast.error("Sign-in failed.");
        setLoading(false);
        return;
      }

      toast.success("Signed in successfully!");

      // Retrieve current session to get the user's role and redirect accordingly
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role) {
        const role = session.user.role;
        
        // If there was a specific redirect callbackUrl, prioritize it
        if (callbackUrl && !callbackUrl.includes("/login")) {
          window.location.href = callbackUrl;
          return;
        }

        // Otherwise redirect based on role
        if (role === "ADMIN") {
          window.location.href = "/admin/dashboard";
        } else if (role === "DOCTOR") {
          window.location.href = "/doctor/dashboard";
        } else if (role === "EDITOR") {
          window.location.href = "/editor/dashboard";
        } else {
          window.location.href = "/patient/dashboard";
        }
      } else {
        window.location.href = "/patient/dashboard";
      }
    } catch (err: any) {
      console.error("Login error:", err);
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
            Healthcare Portal Access
          </h2>
        </div>

        {/* Login Card */}
        <Card className="p-8 border-white/10 bg-white/95 shadow-glass">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="flex gap-2 p-3.5 bg-red-50 text-red-700 text-xs font-sans rounded-xl border border-red-200/50">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-navy-700 font-sans">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-brand-orange hover:underline font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <Button type="submit" disabled={loading} className="w-full justify-center mt-2" size="lg">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Register link */}
          <div className="border-t border-navy-50 pt-6 mt-6 text-center text-xs font-sans text-text-muted">
            New patient?{" "}
            <Link href="/register" className="text-brand-orange font-bold hover:underline">
              Create a Patient Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <div className="w-8 h-8 border-3 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin" />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
