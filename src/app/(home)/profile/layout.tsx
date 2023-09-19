import Profile from "@/app/components/Profile";
import "../../globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Posts from "@/app/components/Posts";
import Post from "@/app/components/Post";
export const metadata: Metadata = {
  title: "Threads",
  description: "Threads clone by chatjak",
};

export default async function RootPost({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/sign-in");
  }
  const posts = await fetch(`http://localhost:8080/api/post/me`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: session.user }),
  }).then((res) => res.json());

  return (
    <div className="max-w-xl mx-auto min-h-screen ">
      <Profile
        email={session.user.email}
        name={session.user.name}
        image={session.user.image}
      />
      {posts.map((post: any) => (
        <Post key={post._id} post={post} email={session?.user?.email} />
      ))}
    </div>
  );
}
