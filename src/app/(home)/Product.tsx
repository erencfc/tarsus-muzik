import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Rating from "./Ratings";

export default function Product({
    product,
}: {
    product: Prisma.ProductGetPayload<{
        include: {
            _count: {
                select: {
                    Comment: boolean;
                };
            };
        };
    }>;
}) {
    return (
        <div
            key={product.id}
            className="select-none rounded-md border border-solid border-gray-200 bg-base-100 p-5 transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-lg"
        >
            <Link href={`/urun/${product.modelSlug}`} draggable={false}>
                <div className="flex flex-col items-center justify-between gap-3">
                    <Image
                        src={product.images[0]}
                        alt={product.model}
                        width={150}
                        height={150}
                        className="h-[150px] w-[150px] rounded-md object-cover mix-blend-darken"
                        draggable={false}
                    />
                    <span className="line-clamp-1 text-center text-xs font-semibold text-gray-700">
                        {product.model}
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Rating rating={product.rating} />
                            <span className="text-xs font-semibold text-gray-700">
                                {product.rating.toFixed(1)} Puan
                            </span>
                        </div>
                        -
                        <span className="text-xs font-semibold text-gray-700">
                            {product._count.Comment} Yorum
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
