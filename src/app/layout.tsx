import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, DM_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vijaya Neuro Hospital — Advanced Neurological Care",
    template: "%s | Vijaya Neuro Hospital",
  },
  description:
    "Advanced neurological diagnosis, treatment & rehabilitation under one roof. Expert care for stroke, epilepsy, migraines, nerve disorders, memory problems & more. Led by Dr. Dasari Venkatesh, DNB Neurology.",
  keywords: [
    "neurologist",
    "neurology hospital",
    "stroke treatment",
    "epilepsy specialist",
    "Video EEG",
    "ENMG",
    "neuro rehabilitation",
    "migraine treatment",
    "nerve specialist",
    "Vijaya Neuro Hospital",
    "Dr. Dasari Venkatesh",
    "Telangana",
  ],
  authors: [{ name: "Vijaya Neuro Hospital" }],
  creator: "Vijaya Neuro Hospital",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vijaya Neuro Hospital",
    title: "Vijaya Neuro Hospital — Advanced Neurological Care",
    description:
      "Advanced neurological diagnosis, treatment & rehabilitation under one roof.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijaya Neuro Hospital — Advanced Neurological Care",
    description:
      "Expert care for stroke, epilepsy, migraines, nerve disorders & more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${dmMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-sans)",
            },
          }}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
