import { PrismaClient, UserRole, TenantStatus } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // 1. Create a Demo Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      name: 'Demo International School',
      slug: 'demo',
      contactEmail: 'admin@demo.com',
      status: TenantStatus.ACTIVE,
    },
  })

  console.log('Created Tenant:', tenant.name)

  // 2. Create a Super Admin User
  const hashedPassword = await bcrypt.hash('password123', 10)
  const admin = await prisma.user.upsert({
    where: {
      email_tenantId: {
        email: 'admin@demo.com',
        tenantId: tenant.id
      }
    },
    update: {},
    create: {
      email: 'admin@demo.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: UserRole.SUPER_ADMIN,
      tenantId: tenant.id,
    },
  })

  console.log('Created Admin:', admin.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
