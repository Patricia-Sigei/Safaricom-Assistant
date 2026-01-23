import type { Metadata } from "next";
import MainAppBar from "@/components/common/MainAppBar";

export const metadata: Metadata = {
  title: "Safaricom Assistant",
  description: "Bundle Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainAppBar />
        {children}
      </body>
    </html>
  );
}
