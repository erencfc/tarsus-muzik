"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CategoryFilter({
    categories,
}: {
    categories: { name: string; slug: string; count: number }[];
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [searchCategory, setSearchCategory] = useState<string>("");

    const searchedCategories = categories.filter((category) =>
        category.name
            .toLowerCase()
            .includes((searchCategory || "").toLowerCase())
    );

    return (
        <div>
            <div className="py-3">
                <Input
                    inputMode="search"
                    type="text"
                    placeholder="Kategori Ara"
                    className="h-8 rounded-lg border-gray-300 bg-base-100 text-gray-800 ring-offset-primary focus:ring-0 dark:border-gray-300 dark:bg-base-100 dark:text-gray-800 dark:ring-offset-primary dark:focus:ring-0"
                    onChange={(e) => setSearchCategory(e.target.value)}
                />
            </div>
            <ul className="max-h-44 overflow-y-auto">
                {searchedCategories.length > 0 ? (
                    searchedCategories
                        .sort((a, b) => b.count - a.count)
                        .map((category) => (
                            <li key={category.slug} className="cursor-pointer">
                                <label className="label flex justify-start gap-2.5">
                                    <Checkbox
                                        id={category.slug}
                                        name={category.slug}
                                        value={category.slug}
                                        checked={(
                                            searchParams.get("kategori") || ""
                                        )
                                            .split(",")
                                            .includes(category.slug)}
                                        className="cursor-pointer rounded-lg outline outline-1 outline-primary"
                                        onCheckedChange={(checked) => {
                                            const newSearchParams =
                                                new URLSearchParams(
                                                    searchParams
                                                );
                                            const oldCategories = searchParams
                                                .get("kategori")
                                                ?.split(",");

                                            let value: string;

                                            if (checked) {
                                                value = [
                                                    ...(oldCategories || []),
                                                    category.slug,
                                                ].join(",");
                                            } else {
                                                value = oldCategories
                                                    ?.filter(
                                                        (slug) =>
                                                            slug !==
                                                            category.slug
                                                    )
                                                    .join(",");
                                            }

                                            if (!value) {
                                                newSearchParams.delete(
                                                    "kategori"
                                                );
                                            } else
                                                newSearchParams.set(
                                                    "kategori",
                                                    value
                                                );

                                            newSearchParams.delete("sayfa");

                                            router.replace(
                                                `${pathname}?${newSearchParams.toString()}`,
                                                { scroll: false }
                                            );
                                        }}
                                    />
                                    <label
                                        htmlFor={category.slug}
                                        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {category.name} ({category.count})
                                    </label>
                                </label>
                            </li>
                        ))
                ) : (
                    <li className="flex items-center justify-center py-1.5">
                        <span className="text-gray-500">
                            Kategori bulunamadı.
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
}
