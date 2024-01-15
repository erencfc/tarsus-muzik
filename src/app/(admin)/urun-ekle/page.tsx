"use client";

import { fetchCategories } from "../../utils/fetchCategories";
import AddProductForm from "@/components/Forms/AddProductForm";
import { useEffect, useState } from "react";
import { fetchBrands } from "../../utils/fetchBrands";
import type { Category, Brand } from "@prisma/client";

// export const metadata = {
//     title: "Ürün Ekle - Tarsus Müzik Market",
// };

export default function AddProductPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        (async () => {
            await fetchCategories().then((data) => setCategories(data));
            await fetchBrands().then((data) => setBrands(data));
        })();
    }, []);

    return (
        <div>
            <AddProductForm categories={categories} brands={brands} />
        </div>
    );
}
