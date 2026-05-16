"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import type { EmployeeStatus, SystemRole } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageEmployees } from "@/lib/roles";

async function requireManage() {
  const session = await auth();
  if (!session?.user?.role || !canManageEmployees(session.user.role)) {
    throw new Error("অনুমতি নেই");
  }
  return session;
}

export async function createEmployee(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireManage();

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const salary = Number(formData.get("salary") ?? 0);
  const role = String(formData.get("role") ?? "") as SystemRole;
  const status = String(formData.get("status") ?? "ACTIVE") as EmployeeStatus;
  const joiningDate = String(formData.get("joiningDate") ?? "");
  const profilePhoto = String(formData.get("profilePhoto") ?? "").trim() || null;

    if (!name || !phone || !email || !password || !joiningDate) {
      return { ok: false, error: "প্রয়োজনীয় ঘর পূরণ করুন" };
    }

  const hash = await bcrypt.hash(password, 10);
  const jd = new Date(joiningDate);

  await prisma.user.create({
    data: {
      email,
      passwordHash: hash,
      role,
      employee: {
        create: {
          name,
          phone,
          salary: Math.round(salary) || 0,
          status,
          joiningDate: jd,
          profilePhoto,
        },
      },
    },
  });

    revalidatePath("/dashboard/employees");
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "সংরক্ষণ ব্যর্থ",
    };
  }
}

export async function updateEmployee(
  employeeId: string,
  _prev: unknown,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireManage();

    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const salary = Number(formData.get("salary") ?? 0);
    const role = String(formData.get("role") ?? "") as SystemRole;
    const status = String(formData.get("status") ?? "ACTIVE") as EmployeeStatus;
    const joiningDate = String(formData.get("joiningDate") ?? "");
    const profilePhoto = String(formData.get("profilePhoto") ?? "").trim() || null;
    const newPassword = String(formData.get("password") ?? "").trim();

    const emp = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: { user: true },
    });
    if (!emp) return { ok: false, error: "কর্মচারী পাওয়া যায়নি" };

    await prisma.$transaction(async (tx) => {
      await tx.employee.update({
        where: { id: employeeId },
        data: {
          name,
          phone,
          salary: Math.round(salary) || 0,
          status,
          joiningDate: joiningDate ? new Date(joiningDate) : emp.joiningDate,
          profilePhoto,
        },
      });

      const userUpdate: {
        email: string;
        role: SystemRole;
        passwordHash?: string;
      } = {
        email,
        role,
      };
      if (newPassword.length > 0) {
        userUpdate.passwordHash = await bcrypt.hash(newPassword, 10);
      }
      await tx.user.update({
        where: { id: emp.userId },
        data: userUpdate,
      });
    });

    revalidatePath("/dashboard/employees");
    revalidatePath(`/dashboard/employees/${employeeId}/edit`);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "সংরক্ষণ ব্যর্থ",
    };
  }
}

export async function deleteEmployee(
  employeeId: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const session = await requireManage();

    const emp = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: { user: true },
    });
    if (!emp) return { ok: false, error: "কর্মচারী পাওয়া যায়নি" };
    if (emp.userId === session.user.id) {
      return { ok: false, error: "নিজের অ্যাকাউন্ট মুছে ফেলা যাবে না" };
    }

    await prisma.user.delete({ where: { id: emp.userId } });

    revalidatePath("/dashboard/employees");
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "মুছে ফেলা যায়নি",
    };
  }
}
