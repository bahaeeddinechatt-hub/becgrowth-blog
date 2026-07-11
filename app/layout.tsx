import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BEC Growth Blog | B2B Cold Email & Client Acquisition",
  description: "Insights, strategies, and guides from BEC Growth — the B2B cold email agency helping service businesses sign 5-20+ clients per month.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}