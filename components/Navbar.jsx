"use client"

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { AvatarGenerator } from 'random-avatar-generator';
import { ThemeToggler } from './ThemeToggler'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'




const Navbar = () => {

  const path = usePathname();
  const router = useRouter()
  const generator = new AvatarGenerator();
  const image = generator.generateRandomAvatar();

  const handleSignOut = async () => {
    const res = await signOut({
      callbackUrl: '/login',
      redirect: false
    });
    console.log(res);
    if (res) {
      router.push('/login');
    }

  }


  return (
    <div className="navbar  flex justify-between items-center h-[6rem] border-b px-6">
      <div className="flex">
        <Link href={'/'} className="normal-case text-xl">BlogMANIA</Link>
      </div>
      <div className="flex items-center justify-center space-x-5 text-lg pl-20">
        <Link href={'/'} className={` ${path === "/" ? ' ' : ''}`}>Home</Link>
        <Link href={'/about'} className={` ${path === "/" ? ' ' : ''}`}>About</Link>
        <Link href={'/blog'} className={` ${path === "/" ? ' ' : ''}`}> Blogs</Link>
        <Link href={'/contact'} className={` ${path === "/" ? ' ' : ''}`}> Contact</Link>
      </div>
      <div className="flex-none gap-x-3">

        <div className="">
          <ThemeToggler />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger  className="focus-visible:outline-none">
            <Avatar className="focus-visible:border-none">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>LogOut</DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

  )
}

export default Navbar


{/* <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={image} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] py-2 px-1 shadow menu menu-sm dropdown-content bg-base-100 rounded-md w-52">
            <li>
              <Link className="justify-between" href={'/profile'}>
                Profile
                <span className="badge">New</span>
              </Link>
            </li>

            <li onClick={handleSignOut}>
              <div className="justify-between">
                Logout
              </div>
            </li>
          </ul>
        </div> */}