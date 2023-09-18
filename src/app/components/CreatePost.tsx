"use client";
import { currentUser } from "@/store/Store";
import { user } from "@/types/model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function CreatePost() {
  const [user, setUser] = useRecoilState(currentUser);
  const [description, setDescription] = useState<string>("");
  const route = useRouter();
  useEffect(() => {
    fetch("api/currentUser")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();
    const create = await fetch(`http://localhost:3000/api/post/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(description),
    });
    if (create.ok) {
      route.refresh();
      setDescription("");
    }
  };

  return (
    <>
      {user && (
        <form onSubmit={createPost} className="flex border-b pb-4">
          <Image
            src={user.image}
            width={44}
            height={44}
            priority={true}
            alt=""
            className="rounded-full mr-2"
          />
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
      )}
    </>
  );
}
