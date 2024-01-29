"use server";

import { fetchCategories } from "@/app/utils/fetchCategories";
import { formatSlug, getPath } from "@/lib/format";
import Link from "next/link";

export default async function NavLinks() {
    const categories = await fetchCategories();

    return (
        <>
            {categories
                .sort((a, b) => {
                    // order değerine göre sırala (eğer 0 ise en alta at)
                    if (a.order === 0) return 1;
                    if (b.order === 0) return -1;
                    return a.order - b.order;
                })
                .map((category) => (
                    <li className="px-5" key={formatSlug(category.name)}>
                        <div className="group text-left">
                            <Link
                                className="relative inline-block whitespace-nowrap after:absolute after:left-2/4 after:top-[1.60rem] after:z-[1] after:h-[2px] after:w-0 after:-translate-x-2/4 after:bg-white after:duration-300 after:content-[''] group-hover:after:w-full"
                                href={getPath(category.slug)}
                            >
                                {category.name}
                            </Link>
                            <div>
                                <div className="absolute top-[2.15rem] hidden hover:block group-hover:block">
                                    <div className="py-3">
                                        <div className="absolute left-3 mt-1 h-4 w-4 rotate-45 bg-zinc-950"></div>
                                    </div>
                                    <div className="bg-zinc-950 px-3.5 py-2">
                                        {category.SubCategory.sort((a, b) => {
                                            // order değerine göre sırala (eğer 0 ise en alta at)
                                            if (a.order === 0) return 1;
                                            if (b.order === 0) return -1;
                                            return a.order - b.order;
                                        }).map((subCategory) => (
                                            <div
                                                key={formatSlug(
                                                    subCategory.name
                                                )}
                                                className="my-3 text-sm text-white"
                                            >
                                                <Link
                                                    href={getPath(
                                                        category.slug,
                                                        subCategory.slug
                                                    )}
                                                    className="transition-colors duration-150 hover:text-primary"
                                                >
                                                    {subCategory.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
        </>
    );
}
