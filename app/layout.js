import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "CHAK Dosimetry Tracker",
  description: "Dosimetry Tracking System for Christian Health Association of Kenya",
};

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      > 
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="px-4 h-screen">{children}</main>
        <Footer />
      </div>
      </body>
    </html>
  );
}
