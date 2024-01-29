"use client";

import Link from "next/link";
import { SetStateAction } from "react";

export default function Pagination({
    currentPage,
    totalPages,
    route,
    query,
    setQuery,
}: {
    currentPage: number;
    totalPages: number;
    route: string;
    query: { sirala?: string | undefined; sayfa?: string | undefined } | null;
    setQuery: SetStateAction<any>;
}) {
    const maxPage = Math.min(totalPages, Math.max(currentPage + 5, 3));
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 3));

    const numberedPageItems: JSX.Element[] = [];

    for (let page = minPage; page <= maxPage; page++) {
        numberedPageItems.push(
            <Link
                key={page}
                className={`btn btn-accent join-item btn-sm h-9 w-9 rounded-md text-white ${
                    currentPage === page
                        ? "pointer-events-none border-blue-700 bg-blue-700"
                        : " "
                }`}
                href={{
                    pathname: `/${route}`,
                    query: { ...query, sayfa: page },
                }}
                onClick={(e) => {
                    setQuery({ ...query, sayfa: page });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                {page}
            </Link>
        );
    }

    return (
        <>
            <div className="join hidden justify-center gap-3 md:flex">
                {numberedPageItems}
            </div>
            <div className="join flex justify-center md:hidden">
                {currentPage > 1 ? (
                    <Link
                        className="btn btn-accent join-item text-white"
                        onClick={() =>
                            setQuery({ ...query, sayfa: currentPage - 1 })
                        }
                        href={{
                            pathname: `/${route}`,
                            query: { ...query, sayfa: currentPage - 1 },
                        }}
                    >
                        «
                    </Link>
                ) : null}
                <button className="btn join-item pointer-events-none border-blue-700 bg-blue-700 text-white">
                    Sayfa {currentPage}
                </button>
                {currentPage < totalPages ? (
                    <Link
                        className="btn btn-accent join-item text-white"
                        onClick={() =>
                            setQuery({ ...query, sayfa: currentPage + 1 })
                        }
                        href={{
                            pathname: `/${route}`,
                            query: { ...query, sayfa: currentPage + 1 },
                        }}
                    >
                        »
                    </Link>
                ) : null}
            </div>
        </>
    );
}
