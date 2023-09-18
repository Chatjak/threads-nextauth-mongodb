import Image from "next/image";
import CreatePost from "../components/CreatePost";
import { getServerSession } from "next-auth";
import Posts from "../components/Posts";

export default async function Home() {
  return (
    <div className="">
      <CreatePost />
      <Posts />
    </div>
  );
}
