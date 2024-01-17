import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest } from "next";

export const GET = async (req: NextRequest) => {
    const body = await req.json();

    console.log(body);

    const signature = cloudinary.utils.api_sign_request(
        body.paramsToSign,
        process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
        signature,
    });
};
