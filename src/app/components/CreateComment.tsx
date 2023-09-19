"use client";
import { currentUser } from "@/store/Store";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import Image from "next/image";

export default function CreateComment({ post_id }: { post_id: string }) {
  const [user, setUser] = useRecoilState(currentUser);
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      await fetch("http://localhost:3000/api/currentUser")
        .then((res) => res.json())
        .then((data) => setUser(data));
    };
    getUser();
  }, []);
  const createComment = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      user: user,
      description: description,
    };
    const create = await fetch(`http://localhost:8080/api/comment/${post_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setDescription("");
    router.refresh();
  };

  return (
    <>
      <form onSubmit={createComment} className="flex border-b py-4">
        {user ? (
          <Image
            src={user?.image}
            width={44}
            height={44}
            priority={true}
            alt=""
            className="rounded-full mr-2"
          />
        ) : (
          <div className="w-11 h-11 bg-gray-100 animate-pulse rounded-full" />
        )}
        <input
          type="text"
          placeholder="Start a threads..."
          className="flex-1 pl-2 border-none outline-none"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button
          type="submit"
          className={`px-2 py-1 border rounded-md ${
            !description
              ? `border-gray-300 text-gray-300`
              : `border-black text-black`
          }`}
          disabled={!description}
        >
          Post
        </button>
      </form>
    </>
  );
}
