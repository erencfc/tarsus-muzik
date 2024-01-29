import { FormError } from "@/components/Form/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "sonner";

import { Role } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { getDealerPrices, getDealerPricesCount } from "@/lib/db/dealer";
import { redirect } from "next/navigation";
import FormWrapper from "@/app/(admin)/components/FormWrapper";
import Link from "next/link";
import Image from "next/image";
import { formatDate, formatPrice } from "@/lib/format";
import DeleteButton from "./DeleteButton";

export default async function DealerDetails({
    id,
    page,
    q,
}: {
    id: string;
    page: string;
    q: string;
}) {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return (
            <FormError message="Bu sayfayı görüntülemek için yetkiniz yok." />
        );
    }

    const currentPage = parseInt(page || "1");
    const itemsPerPage = 6;

    const dealerPrices = await getDealerPrices({
        id,
        currentPage,
        itemsPerPage,
        q,
    });
    const totalItems = await getDealerPricesCount(id);

    // If there are no dealer prices and we are not on the first page, redirect to the first page
    if (dealerPrices.length === 0 && currentPage !== 1) {
        redirect(`/admin/dashboard/dealers/${id}`);
    }

    return (
        <FormWrapper
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            paginationHref={`/admin/dashboard/dealers/${id}`}
            inputPlaceHolder="İndirimli Ürün Ara"
            buttonTitle="Yeni İndirimli Ürün"
            buttonHref={`/admin/dashboard/dealers/${id}/new`}
            tableHeadings={[
                "Model",
                "Kategori / Alt Kategori",
                "Normal Fiyat",
                "Bayi Fiyatı",
                "İndirim Oluşturma Tarihi",
                "",
            ]}
        >
            {dealerPrices.length === 0 ? (
                <tr>
                    <td colSpan={6} className="text-center text-gray-400">
                        Görüntülenecek kayıt bulunamadı.
                    </td>
                </tr>
            ) : null}
            {dealerPrices.map((dealerPrice) => (
                <tr
                    className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30"
                    key={dealerPrice.id}
                >
                    <td>
                        <Link
                            href={`/urun/${dealerPrice.Product.modelSlug}`}
                            target="_blank"
                        >
                            <div className="flex flex-row items-center gap-3">
                                <Image
                                    src={dealerPrice.Product.images[0]}
                                    width={64}
                                    height={64}
                                    alt=""
                                    className="h-16 w-16 object-contain"
                                />
                                <span
                                    className="line-clamp-1"
                                    title={dealerPrice.Product.model}
                                >
                                    {dealerPrice.Product.model}
                                </span>
                            </div>
                        </Link>
                    </td>

                    <td>
                        {dealerPrice.Product.Category.name}
                        {dealerPrice.Product.SubCategory
                            ? ` / ${dealerPrice.Product.SubCategory.name}`
                            : null}
                    </td>
                    <td>{formatPrice(dealerPrice.Product.price)}</td>
                    <td>
                        {formatPrice(dealerPrice.price)}{" "}
                        <span className="text-green-500">
                            (
                            {Math.round(
                                (dealerPrice.price /
                                    dealerPrice.Product.price) *
                                    100 -
                                    100
                            )}
                            %)
                        </span>
                    </td>
                    <td>{formatDate(dealerPrice.createdAt)}</td>
                    <td>
                        <div className="flex flex-row items-center gap-3">
                            <Button variant="outline">İncele</Button>
                            <DeleteButton id={dealerPrice.id} />
                        </div>
                    </td>
                </tr>
            ))}
        </FormWrapper>
    );
}
