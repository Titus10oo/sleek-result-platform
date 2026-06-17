import Link from "next/link";
import { GraduationCap, ArrowRight, ShieldCheck, PieChart, Users, MessageSquare } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">EduPortal ERP</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/book-demo">
            Book Demo
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Next-Gen School ERP & SIS Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A production-ready, cloud-native platform for modern schools. Managed results, fees, attendance, and more with a contextual AI assistant.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/book-demo"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg shadow-sm">
                <ShieldCheck className="h-10 w-10 text-blue-600" />
                <h3 className="text-xl font-bold">Multi-Tenant Isolation</h3>
                <p className="text-sm text-gray-500 text-center">
                  Secure data isolation for every school with role-based access control.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg shadow-sm">
                <PieChart className="h-10 w-10 text-blue-600" />
                <h3 className="text-xl font-bold">Result Management</h3>
                <p className="text-sm text-gray-500 text-center">
                  Automated grading, ranking, and professional PDF report card generation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg shadow-sm">
                <Users className="h-10 w-10 text-blue-600" />
                <h3 className="text-xl font-bold">Financial Ledger</h3>
                <p className="text-sm text-gray-500 text-center">
                  Comprehensive fee management, invoicing, and online payment tracking.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg shadow-sm">
                <MessageSquare className="h-10 w-10 text-blue-600" />
                <h3 className="text-xl font-bold">AI Assistant</h3>
                <p className="text-sm text-gray-500 text-center">
                  Context-aware AI helping students, parents, teachers, and admins.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 EduPortal ERP. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
