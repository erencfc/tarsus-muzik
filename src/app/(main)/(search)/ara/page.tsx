import { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SearchProducts from "./SearchProducts";

type SearchPageProps = {
    searchParams: {
        q: string;
        kategori: string;
        sayfa: string;
        sirala: string;
        marka: string | null;
        min: string | null;
        max: string | null;
    };
};

export default function SearchPage({
    searchParams: { q, kategori, sayfa, sirala, marka, min, max },
}: SearchPageProps) {
    const currentPage = parseInt(sayfa || "1");
    const itemsPerPage = 12;

    return (
        <div className="mx-auto max-w-6xl py-8">
            <Suspense fallback={<LoadingSkeleton />}>
                <SearchProducts
                    q={q}
                    category={kategori?.split(",") || []}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    brands={marka?.split(",") || []}
                    min={min ? parseInt(min) : null}
                    max={max ? parseInt(max) : null}
                    sort={sirala}
                />
            </Suspense>
        </div>
    );
}
