import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

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
  return (
    <html lang="en" style={{ fontFamily: plusJakartaSans.style.fontFamily }}>
      <body className="bg-background text-primary transition-[background-color,color] duration-200 selection:text-background selection:bg-primary/85">
        {children}
      </body>
    </html>
  );
}
