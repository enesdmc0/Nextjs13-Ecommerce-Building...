import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"

export async function POST(request: Request) {
    try {

        const { userId } = auth()
        const { name } = await request.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 401 })
        }

        const store = await prisma.store.create({
            data: {
                name,
                userId,
            }
        })


        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}