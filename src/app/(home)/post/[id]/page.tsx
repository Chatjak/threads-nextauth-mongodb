import Comment from "@/app/components/Comment";
import CreateComment from "@/app/components/CreateComment";
import Post from "@/app/components/Post";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/sign-in");
  }
  const post = await getPostById(params.id);
  const comments = await getCommentsById(params.id);
  return (
    <div>
      <Post post={post} email={session.user.email} />
      <CreateComment post_id={post._id} />
      {comments.map((comment: any) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

const getPostById = async (post_id: string) => {
  const post = await fetch(`http://localhost:8080/api/post/${post_id}`, {
    method: "GET",
  });
  if (!post.ok) {
    notFound();
  }
  const data = await post.json();
  return data;
};

const getCommentsById = async (post_id: string) => {
  const comments = await fetch(`http://localhost:8080/api/comment/${post_id}`, {
    method: "GET",
  });
  const data = await comments.json();
  return data;
};
