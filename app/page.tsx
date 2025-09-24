import Navbar from "@/components/root/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex flex-col overflow-hidden items-center justify-center">
      <Navbar />
      <div className="pt-36 pb-28 px-5 flex flex-col gap-6 items-center justify-center">
        <h1 className="text-foreground bricolage text-x6l text-center font-bold">
          Online tests <br />
          the way they should be
        </h1>
        <p className="max-w-xl text-muted-foreground text-center w-full">
          Working on something new to make online exams way more authentic. <br />
          Join our waitlist to be the first to know when it gets launched.
        </p>
        <Button className='cursor-pointer'>
          <Link href="/auth/signup">
            Try it out
          </Link>
        </Button>
      </div>
      <div className="bg-muted h-[230px] w-6xl"></div>
    </main >
  );
}
