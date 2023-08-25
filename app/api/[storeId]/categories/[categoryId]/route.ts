import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

export async function GET(request: Request, {params}: {params: {storeId: string, categoryId: string}}) {
    try {

        if (!params.categoryId) {
            return new NextResponse("Billboard ID is required", {status: 400})
        }

        const category = await prisma.category.findUnique({
            where: {
                id: params.categoryId
            }
        })

        return NextResponse.json(category)

    }catch (error) {
        console.log("[GET_CATEGORY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}


export async function PATCH(request: Request, {params}: {params: {storeId: string, categoryId: string}}) {
    try {

        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400})
        }

        if (!params.categoryId) {
            return new NextResponse("Category ID is required", {status: 400})
        }


        const {name, billboardId} = await request.json()

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

        if (!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        const category = await prisma.category.updateMany({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(category)

    }catch (error) {
        console.log("[PATCH_CATEGORY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}


export async function DELETE(request: Request, {params}: {params: {storeId: string, categoryId: string}}) {
    try {

        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400})
        }

        if (!params.categoryId) {
            return new NextResponse("Category ID is required", {status: 400})
        }


        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        const category = await prisma.category.deleteMany({
            where: {
                id: params.categoryId
            }
        })

        return NextResponse.json(category)

    }catch (error) {
        console.log("[DELETE_CATEGORY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

