import Loading from "@/app/loading";
import { fetchNewProducts } from "@/lib/db/product";
import dynamic from "next/dynamic";

const Products = dynamic(() => import("./Products"), {
    loading: () => <Loading />,
});

export default async function NewProducts() {
    const products = await fetchNewProducts();

    return <Products products={products} title="Yeni Eklenen Ürünler" />;
}
