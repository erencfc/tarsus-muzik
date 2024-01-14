"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

type CreateCommentProps = {
    formData: FormData;
    rating: number | null;
    productId: string;
    userId: string;
};

export async function createComment({
    formData,
    rating,
    productId,
    userId,
}: CreateCommentProps) {
    const content = formData.get("content")?.toString();
    const title = formData.get("title")?.toString();

    if (!rating) {
        return {
            success: false,
            message: "Lütfen puan veriniz.",
        };
    }

    if (!title && !content) {
        return {
            success: false,
            message: "Lütfen yorumunuzu giriniz.",
        };
    }

    const alreadyCommented = await prisma.comment.findFirst({
        where: {
            productId,
            userId,
        },
    });

    if (alreadyCommented) {
        return {
            success: false,
            message: "Bu ürün için daha önce yorum yaptınız.",
        };
    }
    try {
        const comment = await prisma.comment.create({
            data: {
                rating,
                content,
                title,
                User: {
                    connect: {
                        id: userId,
                    },
                },
                Product: {
                    connect: {
                        id: productId,
                    },
                },
            },
        });

        const newRating = Math.round(
            (
                await prisma.comment.aggregate({
                    where: {
                        productId,
                    },
                    _avg: {
                        rating: true,
                    },
                })
            )._avg.rating || 0
        );

        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                rating: newRating,
            },
        });

        revalidatePath("/urun/[slug]", "page");

        return {
            success: true,
            message: "Yorumunuz başarıyla paylaşıldı.",
            comment,
        };
    } catch (error: any) {
        console.log(error);
        return {
            error,
            message: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
            success: false,
        };
    }
}
