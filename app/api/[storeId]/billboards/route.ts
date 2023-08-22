import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

export async function POST(request: Request, {params}: {params: {storeId: string}}) {
    try {

        const {userId} = auth();
        const body = await request.json();
        const {label, imageUrl} = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!label) {
            return new NextResponse("Label is required", {status: 400})
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {status: 400})
        }

        if (!params.storeId) {
            return  new NextResponse("Store ID is required", {status: 400})
        }

        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const billboard = await prisma.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)

    }catch (error) {
        console.log("[BILLBOARDS_POST_ERROR]", error)
        return new NextResponse("Interval server error", {status: 500})
    }
}

export async function GET(request: Request, {params}: {params: {storeId: string}}) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400})
        }

        const billboards = await prisma.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards)

    }catch (error) {
        console.log("[BILLBOARDS_GET_ERROR]", error)
        return new NextResponse("Interval sever error", {status: 500})
    }
}