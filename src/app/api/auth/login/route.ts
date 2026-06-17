import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { login } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, tenantSlug } = body;

    if (!email || !password || !tenantSlug) {
      return NextResponse.json(
        { error: "Email, password, and tenant slug are required" },
        { status: 400 }
      );
    }

    // Find the tenant first
    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      return NextResponse.json(
        { error: "Invalid school identifier" },
        { status: 401 }
      );
    }

    // Find the user within that tenant
    const user = await prisma.user.findUnique({
      where: {
        email_tenantId: {
          email,
          tenantId: tenant.id,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session
    await login({
      id: user.id,
      email: user.email!,
      role: user.role,
      tenantId: user.tenantId,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
