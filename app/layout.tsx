import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";
import SmoothScrolling from "./components/Scrolling/SmoothScrolling";
import "./globals.css";
import dynamic from "next/dynamic";
import MainLayout from "./components/Layouts/MainLayout";

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
  const theme = cookies().get("theme")?.value || "light";
  const mode = cookies().get("mode")?.value || "slider";
  return (
    <html
      lang="en"
      className={theme}
      style={{ fontFamily: plusJakartaSans.style.fontFamily }}
    >
      <body className="bg-background text-primary transition-all duration-500">
        <SmoothScrolling>
          <MainLayout theme={theme} mode={mode}>
            {children}
          </MainLayout>
        </SmoothScrolling>
      </body>
    </html>
  );
}
