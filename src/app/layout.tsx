import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Pollyglot: Translation Bot",
  description: "Translate your messages with Pollyglot!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white sm:bg-gradient-to-r from-grSkin1 via-grSkin2 to-grSkin3 sm:py-20 min-h-screen overflow-auto">
        {children}
      </body>
    </html>
  );
}
