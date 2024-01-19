"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import PaginationComponent from "./Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

type FormWrapperProps = {
    children: React.ReactNode;
    className?: string;

    inputPlaceHolder: string;
    buttonTitle?: string;
    buttonHref?: string;
    tableHeadings: string[];

    paginationHref: string;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
};

export default function FormWrapper({
    children,
    className,

    inputPlaceHolder,
    buttonTitle,
    buttonHref,
    tableHeadings,

    paginationHref,
    currentPage,
    itemsPerPage,
    totalItems,
}: FormWrapperProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
                e.target.value.length > 2 && params.set("q", e.target.value);
            } else {
                params.delete("q");
            }

            router.replace(`${pathname}?${params.toString()}`);
        },
        600,
        {
            maxWait: 5000,
        }
    );

    return (
        <div
            className={`rounded-lg border border-gray-800 bg-gray-900 p-4 ${
                className || ""
            }`}
        >
            <div className="mb-4 mt-2 flex w-full flex-row justify-between">
                <div className="flex flex-row items-center gap-1">
                    <div className="relative">
                        {/*
                        //! TODO: Search
                        */}
                        <i className="absolute left-2 top-1.5">
                            <MagnifyingGlassIcon width={20} height={20} />
                        </i>
                        <input
                            type="text"
                            placeholder={inputPlaceHolder}
                            className="input input-bordered h-8 w-full max-w-full rounded-lg border-none bg-gray-700/40 px-9 text-sm placeholder-gray-500 outline-none focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={handleSearch}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        className="group"
                        onClick={() => {
                            const icon = document.querySelector("#reload-icon");
                            icon.classList.add("rotate-180");
                            setTimeout(() => {
                                icon.classList.remove("rotate-180");
                            }, 200);
                            router.refresh();
                        }}
                    >
                        <i
                            id="reload-icon"
                            className="transition-all duration-200 group-hover:scale-110"
                        >
                            <ArrowPathIcon width={20} height={20} />
                        </i>
                    </Button>
                </div>
                {buttonHref && buttonTitle && (
                    <Link
                        href={buttonHref}
                        className="btn btn-sm border-none bg-primary/70 text-white hover:bg-primary/40"
                    >
                        {buttonTitle}
                    </Link>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-white">
                            {tableHeadings.map((heading, index) => (
                                <th key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>

            <div className="my-4">
                <PaginationComponent
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    href={paginationHref}
                />
            </div>
        </div>
    );
}
