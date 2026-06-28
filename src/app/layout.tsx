import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SiteAgentAI — AI Website Employee",
    template: "%s | SiteAgentAI — AI Website Employee",
  },
  description:
    "Turn website visitors into qualified leads with an AI-powered website assistant built for small service businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 font-sans text-white">
        {children}
      </body>
    </html>
  );
}
