import type { Metadata } from "next";
import { Geist, Poppins, Caveat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import ClientComponentsWrapper from "@/components/ClientComponentsWrapper";
import { CursorProvider } from "@/context/CursorContext";
import { ChatProvider } from "@/context/ChatContext";

// Only keep essential fonts - reduced from 5 to 2 families
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Critical for LCP
});

// Reduced Poppins weights from 5 to 2
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"], // Only essential weights
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

// Chonburi - LCP critical font (hero text)
const chonburi = localFont({
  src: "../assets/fonts/Chonburi/Chonburi-Regular.ttf",
  variable: "--font-chonburi",
  display: "swap",
  preload: true, // Preload for LCP
});

export const metadata: Metadata = {
  title: "Tarzan ",
  description: "Portfolio of Tarzan - Showcasing creative technology, interactive web experiences, and high-performance software solutions.",
  openGraph: {
    title: "Tarzan",
    description: "Portfolio of Tarzan - Showcasing creative technology and high-performance software solutions.",
    url: "https://tarzan.software",
    siteName: "Tarzan Portfolio",
    images: [
      {
        url: "/src/assets/logo/logo.png", // Next.js will resolve this or we can use a dedicated og-image.png
        width: 1200,
        height: 630,
        alt: "Tarzan Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarzan | Creative Technologist",
    description: "Portfolio of Tarzan - Showcasing creative technology and high-performance software solutions.",
    images: ["/src/assets/logo/logo.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload LCP-critical font */}
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${chonburi.variable} ${poppins.variable} ${caveat.variable} antialiased`}
      >
        <CursorProvider>
          <ChatProvider>
            <ClientComponentsWrapper />
            {children}
          </ChatProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
