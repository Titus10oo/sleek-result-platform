import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const roleDashboards: Record<string, string> = {
    SUPER_ADMIN: "/dashboard/admin",
    ADMIN: "/dashboard/admin",
    ACCOUNTANT: "/dashboard/bursar",
    TEACHER: "/dashboard/teacher",
    STUDENT: "/dashboard/student",
    PARENT: "/dashboard/parent",
  };

  redirect(roleDashboards[session.user.role] || "/dashboard/student");
}
