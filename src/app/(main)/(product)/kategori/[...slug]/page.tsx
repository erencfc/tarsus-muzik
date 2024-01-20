"use server";

import { getProducts } from "@/app/utils/getProducts";
import CategoryPageComponent from "@/components/CategoryPageComponent";
import { currentUser } from "@/lib/auth";
import { getDealerByUserId } from "@/lib/db/dealer";
import { prisma } from "@/lib/db/prisma";
import { formatSlug } from "@/lib/format";
import { Dealer } from "@prisma/client";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
    params: { slug },
}: {
    params: { slug: string[] };
}) => {
    const category_slug = slug[0];
    const sub_category_slug = slug[1];

    const category = await prisma.category.findUnique({
        where: {
            slug: category_slug,
        },
        select: {
            name: true,
            SubCategory: {
                select: {
                    name: true,
                    slug: true,
                },
            },
        },
    });

    const subCategory = category.SubCategory.find(
        (sub) => sub.slug === sub_category_slug
    );

    let title = category?.name;

    if (subCategory) title = subCategory.name;

    return {
        title,
    };
};

export default async function CategoryPage({
    params,
    searchParams: { sayfa, sirala, marka, min, max },
}: {
    params: { slug: string[] };
    searchParams: {
        sayfa: string;
        sirala: string;
        marka: string | null;
        min: string | null;
        max: string | null;
    };
}) {
    const user = await currentUser();
    let dealer: Dealer | null = null;
    if (user) {
        dealer = await getDealerByUserId({
            userId: user.id,
            select: { id: true },
        });
    }

    const category_slug = params.slug[0];
    const sub_category_slug = params.slug[1];

    const currentPage = parseInt(sayfa || "1");
    const itemsPerPage = 12;

    const category = await prisma.category.findUnique({
        where: {
            slug: category_slug,
        },
        include: {
            SubCategory: true,
        },
    });

    if (!category) {
        notFound();
    }

    const sub_category = category?.SubCategory.find(
        (sub_cat) => sub_cat.slug === sub_category_slug
    );

    const products = (await getProducts({
        category: category_slug,
        subCategory: sub_category_slug,
        sort: sirala || "yeni",
        brands: marka || null,
        min: Number(min) || null,
        max: Number(max) || null,
        currentPage,
        itemsPerPage,
        user,
    })) as any;

    const filter = sub_category
        ? {
              Category: {
                  slug: category_slug,
              },
              SubCategory: {
                  slug: sub_category_slug,
              },
          }
        : {
              Category: {
                  slug: category_slug,
              },
          };

    const allBrands = (
        await prisma.product.findMany({
            where: {
                ...filter,
            },
            include: {
                Brand: true,
            },
        })
    ).reduce((acc: any, curr: any) => {
        const { Brand: brand } = curr;

        acc.push({
            name: brand.name,
            slug: formatSlug(brand.slug),
        });
        return acc;
    }, []);

    const brandCounts =
        allBrands.length > 0
            ? allBrands.reduce((acc: any, curr: any) => {
                  if (typeof acc[curr.name] === "undefined") {
                      acc[curr.name] = 1;
                  } else {
                      acc[curr.name] += 1;
                  }

                  return acc;
              }, {})
            : {};

    const brands = Object.entries(brandCounts).map(([key, value]) => ({
        name: key,
        slug: formatSlug(key),
        count: value as number,
    }));

    let price: {
        min: number | null;
        max: number | null;
    } = {
        min: null,
        max: null,
    };

    if (min) {
        price = {
            ...price,
            min: Number(min),
        };
    }
    if (max) {
        price = {
            ...price,
            max: Number(max),
        };
    }

    return (
        <div className="m-auto min-w-[300px] max-w-6xl p-6">
            <CategoryPageComponent
                oldQuery={{
                    sayfa,
                    sirala,
                    price,
                    marka: marka?.split(","),
                }}
                products={products.data}
                brands={brands}
                category={category}
                page={sayfa}
                sub_category={sub_category}
                category_slug={category_slug}
                sub_category_slug={sub_category_slug}
                totalItemCount={products.totalItemCount}
                user={user}
                dealerId={dealer?.id}
            />
        </div>
    );
}
