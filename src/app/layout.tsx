import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { InternSyncProvider } from "@/context/InternSyncContext";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "InternSync — Smart Field Mentorship & Blocker Manager",
  description:
    "Aplikasi jembatan komunikasi operasional antara peserta PKL dan pembimbing lapangan agar alur kerja lebih transparan, terstruktur, dan minim rasa canggung.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f9fb] text-[#183044]">
        <InternSyncProvider>{children}</InternSyncProvider>
      </body>
    </html>
  );
}
