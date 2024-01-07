"use server";

import { prisma } from "@/lib/db/prisma";

export async function fetchCategories() {
    const categories = await prisma.category.findMany({
        include: {
            SubCategory: true,
        },
    });
    return categories;
}
