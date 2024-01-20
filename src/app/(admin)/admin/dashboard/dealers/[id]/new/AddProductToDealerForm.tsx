"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { AddProductToDealerSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Prisma, Product } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { addProductToDealer } from "./action";
import { FormError } from "@/components/Form/form-error";
import { FormSuccess } from "@/components/Form/form-success";

type AddProductToDealerForm = {
    products:
        | Prisma.ProductGetPayload<{
              include: { Category: true; SubCategory: true; Brand: true };
          }>[]
        | null;
    dealerId: string;
    q?: string;
};

export default function AddProductToDealerForm({
    products,
    dealerId,
    q,
}: AddProductToDealerForm) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm<z.infer<typeof AddProductToDealerSchema>>({
        resolver: zodResolver(AddProductToDealerSchema),
        defaultValues: {
            dealerId,
            productId: "",
            price: "",
        },
    });

    const onSubmit = (values: z.infer<typeof AddProductToDealerSchema>) => {
        startTransition(() => {
            addProductToDealer(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    const handleSearch = useDebouncedCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
                e.target.value.length > 2 && params.set("q", e.target.value);
            } else {
                params.delete("q");
            }

            router.replace(`${pathname}?${params.toString()}`);
        },
        1000,
        {
            maxWait: 5000,
        }
    );
    const productId = form.watch("productId");

    const product = products.find((product) => product.id === productId);

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
                    <div className="flex flex-col gap-3">
                        <Label>Ürün Modeli Ara</Label>
                        <Input
                            placeholder="Ürün Modeli Ara..."
                            type="text"
                            defaultValue={q || ""}
                            disabled={isPending}
                            onChange={handleSearch}
                        />
                    </div>
                    {products.length > 0 ? (
                        <>
                            <FormField
                                control={form.control}
                                name="productId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ürün Modeli</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={
                                                products.length === 0 ||
                                                isPending
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Ürün Seçin" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem
                                                        value={product.id}
                                                        key={product.id}
                                                    >
                                                        {product.model}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {product && (
                                <>
                                    <div className="flex flex-row gap-4">
                                        <Image
                                            alt=""
                                            src={product.images[0]}
                                            width={200}
                                            height={200}
                                        />
                                        <div className="flex flex-col justify-center gap-4">
                                            <p className="text-gray-300">
                                                <span className="text-sm text-gray-400">
                                                    Model:
                                                </span>
                                                <span className="ml-1">
                                                    {product.model}
                                                </span>
                                            </p>
                                            <p className="text-gray-300">
                                                <span className="text-sm text-gray-400">
                                                    Marka:
                                                </span>
                                                <span className="ml-1">
                                                    {product.Brand.name}
                                                </span>
                                            </p>
                                            <p className="text-gray-300">
                                                <span className="text-sm text-gray-400">
                                                    Kategori:
                                                </span>
                                                <span className="ml-1">
                                                    {product.Category.name} /{" "}
                                                    {product.SubCategory.name}
                                                </span>
                                            </p>
                                            <p className="text-gray-300">
                                                <span className="text-sm text-gray-400">
                                                    Adet Fiyatı:
                                                </span>
                                                <span className="ml-1">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    İndirimli Fiyat
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="İndirimli Fiyat"
                                                        type="number"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">
                                        İndirimli Ürünü Ekle
                                    </Button>
                                </>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-gray-500">
                            {q
                                ? "Ürün bulunamadı."
                                : "Lütfen ürün modeli giriniz. (En az 3 karakter)"}
                        </p>
                    )}
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </form>
            </Form>
        </CardWrapper>
    );
}
