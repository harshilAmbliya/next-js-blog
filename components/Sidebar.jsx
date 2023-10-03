"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
const Sidebar = () => {
  const path = usePathname();
  const router = useRouter()
  // console.log(path)

  const handleSignOut = async () => {
    const res = await signOut({
      callbackUrl: "/login",
      redirect: false,
    });
    console.log(res);
    if (res) {
      router.push("/login");
    }
  };
  return (
    <>
      <div className=" py-5 border-e relative ">
        <div className="px-3">
          <h3 className="text-lg text-center py-4">Choose Youe Paths</h3>
          <ul className="flex items-center justify-center flex-col">
            <Link
              href={"/dashboard"}
              className={`${
                path === "/dashboard" ? "text-white bg-gray-400" : null
              } w-full rounded-md hover:text-white hover:bg-gray-400 text-center py-2 my-1`}
            >
              Dashboard
            </Link>
            <Link
              href={"/about"}
              className="w-full rounded-md hover:text-white hover:bg-gray-400 text-center py-2 my-1"
            >
              About
            </Link>
            <Link
              href={"/contact"}
              className="w-full rounded-md hover:text-white hover:bg-gray-400 text-center py-2 my-1"
            >
              Contact
            </Link>
            <Link
              href={"/profile"}
              className="w-full rounded-md hover:text-white hover:bg-gray-400 text-center py-2 my-1"
            >
              Profile
            </Link>
          </ul>
        </div>

        <div
          className="h-[calc(h-screen-250px)] w-full flex justify-center px-0 items-center absolute bottom-0 py-3 text-lg cursor-pointer bg-gray-700 text-white"
          onClick={handleSignOut}
        >
          <span className="px-1">
            <AiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
