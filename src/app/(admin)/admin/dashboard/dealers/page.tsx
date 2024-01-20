import FormWrapper from "@/app/(admin)/components/FormWrapper";
import { getDealerCount, getDealers } from "@/lib/db/dealer";
import { formatDate } from "@/lib/format";
import { redirect } from "next/navigation";
import DeleteButton from "./DeleteButton";
import ViewButton from "@/app/(admin)/components/ViewButton";

export default async function DealersPage({
    searchParams: { page, q },
}: {
    searchParams: { page: string; q: string };
}) {
    const currentPage = parseInt(page || "1");
    const itemsPerPage = 6;

    const dealers = await getDealers({ currentPage, itemsPerPage, q });
    const totalItems = await getDealerCount();

    // If there are no dealers and we are not on the first page, redirect to the first page
    if (dealers.length === 0 && currentPage !== 1) {
        redirect("/admin/dashboard/dealers");
    }

    return (
        <FormWrapper
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            paginationHref="/admin/dashboard/dealers"
            inputPlaceHolder="Bayi Ara"
            tableHeadings={[
                "Ad Soyad",
                "Email",
                "Telefon",
                "İndirimli Ürün Sayısı",
                "Oluşturulma Tarihi",
                "",
            ]}
        >
            {dealers.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center text-gray-400">
                        Görüntülenecek kayıt bulunamadı.
                    </td>
                </tr>
            )}
            {dealers.map((dealer) => (
                <tr
                    className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30"
                    key={dealer.id}
                >
                    <td>
                        {dealer.User.firstName} {dealer.User.lastName}
                    </td>
                    <td>{dealer.User.email}</td>
                    <td>{dealer.User.tel}</td>
                    <td>{dealer._count.prices}</td>
                    <td>{formatDate(dealer.createdAt)}</td>
                    <td>
                        <div className="flex flex-row gap-3">
                            <ViewButton
                                url={`/admin/dashboard/dealers/${dealer.id}`}
                                key={dealer.id}
                            />
                            <DeleteButton id={dealer.id} />
                        </div>
                    </td>
                </tr>
            ))}
        </FormWrapper>
    );
}
