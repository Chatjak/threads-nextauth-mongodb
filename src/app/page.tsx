import Image from "next/image";
import HomePage from "./components/HomePage";
import { getServerSession } from 'next-auth'
export default async function Home() {
  const session = await getServerSession()
  return (<>
    <HomePage />
    
  </>)
}
