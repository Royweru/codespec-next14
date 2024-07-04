"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const NavbarRoutes = () => {
  const pathName = usePathname();

  const isTeacherPage = pathName?.startsWith("/teacher");
  const isPlayerPage = pathName?.includes("/chapter");
  return (
    <div className=" flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href={"/"}>
          <Button>
            <LogOut className=" h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href={"/teacher/courses"}>
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
