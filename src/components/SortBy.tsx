"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortBy() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="justify-end">
            <Select
                defaultValue="yeni"
                onValueChange={(value) => {
                    const newSearchParams = new URLSearchParams(searchParams);

                    if (value === "yeni") {
                        newSearchParams.delete("sirala");
                    } else {
                        newSearchParams.set("sirala", value);
                    }

                    router.push(`${pathname}?${newSearchParams.toString()}`, {
                        scroll: true,
                    });
                }}
            >
                <SelectTrigger className="w-fit dark:border-gray-300 dark:bg-gray-50 dark:focus:ring-0">
                    <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent className="text-gray-800 dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                    <SelectGroup>
                        <SelectItem value="yeni">En Yeni</SelectItem>
                        <SelectItem value="eski">En Eski</SelectItem>
                        <SelectItem value="dusuk">En Düşük Fiyat</SelectItem>
                        <SelectItem value="yuksek">En Yüksek Fiyat</SelectItem>
                        <SelectItem value="az">Ürün Adı A-Z</SelectItem>
                        <SelectItem value="za">Ürün Adı Z-A</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
