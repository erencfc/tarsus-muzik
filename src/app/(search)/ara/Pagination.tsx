"use client";

import Link from "next/link";

export default function Pagination({
    currentPage,
    totalPages,
    CreateQueryString,
}: {
    currentPage: number;
    totalPages: number;
    route: string;
    query: string | null;
    CreateQueryString: (name: string, value: string) => string;
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
                href={`/ara?${CreateQueryString("sayfa", page.toString())}`}
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
                {currentPage > 1 && (
                    <Link
                        className="btn btn-accent join-item text-white"
                        href={`/ara?${CreateQueryString(
                            "sayfa",
                            (currentPage - 1).toString()
                        )}`}
                    >
                        «
                    </Link>
                )}
                <button className="btn join-item pointer-events-none border-blue-700 bg-blue-700 text-white">
                    Sayfa {currentPage}
                </button>
                {currentPage < totalPages && (
                    <Link
                        className="btn btn-accent join-item text-white"
                        href={`/ara?${CreateQueryString(
                            "sayfa",
                            (currentPage + 1).toString()
                        )}`}
                    >
                        »
                    </Link>
                )}
            </div>
        </>
    );
}
