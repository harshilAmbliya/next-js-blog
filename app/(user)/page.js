import { Button } from '@/components/ui/button';
import BlogPost from '@/components/BlogPost';

import prisma from '@/prisma/prismadb';
import Link from 'next/link';
import React from 'react'

const page = async () => {
  const blog = await prisma.blog.findMany();
  return (
    <div className='h-screen'>
      <section className=" py-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-3xl font-semibold first-letter:text-green-500 first-letter:text-4xl px-8" >Latest Blogs</h2>
            <Link href={'/blog/create'}>
              <Button>Create Blog</Button>
            </Link>
          </div>
          <div className="container mx-auto mt-4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blog.map((post, index) => (
                <BlogPost key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          {/* Add additional content or sections here */}

        </div>
      </section>
    </div>
  )
}

export default page