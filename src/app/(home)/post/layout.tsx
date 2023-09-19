import "../../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Threads",
  description: "Threads clone by chatjak",
};

export default async function RootPost({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-xl mx-auto min-h-screen px-4">{children}</div>;
}
