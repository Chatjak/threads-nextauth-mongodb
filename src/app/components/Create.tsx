"use client";
import { Post } from "@/model/post";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { headers } from "next/headers";
export default function Create() {
  const [description, setDescription] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<any | null>(null);
  useEffect(() => {
    const getPosts = async () => {
      fetch("api/post/getall")
        .then((res) => res.json())
        .then((data) => setPosts(data));
    };
    getPosts();
  }, []);
  const CreatePost = async (event: React.FormEvent) => {
    event.preventDefault();
    const create = await fetch(`http://localhost:3000/api/post/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(description),
    });
    const data = await create.json();
    console.log(data);
    setImage(data.user.image);
  };
  return (
    <form onSubmit={CreatePost}>
      <input
        type="text"
        placeholder="what happening ? "
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add post</button>
      {image && <Image src={image} alt="" width={44} height={44} />}
      {posts &&
        posts.map((data: Post) => <p key={data._id}>{data.description}</p>)}
    </form>
  );
}
