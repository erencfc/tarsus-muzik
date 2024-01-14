import { cache } from "react";
import { fetchCategories } from "../utils/fetchCategories";
import Categories from "./Categories";

const getCategories = cache(async () => {
    const categories = await fetchCategories();

    return categories;
});

export default async function CategoriesComponent() {
    const categories = await getCategories();

    return <Categories categories={categories} />;
}
