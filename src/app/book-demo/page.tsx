"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

export default function BookDemoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for trial onboarding
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Request Received!</h2>
          <p className="text-slate-500">
            We've created a trial tenant for your school. Check your email for login credentials and the setup guide.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold">EduPortal ERP</span>
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Book a Demo</h1>
          <p className="mt-4 text-lg text-slate-500">Experience the future of school management. Get a 14-day free trial for your institution.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label className="block text-sm font-medium text-slate-700">School Name</label>
                <input required type="text" className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Estimated Students</label>
                <select className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>0 - 200</option>
                  <option>201 - 500</option>
                  <option>501 - 1000</option>
                  <option>1000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Contact Name</label>
                <input required type="text" className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email Address</label>
                <input required type="email" className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Preferred Curriculum</label>
                <input type="text" placeholder="e.g. British, American, WAEC" className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                  Launch My Free Trial
                </button>
              </div>
            </form>
          </div>
          <div className="bg-slate-50 px-8 py-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              By submitting this form, you agree to our Terms of Service and Privacy Policy. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
