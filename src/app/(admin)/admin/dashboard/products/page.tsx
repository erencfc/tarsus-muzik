import FormWrapper from "@/app/(admin)/components/FormWrapper";
import { getProductCount, getProducts } from "@/lib/db/product";
import { formatDate, formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "./DeleteButton";
import ViewButton from "@/app/(admin)/components/ViewButton";

export default async function ProductsPage({
    searchParams: { page, q },
}: {
    searchParams: { page: string; q: string };
}) {
    const currentPage = parseInt(page || "1");
    const itemsPerPage = 6;

    const products = await getProducts({ currentPage, itemsPerPage, q });
    const totalItems = await getProductCount();

    // If there are no products and we are not on the first page, redirect to the first page
    if (products.length === 0 && currentPage !== 1) {
        redirect("/admin/dashboard/products");
    }

    return (
        <FormWrapper
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            paginationHref="/admin/dashboard/products"
            inputPlaceHolder="Ürün Ara"
            buttonTitle="Yeni Ürün"
            buttonHref="/admin/dashboard/products/new"
            tableHeadings={[
                "Model",
                "Kategori / Alt Kategori",
                "Fiyat",
                "Stok",
                "Eklenme Tarihi",
                "",
            ]}
        >
            {products.length === 0 ? (
                <tr>
                    <td colSpan={6} className="text-center text-gray-400">
                        Görüntülenecek kayıt bulunamadı.
                    </td>
                </tr>
            ) : null}
            {products.map((product) => (
                <tr
                    className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30"
                    key={product.id}
                >
                    <td>
                        <Link
                            href={`/urun/${product.modelSlug}`}
                            target="_blank"
                        >
                            <div className="flex flex-row items-center gap-3">
                                <Image
                                    src={product.images[0]}
                                    width={64}
                                    height={64}
                                    alt=""
                                    className="h-16 w-16 object-contain"
                                />
                                <span>{product.model}</span>
                            </div>
                        </Link>
                    </td>

                    <td>
                        {product.Category.name}
                        {product.SubCategory
                            ? ` / ${product.SubCategory.name}`
                            : null}
                    </td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>{formatDate(product.createdAt)}</td>
                    <td>
                        <div className="flex flex-row items-center gap-3">
                            <ViewButton
                                url={`/admin/dashboard/products/${product.id}`}
                                key={product.id}
                            />
                            <DeleteButton id={product.id} />
                        </div>
                    </td>
                </tr>
            ))}
        </FormWrapper>
    );
}
