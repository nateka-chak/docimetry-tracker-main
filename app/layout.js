import { Geist, Geist_Mono } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
      <div>
        <Header />
        {children}
        <Footer />
      </div>
      </body>
    </html>
  );
}
