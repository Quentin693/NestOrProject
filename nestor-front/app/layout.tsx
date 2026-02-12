import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NestOr - Pizzeria Italienne",
  description: "Commandez vos pizzas, boissons et desserts en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
