"use client";

import { post } from "@/types/model";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { BsArrowRepeat, BsThreeDots } from "react-icons/bs";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
export default function Post({
  post,
  email,
}: {
  post: post;
  email?: string | null;
}) {
  const [hasLike, setHasLike] = useState<boolean | null>(null);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();
  let isOwner = null;
  if (email === post.user.email) {
    isOwner = true;
  } else {
    isOwner = false;
  }
  useEffect(() => {
    const total = async () => {
      await fetch(`http://localhost:8080/api/like/${post._id}/total`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((t) => setTotal(t));
    };
    const getHas = async () => {
      await fetch(`http://localhost:8080/api/like/${post._id}/hasLike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => setHasLike(data));
    };
    getHas();
    total();
  }, []);
  const createLike = async () => {
    const like = await fetch(`http://localhost:8080/api/like/${post._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    if (!like.ok) {
      throw new Error();
    }
    setTotal((t) => t + 1);
    setHasLike(true);
  };
  const deleteLike = async () => {
    const like = await fetch(`http://localhost:8080/api/like/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    if (!like.ok) {
      throw new Error();
    }
    setTotal((t) => t - 1);
    setHasLike(false);
  };
  const deletePost = async () => {
    const res = await fetch(`http://localhost:8080/api/post/${post._id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error();
    }
    router.refresh();
  };
  return (
    <div className="flex py-4 border-b">
      <div className="w-11 h-11">
        <Image
          src={post.user.image}
          alt=""
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1  p-2">
        <div className="flex items-center justify-between w-full">
          <div className="font-bold hover:underline cursor-pointer">{post.user.name}</div>
          <div className="flex items-center">
            <p className="font-light mr-2">
              {moment(post.createdAt).fromNow(true)}
            </p>
            <BsThreeDots />
          </div>
        </div>
        <div className=" w-full my-4">{post.description}</div>
        <div className="flex w-full">
          {hasLike ? (
            <AiFillHeart
              className={`w-6 h-6  mr-4 text-red-600 cursor-pointer hoverEffect `}
              onClick={deleteLike}
            />
          ) : (
            <AiOutlineHeart
              className={`w-6 h-6  mr-4 cursor-pointer  hoverEffect`}
              onClick={createLike}
            />
          )}
          <Link
            href={`/post/${post._id}`}
            className="mr-4 hoverEffect cursor-pointer w-6 h-6  "
          >
            <AiOutlineComment className={`w-6 h-6  `} />
          </Link>

          {isOwner ? (
            <AiOutlineDelete
              className={`w-6 h-6  mr-4 hoverEffect cursor-pointer`}
              onClick={deletePost}
            />
          ) : (
            <BsArrowRepeat
              className={`w-6 h-6  mr-4 hoverEffect cursor-pointer`}
            />
          )}
          <AiOutlineShareAlt
            className={`w-6 h-6  mr-4 hoverEffect cursor-pointer`}
          />
        </div>
        <p className="font-light">{total} likes</p>
      </div>
    </div>
  );
}
