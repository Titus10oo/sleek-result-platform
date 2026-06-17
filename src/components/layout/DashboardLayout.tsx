import { getSession } from "@/lib/auth";
import { Sidebar } from "./Sidebar";
import { redirect } from "next/navigation";
import { User, Bell, Search } from "lucide-react";
import { AIChatbot } from "../AIChatbot";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar userRole={user.role} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
          <div className="flex flex-1 items-center">
            <div className="relative w-96">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-500">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">{user.email}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role.toLowerCase().replace('_', ' ')}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <User className="h-6 w-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

        <AIChatbot />
      </div>
    </div>
  );
}
