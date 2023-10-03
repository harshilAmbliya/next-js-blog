import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json();
    const { data } = body
    const { username, email, password } = data;

    const createdUser = await prisma.User.create({
        data: {
            email, username, password
        }
    })

    if (!createdUser) {
        throw new Error("Invalid Crdentials !")
    }

    return NextResponse.json({ createdUser: createdUser }, { status: 201 })
}