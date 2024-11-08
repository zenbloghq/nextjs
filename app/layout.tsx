import type { Metadata } from "next";
import "./globals.css";
import { BLOG_LANG, BLOG_DESCRIPTION, BLOG_TITLE } from "@/lib/blog.constants";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={BLOG_LANG}>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
