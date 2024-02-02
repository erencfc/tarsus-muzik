"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

export default function PaginationComponent({
    totalItems,
    itemsPerPage,
    currentPage,
    href,
}: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    href: string;
}) {
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const maxPage = Math.min(totalPages, Math.max(currentPage + 2, 3));
    const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 2));

    let pages = [];

    for (let page = minPage; page <= maxPage; page++) {
        pages.push(page);
    }

    let previousPages = [];
    for (let page = minPage - 1; page >= 1; page--) {
        previousPages.push(page);
    }

    let nextPages = [];
    for (let page = maxPage + 1; page <= totalPages; page++) {
        nextPages.push(page);
    }

    const getSearchParams = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (page === 1) {
            newSearchParams.delete("sayfa");
        } else newSearchParams.set("sayfa", `${page}`);
        return newSearchParams.toString();
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationPrevious
                    className={
                        currentPage === 1
                            ? "pointer-events-none opacity-40"
                            : null
                    }
                    href={`${href}?${getSearchParams(currentPage - 1)}`}
                />
                {minPage !== 1 ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hidden sm:flex">
                            <PaginationEllipsis />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="min-w-fit list-none">
                            <ScrollArea className="h-[250px]">
                                {previousPages.reverse().map((page) => (
                                    <DropdownMenuItem
                                        key={page}
                                        className="cursor-pointer rounded-md p-0"
                                    >
                                        <PaginationLink
                                            key={`prev-${page}`}
                                            href={`${href}?${getSearchParams(
                                                page
                                            )}`}
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </DropdownMenuItem>
                                ))}
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null}
                {pages.map((page) => (
                    <PaginationLink
                        key={page}
                        href={`${href}?${getSearchParams(page)}`}
                        className={`${
                            currentPage === page ? "text-gray-200" : ""
                        } hidden sm:inline-flex`}
                        isActive={currentPage === page}
                    >
                        {page}
                    </PaginationLink>
                ))}
                {maxPage !== totalPages ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hidden sm:flex">
                            <PaginationEllipsis />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="min-w-fit list-none">
                            <ScrollArea className="h-[250px]">
                                {nextPages.map((page) => (
                                    <DropdownMenuItem
                                        key={`next-${page}`}
                                        className="cursor-pointer rounded-md p-0"
                                    >
                                        <PaginationLink
                                            key={`page`}
                                            href={`${href}?${getSearchParams(
                                                page
                                            )}`}
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </DropdownMenuItem>
                                ))}
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null}
                <PaginationNext
                    className={
                        currentPage === totalPages || totalPages < 1
                            ? "pointer-events-none opacity-40"
                            : null
                    }
                    href={`${
                        currentPage === totalPages || totalPages < 1
                            ? "#"
                            : `${href}?${getSearchParams(currentPage + 1)}`
                    }`}
                />
            </PaginationContent>
        </Pagination>
    );
}
