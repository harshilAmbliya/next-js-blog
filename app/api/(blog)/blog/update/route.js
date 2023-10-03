import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server"

export const PUT = async (req) => {
    const data = await req.json();
    console.log(data);
    const { filterBlog } = data
    const { id, description, image, slug, title } =  filterBlog
    if (!id && !description && !image && !slug && !title) {
        throw new Error("Blog Not Found!");
    }
    const blogData = await prisma.blog.update({
        where: {
            id
        },
        data: {
            description, title, slug, image
        }
    })
    if (!blogData) {
        return NextResponse.json({ message: "Update Data not Send Properly." }, { status: 500 })
    }

    return NextResponse.json({ UpdatedBlog: blogData }, { status: 200 })
}