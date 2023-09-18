import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const posts = await fetch(`http://localhost:8080/api/post/getAll`);
    const data = await posts.json();
    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
    NextResponse.json(e, { status: 500 });
  }
}
