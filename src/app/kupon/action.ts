"use server";
import { prisma } from "@/lib/db/prisma";
import { getErrorMessage } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

function randomString(length: number) {
    return [...Array(5)]
        .map(() => (Math.random() * 1000000).toString(36).replace(".", ""))
        .join("")
        .substring(0, length)
        .toUpperCase();
}

type CreateCouponProps = {
    formData: FormData;
    categories: Prisma.CategoryGetPayload<{
        include: {
            SubCategory: true;
        };
    }>[];
};

export async function createCoupon({
    formData,
    categories,
}: CreateCouponProps) {
    const coupon_start_date = formData.get("coupon_start_date")?.toString();
    const coupon_start_time = formData.get("coupon_start_time")?.toString();

    const coupon_end_date = formData.get("coupon_end_date")?.toString();
    const coupon_end_time = formData.get("coupon_end_time")?.toString();

    const startDate =
        coupon_start_date && coupon_start_time
            ? new Date(`${coupon_start_date} ${coupon_start_time}`)
            : new Date();

    const endDate =
        coupon_end_date && coupon_end_time
            ? new Date(`${coupon_end_date} ${coupon_end_time}`)
            : null;

    let coupon_code = formData.get("coupon_code")?.toString();

    if (coupon_code) {
        const couponExists = await prisma.coupon.findFirst({
            where: {
                code: coupon_code,
            },
        });

        if (couponExists) {
            return {
                success: false,
                message: "Bu kupon kodu ile zaten kupon oluşturulmuş.",
            };
        }
    } else {
        do {
            coupon_code = randomString(16);
            const couponExists = await prisma.coupon.findFirst({
                where: {
                    code: coupon_code,
                },
            });
            if (!couponExists) break;
        } while (true);
    }

    const coupon_description =
        formData.get("coupon_description")?.toString() || null;

    const coupon_amount =
        Number(formData.get("coupon_discount_amount")?.toString()) || 0;

    const coupon_type =
        formData.get("coupon_discount_type")?.toString() === "1"
            ? "PERCENT"
            : "FIXED";

    const coupon_max_use_count =
        Number(formData.get("coupon_max_use_count")?.toString()) || null;

    const coupon_min_order_amount = Number(
        formData.get("coupon_min_order_amount")?.toString()
    );

    const coupon_status =
        formData.get("coupon_status")?.toString() === "1" ? true : false;

    const coupon_category_id = formData.get("coupon_category_id")?.toString();
    let categoryId, subCategoryId;

    if (coupon_category_id === "all") {
        categoryId = null;
        subCategoryId = null;
    } else if (
        categories.find((category) => category.id === coupon_category_id)
    ) {
        categoryId = coupon_category_id;
        subCategoryId = null;
    } else {
        categories.forEach((category) => {
            const subCategory = category.SubCategory.find(
                (subCategory) => subCategory.id === coupon_category_id
            );
            if (subCategory) {
                categoryId = category.id;
                subCategoryId = subCategory.id;
            }
        });
    }

    try {
        const coupon = await prisma.coupon.create({
            data: {
                code: coupon_code,
                discount: coupon_amount,
                discountType: coupon_type,
                maxUse: coupon_max_use_count,
                validTo: endDate,
                validFrom: startDate,
                active: coupon_status,
                minPurchase: coupon_min_order_amount,
                description: coupon_description,
                Category: categoryId
                    ? { connect: { id: categoryId } }
                    : undefined,
                SubCategory: subCategoryId
                    ? { connect: { id: subCategoryId } }
                    : undefined,
            },
        });
        revalidatePath("/kupon");
        return {
            success: true,
            message: "Kupon başarıyla oluşturuldu.",
            coupon,
        };
    } catch (error: any) {
        console.log(error);
        return {
            error,
            success: false,
        };
    }
}
