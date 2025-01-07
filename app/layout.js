import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Genius System Pvt. Ltd.",
  description: "Genius System Pvt. Ltd. is a software development company.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="sidebar__layout">
          <Header />
          <div className="page">
            <div className="container">
              <main className="content">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
