import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/session-provider";

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "নূর ফ্যাব্রিক্স ERP | আবায়া ও বোরকা ফ্যাক্টরি",
  description:
    "প্রিমিয়াম বাংলা ERP ড্যাশবোর্ড — অর্ডার, উৎপাদন, ইনভেন্টরি ও বেতন ব্যবস্থাপনা।",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070a12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
