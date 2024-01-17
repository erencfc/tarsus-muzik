"use client";

import { CldImage } from "next-cloudinary";
import { ImageProps } from "next/image";

export default function CloudinaryImage(props: ImageProps & { src: string }) {
    return <CldImage {...props} />;
}
