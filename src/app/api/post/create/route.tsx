import connectMongoDB from "@/lib/mongodb";
import PostModal, { createPost } from "@/model/post";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession();
  const description = await req.json();
  await connectMongoDB();
  try {
    if (!session || !session.user) {
      redirect("/");
    } else {
      const user = session.user;
      const post = await createPost(user, description);
      return NextResponse.json(post);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
