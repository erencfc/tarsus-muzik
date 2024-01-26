"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCallback, useEffect, useState, useTransition } from "react";

import { NewProductSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Form/form-error";
import { FormSuccess } from "@/components/Form/form-success";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { newProduct, uploadImage } from "./action";
import { Brand, Prisma } from "@prisma/client";
import { fetchCategories } from "@/app/utils/fetchCategories";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fetchBrands } from "@/app/utils/fetchBrands";
import { formatSlug } from "@/lib/format";
import Editor from "@/components/ui/editor/editor";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import DeleteImageButton from "./DeleteImageButton";

export default function NewProductForm() {
    const [uploading, setUploading] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [url, setUrl] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const [categories, setCategories] = useState<
        Prisma.CategoryGetPayload<{ include: { SubCategory: true } }>[]
    >([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const onLoad = useCallback(() => {
        if (categories.length > 0 && brands.length > 0) return;

        Promise.all([fetchCategories(), fetchBrands()])
            .then(([categoriesData, brandsData]) => {
                setCategories(categoriesData);
                setBrands(brandsData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [brands.length, categories.length]);

    useEffect(() => {
        onLoad();
    }, [onLoad]);

    const form = useForm<z.infer<typeof NewProductSchema>>({
        resolver: zodResolver(NewProductSchema),
        defaultValues: {
            model: "",
            price: "",
            newCategory: "",
            newSubCategory: "",
            newBrand: "",
            description: "",
            deliveryTimeMaxDay: "",
            deliveryTimeMinDay: "",
            stock: "",
            images: [],
        },
    });

    useEffect(() => {
        form.setValue("images", images);
    }, [form, images]);

    const selectedCategory = form.watch("category");
    const selectedSubCategory = form.watch("subCategory");
    const selectedBrand = form.watch("brand");

    useEffect(() => {
        if (
            !selectedCategory ||
            !selectedSubCategory ||
            selectedSubCategory === "newSubCategory"
        )
            return;

        if (selectedCategory !== "newCategory") {
            form.resetField("newCategory");
        }
        if (selectedSubCategory !== "newSubCategory") {
            form.resetField("newSubCategory");
        }
        if (selectedBrand !== "newBrand") {
            form.resetField("newBrand");
        }

        const category = categories.find((c) => c.id === selectedCategory);
        const subCategory = category?.SubCategory.find(
            (sub) => sub.id === selectedSubCategory
        );

        if (subCategory) return;

        if (selectedSubCategory !== "newSubCategory") {
            form.resetField("subCategory");
        } else {
            form.setValue("subCategory", "newSubCategory");
        }
    }, [
        categories,
        form,
        selectedBrand,
        selectedCategory,
        selectedSubCategory,
    ]);

    const onSubmit = (values: z.infer<typeof NewProductSchema>) => {
        if (values.images.length === 0) {
            form.setError("images", {
                message: "En az bir adet resim eklemelisiniz.",
                type: "required",
            });
            setError("En az bir adet resim eklemelisiniz.");
            return;
        }

        startTransition(() => {
            newProduct(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
                setUrl(data?.productUrl);
            });
        });
    };

    const handleUploadImage = async (file: File) => {
        setUploading(true);
        try {
            if (!file) return;
            const formData = new FormData();
            formData.append("image", file);
            formData.append("modelSlug", formatSlug(form.getValues("model")));

            const data = await uploadImage(formData);

            const { success, error, imageUrl } = data;

            if (success) {
                toast.success(success);
                setImages([...images, imageUrl]);
            }
            if (error) toast.error(error);
        } catch (error) {
            toast.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <CardWrapper
            headerIcon={
                <i>
                    <SquaresPlusIcon width={36} height={36} />
                </i>
            }
            headerLabel="Yeni Ürün Ekle"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={
                                        categories.length === 0 || isPending
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Kategori Seçin" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="newCategory">
                                            Yeni Kategori Ekle
                                        </SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem
                                                value={category.id}
                                                key={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {selectedCategory === "newCategory" && (
                        <FormField
                            control={form.control}
                            name="newCategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Yeni Kategori Adı</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Yeni Kategori Adı"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="subCategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Alt Kategori</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={!selectedCategory || isPending}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Alt Kategori Seçin" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="newSubCategory">
                                            Yeni Alt Kategori Ekle
                                        </SelectItem>
                                        {categories
                                            .find(
                                                (c) => c.id === selectedCategory
                                            )
                                            ?.SubCategory.map((subCategory) => (
                                                <SelectItem
                                                    value={subCategory.id}
                                                    key={subCategory.id}
                                                >
                                                    {subCategory.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {selectedSubCategory === "newSubCategory" && (
                        <FormField
                            control={form.control}
                            name="newSubCategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Yeni Alt Kategori Adı</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Yeni Alt Kategori Adı"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Marka</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={brands.length === 0 || isPending}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Marka Seçin" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="newBrand">
                                            Yeni Marka Ekle
                                        </SelectItem>
                                        {brands.map((brand) => (
                                            <SelectItem
                                                value={brand.id}
                                                key={brand.id}
                                            >
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {selectedBrand === "newBrand" && (
                        <FormField
                            control={form.control}
                            name="newBrand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Yeni Marka Adı</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Yeni Marka Adı"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Ürün Modeli"
                                        type="text"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Açıklama</FormLabel>
                                <FormControl>
                                    <Editor
                                        content={field.value}
                                        onChange={field.onChange}
                                        placeholder="Açıklama..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fiyat</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Ürün Fiyatı"
                                        type="number"
                                        disabled={isPending}
                                        min={0}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row items-end justify-end gap-4">
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Stok Sayısı</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Stok Sayısı"
                                            type="number"
                                            disabled={isPending}
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deliveryTimeMinDay"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        Tahmini kargoya verme (min)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Gün"
                                            type="number"
                                            disabled={isPending}
                                            min={1}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deliveryTimeMaxDay"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        Tahmini kargoya verme (max)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Gün"
                                            type="number"
                                            disabled={isPending}
                                            min={1}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {images.length > 0 && (
                            <div className="mt-2 flex flex-col gap-2">
                                <Label>Eklenen Resimler</Label>
                                <div className="mt-3 flex flex-col gap-6">
                                    {images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-row items-center justify-between gap-2"
                                        >
                                            <Link href={image}>
                                                <div className="flex flex-row items-center gap-2">
                                                    <Image
                                                        src={`${image}`}
                                                        width={64}
                                                        height={64}
                                                        alt=""
                                                        className="h-16 w-16 rounded-md object-cover"
                                                    />
                                                    <p className="text-sm">
                                                        {formatSlug(image)}
                                                    </p>
                                                </div>
                                            </Link>
                                            <DeleteImageButton
                                                images={images}
                                                setImages={setImages}
                                                index={index}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    {url && (
                        <Link href={url} passHref target="_blank">
                            <Button
                                variant="default"
                                type="button"
                                className="w-full"
                            >
                                Ürüne Git
                            </Button>
                        </Link>
                    )}

                    <div className="flex w-full flex-row gap-4 ">
                        <Button
                            variant="default"
                            type="button"
                            className="w-full p-0"
                            disabled={uploading}
                        >
                            <Label
                                htmlFor="input-file"
                                className="w-full cursor-pointer p-4"
                            >
                                Resim Yükle
                            </Label>
                            <Input
                                id="input-file"
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                onChange={async ({ target }) => {
                                    if (target.files) {
                                        const file = target.files[0];
                                        if (file) {
                                            await handleUploadImage(file);
                                        }
                                    }
                                }}
                            />
                        </Button>

                        {/* <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="ml-auto w-full bg-[#025A71]"
                                >
                                    Resim Ekle
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="text-white/90  sm:max-w-[525px]">
                                <DialogHeader className="flex flex-col gap-2">
                                    <DialogTitle>Resim Ekle</DialogTitle>
                                    <DialogDescription>
                                        Resim eklemek için resim URL&apos;sini
                                        aşağıya girin ve ekle butonuna basın.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="mt-2 flex flex-col gap-3 text-gray-400">
                                    <Label htmlFor="url">Resim URL</Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        className="col-span-3"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const input =
                                                document.getElementById(
                                                    "url"
                                                ) as HTMLInputElement;
                                            if (input.value) {
                                                setImages([
                                                    ...images,
                                                    input.value,
                                                ]);
                                                input.value = "";
                                                toast(
                                                    "Resim başarıyla eklendi.",
                                                    {
                                                        icon: (
                                                            <i>
                                                                <CheckBadgeIcon
                                                                    width={24}
                                                                    height={24}
                                                                    className="text-green-500"
                                                                />
                                                            </i>
                                                        ),
                                                    }
                                                );
                                            } else {
                                                input.focus();
                                                toast(
                                                    "Resim URL'si boş olamaz.",
                                                    {
                                                        icon: (
                                                            <i>
                                                                <ExclamationTriangleIcon
                                                                    width={24}
                                                                    height={24}
                                                                    className="text-red-500"
                                                                />
                                                            </i>
                                                        ),
                                                    }
                                                );
                                            }
                                        }}
                                    >
                                        Ekle
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog> */}
                        <Button
                            type="submit"
                            variant="ghost"
                            className="w-full bg-teal-700"
                            disabled={isPending}
                        >
                            Ürünü Ekle
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    );
}
