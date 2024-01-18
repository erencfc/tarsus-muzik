"use server";

import { NewProductSchema } from "@/schemas";

import * as z from "zod";
import { prisma } from "@/lib/db/prisma";
import { formatSlug } from "@/lib/format";
import { Brand, Category, SubCategory } from "@prisma/client";
import { currentRole } from "@/lib/auth";

async function checkProduct(model: string) {
    const existingProduct = await prisma.product.findFirst({
        where: {
            OR: [
                {
                    model,
                },
                {
                    modelSlug: formatSlug(model),
                },
            ],
        },
    });

    return !!existingProduct;
}

export const newProduct = async (values: z.infer<typeof NewProductSchema>) => {
    const userRole = await currentRole();

    if (userRole !== "ADMIN") {
        return { error: "Bu işlemi yapmak için yetkiniz yok." };
    }

    const validatedFields = NewProductSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const {
        category,
        newCategory,
        subCategory,
        newSubCategory,
        brand,
        newBrand,
        model,
        description,
        deliveryTimeMaxDay,
        deliveryTimeMinDay,
        images,
        price,
        stock,
    } = validatedFields.data;

    try {
        //? Check if product exists
        const existingProduct = await checkProduct(model);
        if (existingProduct) {
            return { error: "Bu ürün zaten mevcut." };
        }

        const isNewCategory =
            category === "newCategory" && newCategory.length > 0;
        const isNewSubCategory =
            subCategory === "newSubCategory" && newSubCategory.length > 0;
        const isNewBrand = brand === "newBrand" && newBrand.length > 0;

        let cat: Category | null = null;
        let subCat: SubCategory | null = null;
        let br: Brand | null = null;

        if (isNewCategory) {
            const newCategoryExists = await prisma.category.findFirst({
                where: {
                    OR: [
                        {
                            name: newCategory,
                        },
                        {
                            slug: formatSlug(newCategory),
                        },
                    ],
                },
            });

            if (newCategoryExists) {
                return {
                    error: "Oluşturmaya çalıştığınız kategori zaten mevcut.",
                };
            }

            cat = await prisma.category.create({
                data: {
                    name: newCategory,
                    slug: formatSlug(newCategory),
                },
            });
        } else {
            const categoryExists = await prisma.category.findFirst({
                where: {
                    id: category,
                },
            });

            if (!categoryExists) {
                return { error: "Bu kategori mevcut değil." };
            }

            cat = categoryExists;
        }

        if (isNewSubCategory) {
            const newSubCategoryExists = await prisma.subCategory.findFirst({
                where: {
                    OR: [
                        {
                            name: newSubCategory,
                        },
                        {
                            slug: formatSlug(newSubCategory),
                        },
                    ],
                },
            });

            if (newSubCategoryExists) {
                return {
                    error: "Oluşturmaya çalıştığınız alt kategori zaten mevcut.",
                };
            }

            subCat = await prisma.subCategory.create({
                data: {
                    name: newSubCategory,
                    slug: formatSlug(newSubCategory),
                    Category: {
                        connect: {
                            id: cat.id,
                        },
                    },
                },
            });
        } else {
            const subCategoryExists = await prisma.subCategory.findFirst({
                where: {
                    id: subCategory,
                },
            });

            if (!subCategoryExists) {
                return { error: "Bu kategori mevcut değil." };
            }

            subCat = subCategoryExists;
        }

        if (isNewBrand) {
            const newBrandExists = await prisma.brand.findFirst({
                where: {
                    OR: [
                        {
                            name: newBrand,
                        },
                        {
                            slug: formatSlug(newBrand),
                        },
                    ],
                },
            });

            if (newBrandExists) {
                return {
                    error: "Oluşturmaya çalıştığınız marka zaten mevcut.",
                };
            }

            br = await prisma.brand.create({
                data: {
                    name: newBrand,
                    slug: formatSlug(newBrand),
                },
            });
        } else {
            const brandExists = await prisma.brand.findFirst({
                where: {
                    id: brand,
                },
            });

            if (!brandExists) {
                return { error: "Bu marka mevcut değil." };
            }

            br = brandExists;
        }

        await prisma.product.create({
            data: {
                model,
                modelSlug: formatSlug(model),
                description,
                images,
                price: parseFloat(price),
                stock: parseInt(stock),
                stockStatus: parseInt(stock) > 0 ? true : false,
                deliveryTimeMaxDay: parseInt(deliveryTimeMaxDay),
                deliveryTimeMinDay: parseInt(deliveryTimeMinDay),
                Brand: {
                    connect: {
                        id: br.id,
                    },
                },
                Category: {
                    connect: {
                        id: cat.id,
                    },
                },
                SubCategory: {
                    connect: {
                        id: subCat.id,
                    },
                },
            },
        });

        return { success: "Ürün başarıyla eklendi." };
    } catch (error) {
        console.log(error);
        return { error: "Bir hata oluştu. Tekrar deneyin." };
    }
};
