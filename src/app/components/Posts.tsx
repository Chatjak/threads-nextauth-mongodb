import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getServerSession } from "next-auth";

export default async function Posts() {
  const posts = await fetch("http://localhost:8080/api/post/getAll", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  const session = await getServerSession();
  return (
    <>
      {posts &&
        posts.map( (post: any) => {

          return (
            <Post
              key={post._id}
              post={post}
              email={session?.user?.email}
    
            />
          );
        })}
    </>
  );
}
