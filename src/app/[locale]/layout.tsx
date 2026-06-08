import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/layout/CustomCursor";
import { Toaster } from "react-hot-toast";
import { routing } from "@/i18n/routing";

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
});

const alliance = localFont({
  src: [
    {
      path: "../../../public/fonts/AllianceNo2-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-alliance",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://starup.co.jp"),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: "STARUP" }],
    creator: "STARUP",
    publisher: "STARUP",
    alternates: {
      canonical: locale === "ja" ? "/" : "/en",
      languages: {
        ja: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: locale === "ja" ? "https://starup.co.jp" : "https://starup.co.jp/en",
      siteName: "STARUP",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      creator: "@starup01",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code",
    },
    icons: {
      icon: [
        {
          url: "/favicon.svg",
          type: "image/svg+xml",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${alliance.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <CustomCursor />
          <PageTransition>{children}</PageTransition>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fff",
                color: "#333",
                padding: "12px 16px",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
