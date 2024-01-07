"use server";

import { prisma } from "@/lib/db/prisma";

export async function fetchBrands() {
    const brands = await prisma.brand.findMany({});
    return brands;
}
