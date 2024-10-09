import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";
import Header from "./components/Layouts/Header/Header";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form Control",
  description: "No more pain when facing the form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("theme");
  const mode = cookies().get("mode");
  return (
    <html
      lang="en"
      className={theme?.value}
      style={{ fontFamily: plusJakartaSans.style.fontFamily }}
    >
      <body className="bg-background text-primary transition-all duration-500">
        <Header serverTheme={theme?.value} serverMode={mode?.value} />
        {children}
      </body>
    </html>
  );
}
