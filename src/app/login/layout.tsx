import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রবেশ | নূর ফ্যাব্রিক্স ERP",
  description:
    "পরিচালক ও কর্মচারী লগইন — NextAuth ক্রিডেনশিয়াল্স ও JWT সেশন।",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
