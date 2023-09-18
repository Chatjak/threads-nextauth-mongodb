import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession();
  const description = await req.json();
  if (!session) {
    throw new Error();
  }
  try {
    const post = await fetch(`http://localhost:8080/api/post/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: session.user, description: description }),
    });
    if (!post.ok) {
      throw new Error();
    }
    const data = await post.json();
    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
