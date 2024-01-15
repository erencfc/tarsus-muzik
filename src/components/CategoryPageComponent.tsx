"use client";

import Pagination from "./Pagination";
import ProductList from "./ProductList";
import { formatSlug, getPath } from "@/lib/format";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { SubCategory, Product, Prisma } from "@prisma/client";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Loading from "./Loading";
import Link from "next/link";

export default function CategoryPageComponent({
    oldQuery,
    category,
    category_slug,
    sub_category,
    sub_category_slug,
    page,
    products,
    brands,
    totalItemCount,
    user,
}: {
    oldQuery: {
        sirala?: string;
        sayfa?: string;
        marka?: string[] | null;
        price?: { min: number | null; max: number | null } | null;
    } | null;
    category: Prisma.CategoryGetPayload<{
        include: {
            SubCategory: true;
        };
    }> | null;
    category_slug: string;
    sub_category: SubCategory | undefined;
    sub_category_slug: string;
    page: string;
    products: Prisma.ProductGetPayload<{
        include: {
            Favorite: true;
            _count: {
                select: {
                    Comment: true;
                };
            };
        };
    }>[];
    brands: { name: string; slug: string; count: number }[];
    totalItemCount: number;
    user: any;
}) {
    const currentPage = parseInt(page);
    const itemsPerPage = 12;

    const router = useRouter();

    const [searchBrand, setSearchBrand] = useState<string>("");
    const [brandFilter, setBrandFilter] = useState<string[] | null>(
        oldQuery?.marka || null
    );
    const [priceFilter, setPriceFilter] = useState<{
        min: number | null;
        max: number | null;
    } | null>(
        oldQuery?.price
            ? {
                  min: oldQuery.price.min || null,
                  max: oldQuery.price.max || null,
              }
            : null
    );

    const [query, setQuery] = useState<{
        sirala?: string;
        sayfa?: string;
        marka?: string[] | null;
        price?: { min: number | null; max: number | null } | null;
    } | null>(oldQuery);

    const [loading, setLoading] = useState(false);

    const route = `/kategori/${category_slug}${
        sub_category_slug ? `/${sub_category_slug}` : ""
    }`;

    useEffect(() => {
        if (!query) {
            return;
        }
        router.push(
            `${route}?${query.sayfa ? `sayfa=${query.sayfa}` : ""}${
                query.sirala ? `&sirala=${query.sirala}` : ""
            }${
                query.marka && query.marka.length > 0
                    ? `&marka=${query.marka.join(",")}`
                    : ""
            }${
                query.price && query.price.min ? `&min=${query.price.min}` : ""
            }${query.price && query.price.max ? `&max=${query.price.max}` : ""}`
        );
    }, [query, route, router]);

    useEffect(() => {
        setLoading(false);
    }, [products]);

    if (!products) {
        setLoading(true);
    }
    const totalPages = Math.ceil(totalItemCount / itemsPerPage);

    if (!category) {
        router.push("/");
        return;
    }

    const searchedBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes((searchBrand || "").toLowerCase())
    );

    return (
        <div className="grid w-full py-4 lg:grid-cols-[280px_1fr]">
            {/* FILTER START */}
            <aside className="hidden h-fit rounded-lg border border-gray-300 lg:block">
                <div className="flex flex-col gap-2 p-4">
                    <div className="relative">
                        <h2 className="p-2 text-left text-2xl font-semibold">
                            {sub_category ? sub_category.name : category.name}
                        </h2>
                        <div className="flex flex-col gap-2 py-2 before:h-[1px] before:w-full before:rounded-lg before:bg-zinc-300 before:content-['']">
                            {!sub_category &&
                                category.SubCategory.map((subCategory) => (
                                    <div
                                        className="group form-control"
                                        key={subCategory.slug}
                                    >
                                        <Link
                                            href={getPath(
                                                category.slug,
                                                subCategory.slug
                                            )}
                                            className="flex flex-row items-center"
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
                                                {subCategory.name}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            <div
                                className={
                                    sub_category
                                        ? ""
                                        : "before:mt-2 before:h-[1px] before:w-full before:rounded-lg before:bg-zinc-300 before:content-['']" +
                                          " group form-control after:h-[1px] after:w-full after:rounded-lg after:bg-zinc-300 after:content-['']"
                                }
                            >
                                <Link
                                    href={
                                        sub_category
                                            ? getPath(category.slug)
                                            : "/kategoriler"
                                    }
                                    className={
                                        sub_category
                                            ? "flex flex-row items-center"
                                            : "flex flex-row items-center py-2"
                                    }
                                >
                                    <label className="label flex cursor-pointer justify-start gap-2 text-accent">
                                        <ChevronDoubleLeftIcon
                                            width={20}
                                            height={20}
                                        />
                                    </label>
                                    <span className="label-text font-bold transition-colors duration-150 ease-in-out group-hover:text-accent">
                                        {sub_category
                                            ? category.name
                                            : "Tüm Kategoriler"}
                                    </span>
                                </Link>
                            </div>
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
                                                        checked={
                                                            brandFilter?.includes(
                                                                brand.slug
                                                            ) || false
                                                        }
                                                        name={brand.slug}
                                                        value={brand.slug}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.checked
                                                            ) {
                                                                setBrandFilter([
                                                                    ...(brandFilter ||
                                                                        []),
                                                                    brand.slug,
                                                                ]);
                                                                // setQuery({
                                                                //     ...query,
                                                                //     marka: [
                                                                //         ...(query?.marka ||
                                                                //             []),
                                                                //         brand.slug,
                                                                //     ],
                                                                // });
                                                            } else {
                                                                setBrandFilter(
                                                                    brandFilter?.filter(
                                                                        (
                                                                            slug
                                                                        ) =>
                                                                            slug !==
                                                                            brand.slug
                                                                    ) || []
                                                                );
                                                                // setQuery({
                                                                //     ...query,
                                                                //     marka: query?.marka?.filter(
                                                                //         (slug) =>
                                                                //             slug !==
                                                                //             brand.slug
                                                                //     ),
                                                                // });
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
                    <div className="relative">
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
                    </div>
                    <button
                        className="btn btn-primary btn-sm btn-block mt-1 text-white"
                        onClick={() => {
                            setLoading(true);
                            setQuery({
                                ...query,
                                sayfa: "1",
                                marka: brandFilter || null,
                                price: {
                                    min: priceFilter?.min || null,
                                    max: priceFilter?.max || null,
                                },
                            });
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
                                {sub_category
                                    ? sub_category.name
                                    : category.name}
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                {totalItemCount} adet ürün bulundu.
                            </p>
                        </div>

                        <div className="justify-end">
                            <label className="form-control" htmlFor="select">
                                <select
                                    className="select select-bordered focus:border-transparent focus:outline-none focus:ring-2"
                                    defaultValue="yeni"
                                    id="select"
                                    onChange={(e) => {
                                        setLoading(true);
                                        setQuery({
                                            ...query,
                                            sirala: e.target.value,
                                        });
                                    }}
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
                            {sub_category ? sub_category.name : category.name}
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            {totalItemCount} adet ürün bulundu.
                        </p>

                        <div className="flex w-full items-center justify-between pt-6">
                            <label className="form-control" htmlFor="select">
                                <select
                                    className="select select-bordered w-fit focus:border-transparent focus:outline-none focus:ring-2"
                                    defaultValue="yeni"
                                    id="select"
                                    onChange={(e) => {
                                        setQuery({
                                            ...query,
                                            sirala: e.target.value,
                                        });
                                    }}
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
                {loading ? (
                    <div className="flex h-full flex-col items-center justify-center gap-4 py-4">
                        <span className="loading loading-lg"></span>
                    </div>
                ) : (
                    <>
                        {totalItemCount < 1 ? (
                            <div className="flex flex-col items-center justify-center gap-4 py-4">
                                <h1 className="text-center text-3xl font-semibold">
                                    Aradığınız kriterlerde ürün bulunamadı.
                                </h1>
                            </div>
                        ) : (
                            <Suspense fallback={<Loading />}>
                                <div className="p-6">
                                    <ProductList
                                        products={products}
                                        user={user}
                                    />
                                </div>
                            </Suspense>
                        )}

                        {totalPages > 1 && (
                            <Pagination
                                query={query}
                                setQuery={setQuery}
                                currentPage={currentPage || 1}
                                totalPages={totalPages}
                                route={`kategori/${category_slug}${
                                    sub_category_slug
                                        ? `/${sub_category_slug}`
                                        : ""
                                }`}
                            />
                        )}
                    </>
                )}
            </main>

            {/* MOBILE FILTER MODAL START */}
            <dialog id="filter_modal" className="modal">
                <div className="modal-box h-full w-full">
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="absolute right-3 top-3 cursor-pointer">
                                <XMarkIcon width={24} height={24} />
                            </button>
                        </form>
                    </div>
                    <div className="relative">
                        <h2 className="p-2 text-left text-2xl font-semibold">
                            {sub_category ? sub_category.name : category.name}
                        </h2>
                        <div className="flex flex-col gap-2 py-2 before:h-[1px] before:w-full before:rounded-lg before:bg-zinc-300 before:content-['']">
                            {sub_category
                                ? ""
                                : category.SubCategory.map((subCategory) => (
                                      <div
                                          className="group form-control"
                                          key={formatSlug(subCategory.name)}
                                      >
                                          <Link
                                              href={getPath(
                                                  category.slug,
                                                  subCategory.slug
                                              )}
                                              className="flex flex-row items-center"
                                          >
                                              <label className="label flex cursor-pointer justify-start gap-2 text-accent">
                                                  <ChevronDoubleRightIcon
                                                      width={16}
                                                      height={16}
                                                  />
                                              </label>
                                              <span className="label-text font-medium transition-colors duration-150 ease-in-out group-hover:text-accent">
                                                  {subCategory.name}
                                              </span>
                                          </Link>
                                      </div>
                                  ))}
                            <div
                                className={
                                    sub_category
                                        ? ""
                                        : "before:mt-2 before:h-[1px] before:w-full before:rounded-lg before:bg-zinc-300 before:content-['']" +
                                          " group form-control after:h-[1px] after:w-full after:rounded-lg after:bg-zinc-300 after:content-['']"
                                }
                            >
                                <Link
                                    href={
                                        sub_category
                                            ? getPath(category.slug)
                                            : "/kategoriler"
                                    }
                                    className={
                                        sub_category
                                            ? "flex flex-row items-center"
                                            : "flex flex-row items-center py-2"
                                    }
                                >
                                    <label className="label flex cursor-pointer justify-start gap-2 text-accent">
                                        <ChevronDoubleLeftIcon
                                            width={20}
                                            height={20}
                                        />
                                    </label>
                                    <span className="label-text font-bold transition-colors duration-150 ease-in-out group-hover:text-accent">
                                        {sub_category
                                            ? category.name
                                            : "Tüm Kategoriler"}
                                    </span>
                                </Link>
                            </div>
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
                            />
                            <button className="absolute right-2 top-[0.85rem] scale-[.8] transition duration-200 ease-in-out hover:scale-100">
                                <MagnifyingGlassIcon width={20} height={20} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 py-2 after:mt-3 after:h-[1px] after:w-full after:rounded-lg after:bg-zinc-300 after:content-['']">
                            <ul className="max-h-44 overflow-auto">
                                {brands
                                    .sort((a, b) => b.count - a.count)
                                    .map((brand) => (
                                        <li key={brand.slug}>
                                            <label className="label flex cursor-pointer justify-start gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox-accent checkbox checkbox-xs"
                                                    checked={
                                                        brandFilter?.includes(
                                                            brand.slug
                                                        ) || false
                                                    }
                                                    name={brand.slug}
                                                    value={brand.slug}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setBrandFilter([
                                                                ...(brandFilter ||
                                                                    []),
                                                                brand.slug,
                                                            ]);
                                                        } else {
                                                            setBrandFilter(
                                                                brandFilter?.filter(
                                                                    (slug) =>
                                                                        slug !==
                                                                        brand.slug
                                                                ) || []
                                                            );
                                                        }
                                                    }}
                                                />
                                                <span className="label-text font-medium">
                                                    {brand.name} ({brand.count})
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
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
                    </div>

                    <div className="modal-action">
                        <form method="dialog" className="w-full">
                            <button
                                className="btn btn-primary btn-sm btn-block text-white"
                                onClick={() => {
                                    setLoading(true);
                                    setQuery({
                                        ...query,
                                        sayfa: "1",
                                        marka: brandFilter || null,
                                        price: {
                                            min: priceFilter?.min || null,
                                            max: priceFilter?.max || null,
                                        },
                                    });
                                }}
                            >
                                Uygula
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* MOBILE FILTER MODAL END */}
        </div>
    );
}
