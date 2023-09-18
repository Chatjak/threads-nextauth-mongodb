import "../globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/components/SessionProvider";
import RecoilRoot from "../components/RecoilRoot";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <RecoilRoot>{children}</RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}