"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrlRaw = searchParams.get("callbackUrl") ?? "/dashboard";
  const callbackUrl = callbackUrlRaw.startsWith("/")
    ? callbackUrlRaw
    : "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(
          "প্রবেশ ব্যর্থ। ডাটাবেসের ব্যবহারকারী ইমেইল ও পাসওয়ার্ড পরীক্ষা করুন।"
        );
        setLoading(false);
        return;
      }

      if (result?.ok) {
        router.replace(callbackUrl);
        router.refresh();
        return;
      }

      if (result?.url) {
        window.location.href = result.url;
        return;
      }

      router.replace(callbackUrl);
      router.refresh();
    } catch {
      setError("একটি ত্রুটি হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen erp-bg px-4 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-md flex-col gap-8">
        <div className="text-center">
          <Link
            href="/"
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/50 px-4 py-1.5 text-sm text-[var(--muted-foreground)] backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            নূর ফ্যাব্রিক্স ERP
          </Link>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="text-gradient-gold">নিরাপদ প্রবেশ</span>
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
            ভূমিকা ডাটাবেস থেকে নির্ধারিত — JWT সেশন ও প্রক্সি সুরক্ষা।
          </p>
        </div>

        <Card className="glass-card border-[var(--border)] shadow-2xl">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-xl">লগইন</CardTitle>
            <CardDescription>
              আপনার প্রদত্ত ইমেইল ও পাসওয়ার্ড দিন (সিড করা ডেমো অ্যাকাউন্ট)।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">ইমেইল</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="superadmin@nurfabrics.bd"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="password">পাসওয়ার্ড</Label>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    <Lock className="inline h-3 w-3" /> ডেমো: Demo@2026
                  </span>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              {error ? (
                <p
                  className="rounded-lg border border-[var(--destructive)]/40 bg-[var(--destructive)]/10 px-3 py-2 text-sm text-[var(--destructive-foreground)]"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "যাচাই হচ্ছে…" : "প্রবেশ করুন"}
              </Button>
            </form>

            <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--muted)]/20 p-4 text-xs leading-relaxed text-[var(--muted-foreground)]">
              <p className="font-medium text-[var(--foreground)]">ডেমো অ্যাকাউন্ট</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>সুপার অ্যাডমিন — superadmin@nurfabrics.bd</li>
                <li>ম্যানেজার — manager@nurfabrics.bd</li>
                <li>সেলস — sales1@nurfabrics.bd / sales2@nurfabrics.bd</li>
                <li>উৎপাদন — production1@nurfabrics.bd · production2@nurfabrics.bd</li>
              </ul>
              <p className="mt-2">পাসওয়ার্ড সবার জন্য একই: <strong>Demo@2026</strong></p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[var(--muted-foreground)]">
          সাহায্য — অপারেশন্স টিম · production@nurfabrics.bd
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center erp-bg text-sm text-[var(--muted-foreground)]">
          লোড হচ্ছে…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
