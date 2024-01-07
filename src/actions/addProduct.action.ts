"use server";

import { prisma } from "@/lib/db/prisma";

export async function addProduct(formData: FormData) {
    const category = formData.get("categories")?.toString();
    const subCategory = formData.get("subCategories")?.toString();
    const brand = formData.get("brands")?.toString();
    const model = formData.get("model")?.toString();
    const image = formData.get("image")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!category || !subCategory || !brand || !model || !image || !price) {
        return {
            success: false,
            error: "Lütfen tüm alanları doldurun.",
        };
    }

    let product = null;

    try {
        await prisma.product.create({
            data: {
                Brand: {
                    connectOrCreate: {
                        where: {
                            slug: brand,
                        },
                        create: {
                            name: brand,
                            slug: brand,
                        },
                    },
                },
                Category: {
                    connectOrCreate: {
                        where: {
                            slug: category,
                        },
                        create: {
                            name: category,
                            slug: category,
                        },
                    },
                },
                SubCategory: {
                    connectOrCreate: {
                        where: {
                            slug: subCategory,
                        },
                        create: {
                            name: subCategory,
                            slug: subCategory,
                            Category: {
                                connectOrCreate: {
                                    where: {
                                        slug: category,
                                    },
                                    create: {
                                        name: category,
                                        slug: category,
                                    },
                                },
                            },
                        },
                    },
                },
                model,
                images: [image],
                price,
            },
        });

        product = await prisma.product.findUnique({
            where: {
                model,
            },
            include: {
                Brand: true,
                Category: true,
                SubCategory: true,
            },
        });
    } catch (error: any) {
        if (error.message.includes("Unique constraint failed")) {
            return {
                success: false,
                error: "Bu ürün zaten mevcut.",
            };
        }
        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
        data: product,
        error: null,
    };
}
