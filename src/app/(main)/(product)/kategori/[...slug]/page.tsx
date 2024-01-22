import CategoryProducts from "./CategoryProducts";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { prisma } from "@/lib/db/prisma";

export const generateMetadata = async ({
    params: { slug },
}: {
    params: { slug: string[] };
}) => {
    const categorySlug = slug[0];
    const subCategorySlug = slug[1];
    let name: string;

    if (!subCategorySlug)
        name = (
            await prisma.category.findUnique({
                where: { slug: categorySlug },
                select: { name: true },
            })
        ).name;
    else {
        name = (
            await prisma.subCategory.findUnique({
                where: { slug: subCategorySlug },
                select: { name: true },
            })
        ).name;
    }

    return { title: name };
};

export default function CategoryPage({
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
    const categorySlug = params.slug[0];
    const subCategorySlug = params.slug[1];

    const currentPage = parseInt(sayfa || "1");
    const itemsPerPage = 12;

    return (
        <div className="mx-auto max-w-6xl py-8">
            <Suspense fallback={<LoadingSkeleton />}>
                <CategoryProducts
                    categorySlug={categorySlug}
                    subCategorySlug={subCategorySlug}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    brands={marka?.split(",") || []}
                    min={min ? parseInt(min) : null}
                    max={max ? parseInt(max) : null}
                    sort={sirala}
                />
            </Suspense>
        </div>
    );
}
