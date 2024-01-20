import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AddProductToDealerForm from "./AddProductToDealerForm";
import { searchProducts } from "@/lib/db/product";
import { Prisma, Product } from "@prisma/client";

export default async function AddProductToDealer({
    params: { id },
    searchParams: { q },
}: {
    params: { id: string };
    searchParams: { q?: string };
}) {
    let products: Prisma.ProductGetPayload<{
        include: { Category: true; SubCategory: true; Brand: true };
    }>[] = [];
    if (q) products = await searchProducts(q);

    return (
        <div className="flex flex-col gap-2">
            <Link href={`/admin/dashboard/dealers/${id}`} className="w-fit">
                <Button variant="outline" size="sm">
                    <i>
                        <ArrowLeftIcon width={20} height={20} />
                    </i>
                    <span className="ml-2">Geri Dön</span>
                </Button>
            </Link>
            <AddProductToDealerForm products={products} q={q} dealerId={id} />
        </div>
    );
}
