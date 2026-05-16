/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const DEMO_PASSWORD = "Demo@2026";

function day(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

async function main() {
  const hash = await bcrypt.hash(DEMO_PASSWORD, 10);

  await prisma.commission.deleteMany();
  await prisma.salesOrder.deleteMany();
  await prisma.salesDailyTarget.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();

  const u1 = await prisma.user.create({
    data: {
      email: "superadmin@nurfabrics.bd",
      passwordHash: hash,
      role: "SUPER_ADMIN",
      employee: {
        create: {
          name: "ফাতেমা খাতুন",
          phone: "+880 1711-000001",
          salary: 95000,
          status: "ACTIVE",
          joiningDate: new Date("2022-03-01"),
          profilePhoto: null,
        },
      },
    },
    include: { employee: true },
  });

  const u2 = await prisma.user.create({
    data: {
      email: "manager@nurfabrics.bd",
      passwordHash: hash,
      role: "MANAGER",
      employee: {
        create: {
          name: "আসিফ রহমান",
          phone: "+880 1812-222222",
          salary: 72000,
          status: "ACTIVE",
          joiningDate: new Date("2023-01-15"),
          profilePhoto: null,
        },
      },
    },
    include: { employee: true },
  });

  const u3 = await prisma.user.create({
    data: {
      email: "sales1@nurfabrics.bd",
      passwordHash: hash,
      role: "SALES",
      employee: {
        create: {
          name: "নুসরাত জাহান",
          phone: "+880 1913-333333",
          salary: 35000,
          status: "ACTIVE",
          joiningDate: new Date("2024-06-01"),
          profilePhoto: null,
        },
      },
    },
    include: { employee: true },
  });

  const u4 = await prisma.user.create({
    data: {
      email: "sales2@nurfabrics.bd",
      passwordHash: hash,
      role: "SALES",
      employee: {
        create: {
          name: "সাকিব হাসান",
          phone: "+880 1614-444444",
          salary: 32000,
          status: "ACTIVE",
          joiningDate: new Date("2024-08-10"),
          profilePhoto: null,
        },
      },
    },
    include: { employee: true },
  });

  const u5 = await prisma.user.create({
    data: {
      email: "production1@nurfabrics.bd",
      passwordHash: hash,
      role: "PRODUCTION",
      employee: {
        create: {
          name: "রুনা লতিফ",
          phone: "+880 1515-555555",
          salary: 28000,
          status: "ACTIVE",
          joiningDate: new Date("2023-11-20"),
          profilePhoto: null,
        },
      },
    },
    include: { employee: true },
  });

  const u6 = await prisma.user.create({
    data: {
      email: "production2@nurfabrics.bd",
      passwordHash: hash,
      role: "PRODUCTION",
      employee: {
        create: {
          name: "জাহিদ মিয়া",
          phone: "+880 1416-666666",
          salary: 26500,
          status: "ACTIVE",
          joiningDate: new Date("2024-02-01"),
          profilePhoto: null,
        },
      },
    },
    include: { employee: true },
  });

  const salesEmp = [u3.employee, u4.employee];

  const orders = await Promise.all([
    prisma.salesOrder.create({
      data: {
        orderNo: "NF-5010",
        customerName: "বায়তুল আবায়া · সিলেট",
        channel: "WHOLESALE",
        amount: 1840000,
        status: "CONFIRMED",
        salespersonId: salesEmp[0].id,
        notes: "হোলসেল বাল্ক অর্ডার",
      },
    }),
    prisma.salesOrder.create({
      data: {
        orderNo: "NF-5011",
        customerName: "আলমডাঙ্গা বুটিক",
        channel: "RETAIL",
        amount: 12900,
        status: "PRODUCTION",
        salespersonId: salesEmp[0].id,
        notes: "খুচরা · কাস্টম সাইজ",
      },
    }),
    prisma.salesOrder.create({
      data: {
        orderNo: "NF-5012",
        customerName: "অনলাইন ওয়েবসাইট",
        channel: "RETAIL",
        amount: 8750,
        status: "QC",
        salespersonId: salesEmp[1].id,
        notes: null,
      },
    }),
    prisma.salesOrder.create({
      data: {
        orderNo: "NF-5013",
        customerName: "রুফায়েদা ট্রেডিং",
        channel: "WHOLESALE",
        amount: 920000,
        status: "DELIVERED",
        salespersonId: salesEmp[1].id,
        notes: null,
      },
    }),
  ]);

  for (const o of orders) {
    const pct = o.channel === "WHOLESALE" ? 2.5 : 5;
    const amt = Math.round((o.amount * pct) / 100);
    await prisma.commission.create({
      data: {
        employeeId: o.salespersonId,
        orderId: o.id,
        ratePercent: pct,
        amount: amt,
      },
    });
  }

  const today = day(new Date());
  const yday = day(new Date(Date.now() - 86400000));

  for (const e of salesEmp) {
    await prisma.salesDailyTarget.create({
      data: {
        employeeId: e.id,
        date: today,
        targetAmount: 50000,
      },
    });
    await prisma.salesDailyTarget.create({
      data: {
        employeeId: e.id,
        date: yday,
        targetAmount: 45000,
      },
    });
  }

  const allEmp = [u1.employee, u2.employee, u3.employee, u4.employee, u5.employee, u6.employee];
  for (let i = 0; i < 5; i++) {
    const dt = day(new Date(Date.now() - i * 86400000));
    for (const emp of allEmp) {
      let status = "PRESENT";
      if (i === 2 && emp.id === u5.employee.id) status = "LATE";
      try {
        await prisma.attendance.create({
          data: {
            employeeId: emp.id,
            date: dt,
            checkIn: "০৯:১৫",
            checkOut: i === 0 ? "১৮:০০" : "১৭:৪৫",
            status,
            note: null,
          },
        });
      } catch {
        /* unique skip */
      }
    }
  }

  console.log(`Seed OK. Demo password for all users: ${DEMO_PASSWORD}`);
  console.log("Accounts:", [
    u1.email,
    u2.email,
    u3.email,
    u4.email,
    u5.email,
    u6.email,
  ].join(", "));
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
