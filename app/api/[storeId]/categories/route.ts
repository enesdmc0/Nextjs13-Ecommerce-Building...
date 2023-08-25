import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

export async function POST(request: Request, {params}: {params: {storeId: string}}) {
    try {

        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const body = await request.json();

        const {name, billboardId} = body

        if (!name) {
            return new NextResponse("Name is required", {status: 400})
        }
        if (!billboardId) {
            return new NextResponse("Billboard ID is required", {status: 400})
        }

        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const category = await prisma.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(category)

    }catch(error) {
        console.log("[CREATE_CATEGORY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}



export async function GET(request: Request, {params}: {params: {storeId: string}}) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400})
        }

        const categories = await prisma.category.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(categories)

    }catch (error) {
        console.log("[GET_CATEGORY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}