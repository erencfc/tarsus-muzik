"use client";

import { addProduct } from "@/actions/addProduct.action";
import FormSubmitButton from "@/components/FormSubmitButton";
import { formatPrice, formatSlug } from "@/lib/format";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import type { Category, Brand, Product, SubCategory } from "@prisma/client";

type TCategory = Category & {
    SubCategory: SubCategory[];
};

type TProduct = Product & {
    Category: TCategory;
    SubCategory: SubCategory;
    Brand: Brand;
};

export default function AddProductForm({
    categories,
    brands,
}: {
    categories: Category[];
    brands: Brand[];
}) {
    async function clientAction(formData: FormData) {
        const result = await addProduct(formData);

        ref.current?.reset();

        if (result.success) {
            toast.success("Ürün başarıyla eklendi.");
            if (result.data) {
                setProduct(result.data as unknown as TProduct);
            }
        } else {
            toast.error(result.error);
        }
    }

    const ref = useRef<HTMLFormElement>(null);
    const [category, setCategory] = useState<TCategory>();
    const [product, setProduct] = useState<TProduct>();

    useEffect(() => {
        return setCategory(categories[0] as TCategory);
    }, [categories]);

    if (!categories || !categories.length || !brands || !brands.length) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div>
            <form
                ref={ref}
                action={clientAction}
                className="flex flex-col gap-4"
            >
                <select
                    name="categories"
                    className="select select-bordered focus:border-transparent focus:outline-none focus:ring-2"
                    defaultValue="gitarlar"
                    onChange={(e) => {
                        const category = categories.find(
                            (category) => category.slug === e.target.value
                        );

                        setCategory(category as TCategory);
                    }}
                >
                    {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select
                    name="subCategories"
                    className="select select-bordered focus:border-transparent focus:outline-none focus:ring-2"
                >
                    {category?.SubCategory &&
                        category.SubCategory.map((subCategory) => (
                            <option
                                key={subCategory.slug}
                                value={subCategory.slug}
                            >
                                {subCategory.name}
                            </option>
                        ))}
                </select>
                <select
                    name="brands"
                    className="select select-bordered focus:border-transparent focus:outline-none focus:ring-2"
                >
                    {brands.map((brand) => (
                        <option key={brand.slug} value={brand.slug}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                <input
                    required
                    name="model"
                    placeholder="Model"
                    className="input input-bordered input-accent w-full focus:border-none focus:outline-none focus:ring-2"
                />
                <input
                    required
                    name="image"
                    placeholder="Resim URL"
                    className="input input-bordered input-accent w-full focus:border-none focus:outline-none focus:ring-2"
                />
                <input
                    required
                    name="price"
                    placeholder="Fiyat"
                    type="number"
                    className="input input-bordered input-accent w-full focus:border-none focus:outline-none focus:ring-2"
                />
                <FormSubmitButton className="btn-block text-white">
                    Add Product
                </FormSubmitButton>
            </form>

            {product && (
                <div className="flex flex-col items-center justify-center gap-4 py-10">
                    <Image
                        src={product.images[0]}
                        alt={product.model}
                        width={300}
                        height={300}
                    />
                    <p>
                        <strong>ID:</strong> {product.id}
                    </p>
                    <p>
                        <strong>Model Slug:</strong> {formatSlug(product.model)}
                    </p>
                    <br />
                    <p>
                        <strong>Marka:</strong> {product.Brand.name}
                    </p>
                    <h1>
                        <strong>Model:</strong> {product.model}
                    </h1>
                    <br />
                    <p>
                        <strong>Kategori:</strong> {product.Category.name}
                    </p>
                    <p>
                        <strong>Alt Kategori:</strong>
                        {product.SubCategory.name}
                    </p>
                    <br />
                    <p>
                        <strong>Fiyat:</strong> {formatPrice(product.price)}
                    </p>
                </div>
            )}
        </div>
    );
}
