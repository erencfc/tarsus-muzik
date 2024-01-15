import { fetchCategories } from "@/app/utils/fetchCategories";
import HamburgerMenu from "./HamburgerMenu";
// import { getCart } from "@/lib/db/cart";

export default async function HeaderMobile() {
    const categories = await fetchCategories();

    const cart = null;

    return (
        categories.length && (
            <HamburgerMenu cart={cart} categories={categories} />
        )
    );
}
