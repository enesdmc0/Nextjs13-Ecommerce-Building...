import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

export async function GET(request: Request, {params}: {params: {billboardId: string}}) {
    try {

        if (!params.billboardId) {
            return new NextResponse("Billboard ID is required", {status: 400})
        }


        const billboard = await prisma.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard)

    }catch (error) {
        console.log("[BILLBOARD_GET_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}


export async function PATCH(request: Request, {params}: { params: { storeId: string, billboardId: string } }) {
    try {
        const {userId} = auth();

        const body = await request.json();
        const {label, imageUrl} = body


        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard ID is required", {status: 400})
        }


        if (!label) {
            return new NextResponse("Label is required", {status: 400})
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {status: 400})
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

        const billboard = await prisma.billboard.updateMany({
            where: {
                id: params.billboardId
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[BILLBOARD_PATCH_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function DELETE(request: Request, {params}: {params: {storeId: string, billboardId: string}}) {
    try {

        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.billboardId) {
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

        const billboard = await prisma.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard)

    }catch (error) {
        console.log("[BILLBOARD_DELETE_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}