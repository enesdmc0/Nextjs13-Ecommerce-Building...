import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(request: Request, {params}: { params: { storeId: string } }) {
    try {

        const {userId} = auth();
        const body = await request.json();

        const {name} = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 401});
        }

        const store = await prisma.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log("[STORE_PATCH]", {status: 500})
        return new NextResponse("Internal Error", {status: 500})
    }
}


export async function DELETE(request: Request, {params}: { params: { storeId: string } }) {
    try {

        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 401})
        }

        const store = await prisma.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log("[STORE_DELETE]", {status: 500})
        return new NextResponse("Internal Error", {status: 500})
    }
}