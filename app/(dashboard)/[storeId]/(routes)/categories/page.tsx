import React from 'react';
import prisma from "@/lib/prismadb";
import {format} from "date-fns"
import {CategoryColumn} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/Columns";
import CategoryClient from "@/app/(dashboard)/[storeId]/(routes)/categories/components/Client";

const CategoriesPage = async ({params}: {params: {storeId: string}}) => {
    const categories = await prisma?.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const formattedCategories: CategoryColumn[] = categories.map(item => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6" >
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
