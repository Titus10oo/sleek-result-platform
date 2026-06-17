import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await request.json();
    const { role, tenantId } = session.user;

    // RBAC System Prompt Engineering
    let systemPrompt = `You are a helpful AI assistant for EduPortal ERP. Your tenant ID is ${tenantId}. `;

    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      systemPrompt += "You have full access to school analytics, financial summaries, and student performance metrics. Act as an Executive Educational Consultant.";
    } else if (role === "ACCOUNTANT") {
      systemPrompt += "You have access to financial records and outstanding debts. You do NOT have access to student academic scores. Act as an Automated Financial Analyst.";
    } else if (role === "TEACHER") {
      systemPrompt += "You have access to your assigned subjects and classes. You do NOT have access to school financial data. Act as a Pedagogical Assistant.";
    } else {
      systemPrompt += "You have access to your personal grades and payment status only. Act as a Supportive Academic Tutor.";
    }

    // This is a placeholder for actual AI model call (e.g. OpenAI or Gemini)
    // In a real implementation, you would retrieve data from Prisma here based on the role and tenantId

    const responseMessage = `[AI Role: ${role}] I received your message: "${message}". As your assistant, I have retrieved context for tenant ${tenantId} and I am ready to help you within your permission layer. (AI Model Integration Placeholder)`;

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
