import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { DatasetProvider } from "@/components/providers/dataset-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HEAL Shift AI — Operations Command Center",
  description:
    "AI-Powered Nurse Scheduling and Operations Command Center untuk RS Hermina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.className}>
      <body className="min-h-screen bg-slate-50 flex">
        <DatasetProvider>
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 min-h-screen overflow-y-auto">
            {children}
          </main>
        </DatasetProvider>
      </body>
    </html>
  );
}
