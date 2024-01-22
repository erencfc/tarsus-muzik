"use client";

import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BrandFilter({
    brands,
}: {
    brands: { name: string; slug: string; count: number }[];
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [searchBrand, setSearchBrand] = useState<string>("");

    const searchedBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes((searchBrand || "").toLowerCase())
    );

    return (
        <div>
            <CardTitle className="text-xl font-bold">Marka</CardTitle>
            <div className="py-3">
                <Input
                    inputMode="search"
                    type="text"
                    placeholder="Marka Ara"
                    className="h-8 rounded-lg dark:border-gray-300 dark:bg-base-100 dark:ring-offset-primary dark:focus:ring-0"
                    onChange={(e) => setSearchBrand(e.target.value)}
                />
            </div>
            <ul className="max-h-44 overflow-y-auto">
                {searchedBrands.length > 0 ? (
                    searchedBrands
                        .sort((a, b) => b.count - a.count)
                        .map((brand) => (
                            <li key={brand.slug} className="cursor-pointer">
                                <label className="label flex justify-start gap-2.5">
                                    <Checkbox
                                        id={brand.slug}
                                        name={brand.slug}
                                        value={brand.slug}
                                        checked={(
                                            searchParams.get("marka") || ""
                                        )
                                            .split(",")
                                            .includes(brand.slug)}
                                        className="cursor-pointer rounded-lg outline outline-1 outline-primary"
                                        onCheckedChange={(checked) => {
                                            const newSearchParams =
                                                new URLSearchParams(
                                                    searchParams
                                                );
                                            const oldBrands = searchParams
                                                .get("marka")
                                                ?.split(",");

                                            let value: string;

                                            if (checked) {
                                                value = [
                                                    ...(oldBrands || []),
                                                    brand.slug,
                                                ].join(",");
                                            } else {
                                                value = oldBrands
                                                    ?.filter(
                                                        (slug) =>
                                                            slug !== brand.slug
                                                    )
                                                    .join(",");
                                            }

                                            if (!value) {
                                                newSearchParams.delete("marka");
                                            } else
                                                newSearchParams.set(
                                                    "marka",
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
                                        htmlFor={brand.slug}
                                        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {brand.name} ({brand.count})
                                    </label>
                                </label>
                            </li>
                        ))
                ) : (
                    <li className="flex items-center justify-center py-1.5">
                        <span className="text-gray-500">Marka bulunamadı.</span>
                    </li>
                )}
            </ul>
        </div>
    );
}
