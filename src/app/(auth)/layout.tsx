export const metadata = {
  title: "Twitter clone",
  description: "project for portfolio's chatjak",
};
import { getServerSession } from "next-auth";
import BgSignin from "../components/BgSignin";
import "../globals.css";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <html lang="en">
      <body>
        <div className="relative mx-auto max-w-[1440px]">
          <BgSignin />
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="w-full h-screen flex items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
