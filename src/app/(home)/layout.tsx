import "../globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/components/SessionProvider";
import RecoilRoot from "../components/RecoilRoot";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import Topbar from "../components/Topbar";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Threads",
  description: "Threads clone by chatjak",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/sign-in");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <RecoilRoot>
            <main className="relative max-w-6xl mx-auto px-4">
              <Topbar />
              <div className="max-w-xl mx-auto  min-h-screen px-4">
                {children}
              </div>
            </main>
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
