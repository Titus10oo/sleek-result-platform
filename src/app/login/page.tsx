"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const tenantSlug = formData.get("tenantSlug");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password, tenantSlug }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Redirect based on role
      const roleDashboards: Record<string, string> = {
        SUPER_ADMIN: "/dashboard/admin",
        ADMIN: "/dashboard/admin",
        ACCOUNTANT: "/dashboard/bursar",
        TEACHER: "/dashboard/teacher",
        STUDENT: "/dashboard/student",
        PARENT: "/dashboard/parent",
      };

      router.push(roleDashboards[data.user.role] || "/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold">EduPortal ERP</span>
          </Link>
          <h2 className="text-2xl font-semibold tracking-tight">Login to your portal</h2>
          <p className="text-sm text-slate-500">Enter your credentials and school identifier</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="tenantSlug">
              School Identifier (Slug)
            </label>
            <input
              id="tenantSlug"
              name="tenantSlug"
              placeholder="e.g. demo"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@school.com"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="text-sm font-medium text-red-600">{error}</div>}

          <button
            type="submit"
            className={cn(
              "inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          <p>
            Not your school?{" "}
            <Link href="/" className="font-medium text-blue-600 hover:underline">
              Back to landing
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
