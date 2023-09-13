import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

export async function GET(request: Request, {params}: {params: {sizeId: string}}) {
    try {

        if (!params.sizeId) {
            return new NextResponse("Size ID is required", {status: 400})
        }


        const size = await prisma.size.deleteMany({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size)

    }catch (error) {
        console.log("[SIZE_GET_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}


export async function PATCH(request: Request, {params}: { params: { storeId: string, sizeId: string } }) {
    try {
        const {userId} = auth();

        const body = await request.json();
        const {name, value} = body


        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.sizeId) {
            return new NextResponse("Size ID is required", {status: 400})
        }


        if (!name) {
            return new NextResponse("Name is required", {status: 400})
        }

        if (!value) {
            return new NextResponse("Value is required", {status: 400})
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

        const size = await prisma.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.log("[SIZE_PATCH_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function DELETE(request: Request, {params}: {params: {storeId: string, sizeId: string}}) {
    try {

        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.sizeId) {
            return new NextResponse("Size ID is required", {status: 400})
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

        const size = await prisma.size.deleteMany({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size)

    }catch (error) {
        console.log("[SIZE_DELETE_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}