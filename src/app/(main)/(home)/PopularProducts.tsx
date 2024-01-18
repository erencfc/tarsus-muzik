import Loading from "@/app/loading";
import { fetchPopularProducts } from "@/lib/db/product";
import dynamic from "next/dynamic";

const Products = dynamic(() => import("./Products"), {
    loading: () => <Loading />,
});

export default async function PopularProducts() {
    const products = await fetchPopularProducts();

    return <Products products={products} title="Popüler Ürünler" />;
}
