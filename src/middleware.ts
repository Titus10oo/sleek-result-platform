import { NextRequest, NextResponse } from "next/server";
import { decrypt, SESSION_COOKIE_NAME } from "@/lib/auth";

// Define role-to-path mapping
const ROLE_DASHBOARDS: Record<string, string> = {
  SUPER_ADMIN: "/dashboard/admin",
  ADMIN: "/dashboard/admin",
  ACCOUNTANT: "/dashboard/bursar",
  TEACHER: "/dashboard/teacher",
  STUDENT: "/dashboard/student",
  PARENT: "/dashboard/parent",
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Define public routes
  const isPublicRoute = path === "/" || path === "/login" || path.startsWith("/api/auth") || path === "/book-demo";

  // 2. Get the session
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = cookie ? await decrypt(cookie).catch(() => null) : null;

  // 3. Redirect to login if accessing protected route without session
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // 4. Redirect to dashboard if accessing login while authenticated
  if (path === "/login" && session) {
    const dashboard = ROLE_DASHBOARDS[session.user.role] || "/dashboard";
    return NextResponse.redirect(new URL(dashboard, request.nextUrl));
  }

  // 5. Protected dashboard routes - verify role
  if (path.startsWith("/dashboard")) {
    const userRole = session?.user?.role;

    if (path.startsWith("/dashboard/admin") && !["SUPER_ADMIN", "ADMIN"].includes(userRole)) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (path.startsWith("/dashboard/bursar") && userRole !== "ACCOUNTANT") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (path.startsWith("/dashboard/teacher") && userRole !== "TEACHER") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (path.startsWith("/dashboard/student") && userRole !== "STUDENT") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (path.startsWith("/dashboard/parent") && userRole !== "PARENT") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes to apply middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
