# Next-Gen School ERP & SIS Platform

A production-ready, cloud-native, multi-tenant School Management System.

## Features
- **Multi-Tenant Isolation**: Secure data separation for multiple schools.
- **Role-Based Access Control (RBAC)**: Dashboards for Admins, Teachers, Students, Parents, and Bursars.
- **Academic Management**: Results processing, attendance, and timetable management.
- **Financial Ledger**: Fee templates, invoicing, and payment tracking.
- **Contextual AI Assistant**: Secure chatbot that respects role permissions.
- **PDF Generation**: Professional report cards.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- JWT (Jose) with HttpOnly Cookies

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables in `.env`.
4. Run `npx prisma db push` and `npx prisma db seed`.
5. Run the dev server: `npm run dev`.

## License
MIT
