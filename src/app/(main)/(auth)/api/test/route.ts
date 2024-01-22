import { prisma } from "@/lib/db/prisma";
import { formatSlug } from "@/lib/format";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";
import randomBytes from "randombytes";

export async function GET(req: any) {
    try {
        const data = randomBytes(20).toString("hex");

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
