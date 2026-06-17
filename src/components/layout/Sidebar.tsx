"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  ClipboardCheck,
  Settings,
  LogOut,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["SUPER_ADMIN", "ADMIN", "ACCOUNTANT", "TEACHER", "STUDENT", "PARENT"] },
  { name: "Students", href: "/dashboard/admin/students", icon: GraduationCap, roles: ["SUPER_ADMIN", "ADMIN"] },
  { name: "Teachers", href: "/dashboard/admin/teachers", icon: Users, roles: ["SUPER_ADMIN", "ADMIN"] },
  { name: "Academics", href: "/dashboard/admin/academics", icon: BookOpen, roles: ["SUPER_ADMIN", "ADMIN", "TEACHER"] },
  { name: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, roles: ["SUPER_ADMIN", "ADMIN", "TEACHER", "STUDENT", "PARENT"] },
  { name: "Finance", href: "/dashboard/bursar", icon: CreditCard, roles: ["SUPER_ADMIN", "ADMIN", "ACCOUNTANT", "STUDENT", "PARENT"] },
  { name: "Timetable", href: "/dashboard/timetable", icon: Calendar, roles: ["SUPER_ADMIN", "ADMIN", "TEACHER", "STUDENT"] },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["SUPER_ADMIN", "ADMIN"] },
];

interface SidebarProps {
  userRole: string;
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(userRole)
  );

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">EduPortal</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-3">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-blue-700" : "text-slate-400 group-hover:text-slate-500"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-red-700" />
          Logout
        </button>
      </div>
    </div>
  );
}
