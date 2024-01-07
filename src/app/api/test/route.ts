import { prisma } from "@/lib/db/prisma";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: any) {
    try {
        const data = await prisma.comment.findMany({});

        return NextResponse.json({
            data,
        });
    } catch (error: unknown) {
        console.log(error);

        return NextResponse.json({
            error: getErrorMessage(error),
        });
    }
}
