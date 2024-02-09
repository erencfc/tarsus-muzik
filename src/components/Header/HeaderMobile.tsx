import { getCategories } from "@/lib/db/category";
import HamburgerMenu from "./HamburgerMenu";
import { getCart } from "@/lib/db/cart";
import { currentUser } from "@/lib/auth";

export default async function HeaderMobile() {
    const categories = await getCategories();

    const cart = await getCart();

    const user = await currentUser();

    return categories.length ? (
        <HamburgerMenu user={user} cart={cart} categories={categories} />
    ) : null;
}
