"use client";

import Loading from "@/app/loading";
import ProductList from "@/components/ProductList";
import {
    ChevronDoubleRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import Pagination from "./Pagination";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type SearchPageComponentProps = {
    products: Prisma.ProductGetPayload<{
        select: {
            id: true;
            model: true;
            modelSlug: true;
            price: true;
            images: true;
            rating: true;
            Brand: {
                select: {
                    id: true;
                    name: true;
                    slug: true;
                };
            };
            Category: {
                select: {
                    id: true;
                    name: true;
                    slug: true;
                };
            };
        };
    }>[];
    brands: {
        name: string;
        slug: string;
        count: number;
    }[];
    categories: {
        name: string;
        slug: string;
        count: number;
    }[];
    itemsPerPage: number;
    notSkippedProducts: Prisma.ProductGetPayload<{
        select: {
            Brand: {
                select: {
                    id: true;
                    name: true;
                    slug: true;
                };
            };
            Category: {
                select: {
                    id: true;
                    name: true;
                    slug: true;
                };
            };
        };
    }>[];
    dealerId?: string | null;
};

export default function SearchPageComponent({
    products,
    brands,
    categories,
    itemsPerPage,
    notSkippedProducts,
    dealerId,
}: SearchPageComponentProps) {
    const user = useCurrentUser();

    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);

            if (!value || value === "") params.delete(name);
            else params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const [query, setQuery] = useState<string>(searchParams.toString());

    const [searchBrand, setSearchBrand] = useState("");
    const searchedBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes((searchBrand || "").toLowerCase())
    );

    const router = useRouter();

    //! TODO: totalPages notSkippedProducts'tan geldiği için sayfa sayısı marka filtrelemesi yapıldığında yanlış görünüyor.
    const totalPages = Math.ceil(notSkippedProducts.length / itemsPerPage);

    return (
        <div className="grid w-full py-4 lg:grid-cols-[280px_1fr]">
            {/* FILTER START */}
            <aside className="hidden h-fit rounded-lg border border-gray-300 lg:block">
                <div className="flex flex-col gap-2 p-4">
                    <div className="relative">
                        <h2 className="p-2 text-left text-2xl font-semibold">
                            Kategoriler
                        </h2>
                        <div className="flex flex-col gap-2 py-2 before:h-[1px] before:w-full before:rounded-lg before:bg-zinc-300 before:content-['']">
                            {categories
                                .sort((a, b) => b.count - a.count)
                                .map((category) => (
                                    <div
                                        className="group form-control"
                                        key={category.slug}
                                    >
                                        <Link
                                            href={`/kategori/${category.slug}`}
                                            className="flex flex-row items-center"
                                            key={category.slug}
                                        >
                                            <label className="label flex cursor-pointer justify-start gap-2 text-accent">
                                                <ChevronDoubleRightIcon
                                                    width={16}
                                                    height={16}
                                                />
                                            </label>
                                            <span
                                                className={
                                                    "label-text font-medium transition-colors duration-150 ease-in-out group-hover:text-accent"
                                                }
                                            >
                                                {category.name} (
                                                {category.count})
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="relative">
                        <h2 className="p-2 text-left text-2xl font-semibold">
                            Marka
                        </h2>
                        <div className="relative py-2">
                            <input
                                type="text"
                                placeholder="Marka Ara"
                                className="input input-bordered input-sm h-8  w-full max-w-full rounded-lg border placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2"
                                onChange={(e) => {
                                    setSearchBrand(e.target.value);
                                }}
                            />
                            <button className="absolute right-2 top-[0.85rem] scale-[.8] transition duration-200 ease-in-out hover:scale-100">
                                <MagnifyingGlassIcon width={20} height={20} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 py-2 after:mt-3 after:h-[1px] after:w-full after:rounded-lg after:bg-zinc-300 after:content-['']">
                            <ul className="max-h-44 overflow-auto">
                                {searchedBrands.length > 0 ? (
                                    searchedBrands
                                        .sort((a, b) => b.count - a.count)
                                        .map((brand) => (
                                            <li key={brand.slug}>
                                                <label className="label flex cursor-pointer justify-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox-accent checkbox checkbox-xs"
                                                        defaultChecked={
                                                            searchParams.has(
                                                                "marka"
                                                            ) &&
                                                            searchParams
                                                                .get("marka")
                                                                ?.split(",")
                                                                .includes(
                                                                    brand.slug
                                                                )
                                                        }
                                                        name={brand.slug}
                                                        value={brand.slug}
                                                        onChange={(e) => {
                                                            const oldParams =
                                                                new URLSearchParams(
                                                                    query
                                                                );
                                                            if (
                                                                e.target.checked
                                                            ) {
                                                                let params: string =
                                                                    "";

                                                                if (
                                                                    !oldParams.has(
                                                                        "marka"
                                                                    )
                                                                ) {
                                                                    params =
                                                                        createQueryString(
                                                                            "marka",
                                                                            brand.slug
                                                                        );
                                                                } else {
                                                                    params =
                                                                        createQueryString(
                                                                            "marka",
                                                                            oldParams
                                                                                .get(
                                                                                    "marka"
                                                                                )
                                                                                ?.split(
                                                                                    ","
                                                                                )
                                                                                .concat(
                                                                                    brand.slug
                                                                                )
                                                                                .join(
                                                                                    ","
                                                                                ) ||
                                                                                ""
                                                                        );
                                                                }

                                                                setQuery(
                                                                    params.toString()
                                                                );
                                                            } else {
                                                                const params =
                                                                    createQueryString(
                                                                        "marka",
                                                                        oldParams
                                                                            .get(
                                                                                "marka"
                                                                            )
                                                                            ?.split(
                                                                                ","
                                                                            )
                                                                            .filter(
                                                                                (
                                                                                    slug
                                                                                ) =>
                                                                                    slug !==
                                                                                    brand.slug
                                                                            )
                                                                            .join(
                                                                                ","
                                                                            ) ||
                                                                            ""
                                                                    );

                                                                setQuery(
                                                                    params.toString()
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <span className="label-text font-medium">
                                                        {brand.name} (
                                                        {brand.count})
                                                    </span>
                                                </label>
                                            </li>
                                        ))
                                ) : (
                                    <li className="flex items-center justify-center py-1.5">
                                        <span className="text-gray-500">
                                            Marka bulunamadı.
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    {/* <div className="relative">
                        <h2 className="p-2 text-left text-2xl font-semibold">
                            Fiyat
                        </h2>
                        <div className="flex flex-col gap-2 py-2 after:mt-3 after:h-[1px] after:w-full after:rounded-lg after:bg-zinc-300 after:content-['']">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <input
                                        className="input input-bordered input-sm w-3/4 text-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                                        type="number"
                                        name="min"
                                        value={priceFilter?.min || ""}
                                        min={0}
                                        placeholder="En Az"
                                        onChange={(e) => {
                                            setPriceFilter({
                                                min: e.target.valueAsNumber,
                                                max: priceFilter?.max || null,
                                            });
                                        }}
                                    />
                                    <input
                                        className="input input-bordered input-sm w-3/4 text-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                                        type="number"
                                        min={0}
                                        name="max"
                                        value={priceFilter?.max || ""}
                                        placeholder="En Çok"
                                        onChange={(e) => {
                                            setPriceFilter({
                                                max: e.target.valueAsNumber,
                                                min: priceFilter?.min || null,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    <button
                        className="btn btn-primary btn-sm btn-block mt-1 text-white"
                        onClick={() => {
                            router.push(`/ara?${query}`);
                        }}
                    >
                        Uygula
                    </button>
                </div>
            </aside>
            {/* FILTER END */}
            <main className="flex max-h-full flex-col gap-4 p-4 md:gap-8">
                <>
                    <div className="hidden justify-between px-6 lg:flex">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                {`'${
                                    (new URLSearchParams(query).get("q")
                                        ?.length || 0) > 30
                                        ? new URLSearchParams(query)
                                              .get("q")
                                              ?.slice(0, 30) + "..."
                                        : new URLSearchParams(query).get("q")
                                }' Arama Sonuçları`}
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                {notSkippedProducts.length} adet ürün bulundu.
                            </p>
                        </div>

                        <div className="justify-end">
                            <label className="form-control" htmlFor="select">
                                <select
                                    className="select select-bordered focus:border-transparent focus:outline-none focus:ring-2"
                                    defaultValue="yeni"
                                    id="select"
                                    onChange={(e) => {}}
                                >
                                    <option value="yeni">En Yeni</option>
                                    <option value="eski">En Eski</option>
                                    <option value="dusuk">
                                        En Düşük Fiyat
                                    </option>
                                    <option value="yuksek">
                                        En Yüksek Fiyat
                                    </option>
                                    <option value="az">Ürün Adı A-Z</option>
                                    <option value="za">Ürün Adı Z-A</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="flex min-w-[300px] flex-col justify-between px-6 lg:hidden lg:flex-row">
                        <h1 className="text-2xl font-semibold">
                            {`'${
                                (new URLSearchParams(query).get("q")?.length ||
                                    0) > 30
                                    ? new URLSearchParams(query)
                                          .get("q")
                                          ?.slice(0, 30) + "..."
                                    : new URLSearchParams(query).get("q")
                            }' Arama Sonuçları`}
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            {notSkippedProducts.length} adet ürün bulundu.
                        </p>

                        <div className="flex w-full items-center justify-between pt-6">
                            <label className="form-control" htmlFor="select">
                                <select
                                    className="select select-bordered w-fit focus:border-transparent focus:outline-none focus:ring-2"
                                    defaultValue="yeni"
                                    id="select"
                                    onChange={(e) => {}}
                                >
                                    <option value="yeni">En Yeni</option>
                                    <option value="eski">En Eski</option>
                                    <option value="dusuk">
                                        En Düşük Fiyat
                                    </option>
                                    <option value="yuksek">
                                        En Yüksek Fiyat
                                    </option>
                                    <option value="az">Ürün Adı A-Z</option>
                                    <option value="za">Ürün Adı Z-A</option>
                                </select>
                            </label>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() =>
                                    (
                                        document.getElementById(
                                            "filter_modal"
                                        ) as HTMLDialogElement
                                    )?.showModal()
                                }
                            >
                                Filtrele
                            </button>
                        </div>
                    </div>
                </>

                <>
                    {products.length < 1 ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-4">
                            <h1 className="text-center text-3xl font-semibold">
                                Aradığınız kriterlerde ürün bulunamadı.
                            </h1>
                        </div>
                    ) : (
                        <Suspense fallback={<Loading />}>
                            <div className="p-6">
                                <ProductList
                                    products={products as any}
                                    user={user}
                                    dealerId={dealerId}
                                />
                            </div>
                        </Suspense>
                    )}

                    {totalPages > 1 && (
                        <Pagination
                            query={query}
                            CreateQueryString={createQueryString}
                            currentPage={
                                Number(
                                    new URLSearchParams(query).get("sayfa")
                                ) || 1
                            }
                            totalPages={totalPages}
                            route="ara"
                        />
                    )}
                </>
            </main>
        </div>
    );
}
