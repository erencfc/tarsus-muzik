"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AddressSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createAddress, updateAddress } from "./action";
import { FormSuccess } from "@/components/Form/form-success";
import { FormError } from "@/components/Form/form-error";
import { Prisma } from "@prisma/client";

export default function UpdateAddressButton({
    address,
}: {
    address: Prisma.AddressGetPayload<{
        select: {
            id: true;
            active: true;
            alias: true;
            firstName: true;
            lastName: true;
            tel: true;
            details: true;
            city: true;
            district: true;
            town: true;
            zipCode: true;
            billingType: true;
            nationalId: true;
            corporateName: true;
            taxNumber: true;
            taxOffice: true;
        };
    }>;
}) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof AddressSchema>>({
        resolver: zodResolver(AddressSchema),
        defaultValues: {
            alias: address.alias || "",
            firstName: address.firstName || "",
            lastName: address.lastName || "",
            tel: address.tel || "",
            city: address.city || "",
            district: address.district || "",
            details: address.details || "",
            town: address.town || "",
            zipCode: address.zipCode || "",
            billingType: address.billingType || "INDIVIDUAL",
            nationalId: address.nationalId || "",
            corporateName: address.corporateName || "",
            taxNumber: address.taxNumber || "",
            taxOffice: address.taxOffice || "",
        },
    });

    const onSubmit = (values: z.infer<typeof AddressSchema>) => {
        setError("");
        setSuccess("");

        if (values.billingType === "INDIVIDUAL") {
            values.corporateName = "";
            values.taxNumber = "";
            values.taxOffice = "";
        } else {
            values.nationalId = "";
        }

        startTransition(() => {
            updateAddress(values, address.id).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    const billingType = form.watch("billingType");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="ml-auto w-fit text-gray-200 dark:text-gray-200"
                >
                    Düzenle
                </Button>
            </DialogTrigger>
            <DialogContent className="z-[9999] scale-90 text-gray-200 sm:max-w-[425px] sm:scale-100">
                <DialogHeader>
                    <DialogTitle>Adresi Düzenle</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col space-y-3"
                    >
                        <div className="flex w-full flex-row gap-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ad</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Ali"
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
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Soyad</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Can"
                                                type="text"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex w-full flex-row gap-6">
                            <FormField
                                control={form.control}
                                name="tel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefon</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="05123456789"
                                                type="tel"
                                                minLength={11}
                                                maxLength={11}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>İl</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="İl"
                                                type="text"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex w-full flex-row gap-6">
                            <FormField
                                control={form.control}
                                name="town"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>İlçe</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="İlçe"
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
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Semt/Mahalle</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Semt/Mahalle"
                                                type="text"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adres</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className="border-gray-800"
                                            placeholder="Cadde, sokak, site, apartman, kapı numarası gibi bilgileri giriniz"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex w-full flex-row gap-6">
                            <FormField
                                control={form.control}
                                name="alias"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adres Başlığı</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Ev, iş yeri, vs."
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
                                name="zipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Posta Kodu</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Posta Kodu"
                                                type="number"
                                                disabled={isPending}
                                                className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="billingType"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Fatura Türü</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-x-3"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        disabled={isPending}
                                                        value="INDIVIDUAL"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Bireysel
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        disabled={isPending}
                                                        value="CORPORATE"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Kurumsal
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {billingType === "INDIVIDUAL" ? (
                            <FormField
                                control={form.control}
                                name="nationalId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            T.C Kimlik Numarası
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="12345678910"
                                                minLength={11}
                                                maxLength={11}
                                                type="text"
                                                disabled={isPending}
                                                className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <>
                                <FormField
                                    control={form.control}
                                    name="corporateName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kurum Adı</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Kurum Adı"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="taxNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Vergi Numarası
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="1234567890"
                                                        minLength={10}
                                                        maxLength={10}
                                                        type="text"
                                                        disabled={isPending}
                                                        className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="taxOffice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Vergi Dairesi
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Vergi Dairesi"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </>
                        )}
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button type="submit">Kaydet</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
