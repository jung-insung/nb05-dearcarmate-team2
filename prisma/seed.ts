import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedAdminPassword = await bcrypt.hash("admin1234", 10);
  const hashedPassword = await bcrypt.hash("password", 10);

  // 플랫폼 관리자
  await prisma.user.upsert({
    where: {
      email: "admin@dearcarmate.com",
    },
    update: {},
    create: {
      name: "플랫폼 관리자",
      email: "admin@dearcarmate.com",
      employeeNumber: "PLATFORM001",
      phoneNumber: "010-0000-0000",
      password: hashedAdminPassword,
      isAdmin: true,
    },
  });

  const companies = [
    { name: "햇살카", code: "SUNSHINE" },
    { name: "굿모닝카", code: "GOODMORNING" },
    { name: "미래카", code: "FUTURE" },
    { name: "믿음카", code: "TRUST" },
    { name: "행복카", code: "HAPPY" },
  ];

  for (const companyInfo of companies) {
    const company = await prisma.company.upsert({
      where: {
        companyCode: companyInfo.code,
      },
      update: {},
      create: {
        companyName: companyInfo.name,
        companyCode: companyInfo.code,
        userCount: 6, // 관리자 1 + 직원 5
      },
    });

    // 회사 관리자
    await prisma.user.upsert({
      where: {
        email: `admin@${companyInfo.code.toLowerCase()}.com`,
      },
      update: {},
      create: {
        name: `${companyInfo.name} 관리자`,
        email: `admin@${companyInfo.code.toLowerCase()}.com`,
        employeeNumber: `${companyInfo.code}-ADMIN`,
        phoneNumber: "010-1111-1111",
        password: hashedPassword,
        isAdmin: false,
        companyId: company.id,
      },
    });

    // 직원 5명
    for (let i = 1; i <= 5; i++) {
      await prisma.user.upsert({
        where: {
          email: `user${i}@${companyInfo.code.toLowerCase()}.com`,
        },
        update: {},
        create: {
          name: `직원${i}`,
          email: `user${i}@${companyInfo.code.toLowerCase()}.com`,
          employeeNumber: `${companyInfo.code}-${1000 + i}`,
          phoneNumber: `010-1234-${String(i).padStart(4, "0")}`,
          password: hashedPassword,
          isAdmin: false,
          companyId: company.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Seed completed");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);
  const adminPassword = await bcrypt.hash('admin1234', 10);

  // 1. 관리자 계정 생성
  await prisma.user.upsert({
    where: { email: 'admin@dearcarmate.com' },
    update: {},
    create: {
      email: 'admin@dearcarmate.com',
      password: adminPassword,
      role: 'ADMIN', // 혹은 관리자 구분 필드
    },
  });

  // 2. 회사 목록 및 계정 생성
  const companies = [
    { name: '햇살카', code: 'SUNSHINE' },
    { name: '굿모닝카', code: 'GOODMORNING' },
    { name: '미래카', code: 'FUTURE' },
    { name: '믿음카', code: 'TRUST' },
    { name: '행복카', code: 'HAPPY' },
  ];

  for (const company of companies) {
    // 대표 계정
    await prisma.user.upsert({
      where: { email: `admin@${company.code.toLowerCase()}.com` },
      update: {},
      create: {
        email: `admin@${company.code.toLowerCase()}.com`,
        password: password,
        role: 'COMPANY_ADMIN',
      },
    });

    // 일반 직원 계정 (5~8명 랜덤 생성)
    const userCount = Math.floor(Math.random() * 4) + 5; 
    for (let i = 1; i <= userCount; i++) {
      await prisma.user.upsert({
        where: { email: `user${i}@${company.code.toLowerCase()}.com` },
        update: {},
        create: {
          email: `user${i}@${company.code.toLowerCase()}.com`,
          password: password,
          role: 'USER',
        },
      });
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
