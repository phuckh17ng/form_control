import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";
import MainLayout from "./components/Layouts/MainLayout";
import SmoothScrolling from "./components/Scrolling/SmoothScrolling";
import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";

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
        <ReactQueryProvider>
          <SmoothScrolling>
            <MainLayout theme={theme} mode={mode}>
              {children}
            </MainLayout>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </SmoothScrolling>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
