import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    // create a new image

    const { productId, url } = await req.json();
};
