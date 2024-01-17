import FormWrapper from "@/app/(admin)/components/FormWrapper";
import PaginationComponent from "@/app/(admin)/components/Pagination";
import { getProductCount, getProducts } from "@/lib/db/product";
import { formatDate, formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProductsPage({
    searchParams: { page },
}: {
    searchParams: { page: string };
}) {
    const currentPage = parseInt(page || "1");
    const itemsPerPage = 12;

    const products = await getProducts({ currentPage, itemsPerPage });
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
                        {product.SubCategory &&
                            ` / ${product.SubCategory.name}`}
                    </td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>{formatDate(product.createdAt)}</td>
                    <td>
                        <div className="flex flex-row gap-3">
                            <button className="btn btn-sm w-16 border-none bg-teal-700 text-white hover:bg-teal-700/70">
                                İncele
                            </button>
                            <button className="btn btn-sm w-16 border-none bg-red-500 text-white hover:bg-red-800/70">
                                Sil
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </FormWrapper>
    );
}
