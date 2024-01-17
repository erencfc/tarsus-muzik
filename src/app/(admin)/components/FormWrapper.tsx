import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import PaginationComponent from "./Pagination";

type FormWrapperProps = {
    children: React.ReactNode;
    className?: string;

    inputPlaceHolder: string;
    buttonTitle: string;
    buttonHref: string;
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
    return (
        <div
            className={`rounded-lg border border-gray-800 bg-gray-900 p-4 ${className}`}
        >
            <div className="mb-4 mt-2 flex w-full flex-row justify-between">
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
                    />
                </div>
                <Link
                    href={buttonHref}
                    className="btn btn-sm border-none bg-primary/70 text-white hover:bg-primary/40"
                >
                    {buttonTitle}
                </Link>
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
