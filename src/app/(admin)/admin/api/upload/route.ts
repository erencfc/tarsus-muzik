import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { mkdir, readdir } from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    },
};

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    try {
        await readdir(join(process.cwd(), "public", "uploads"));
    } catch (error) {
        await mkdir(join(process.cwd(), "public", "uploads"));
    }

    // await readFile(req);

    return NextResponse.json({
        done: "OK",
    });
};
