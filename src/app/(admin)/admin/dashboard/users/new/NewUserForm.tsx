"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";

import { NewUserSchema } from "@/schemas";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { newUser } from "./action";
import { Switch } from "@/components/ui/switch";

export default function NewUserForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewUserSchema>>({
        resolver: zodResolver(NewUserSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            tel: "",
            role: "USER",
            password: "",
            emailNoti: true,
            smsNoti: true,
            emailVerified: false,
        },
    });

    const onSubmit = (values: z.infer<typeof NewUserSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newUser(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return (
        <CardWrapper
            headerIcon={
                <i>
                    <UserPlusIcon width={36} height={36} />
                </i>
            }
            headerLabel="Yeni Kullanıcı Oluştur"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
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
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ad</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="mail@mail.com"
                                        type="email"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefon Numarası</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="05012345678"
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Şifre</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Kullanıcı Rolü</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="USER" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Normal Kullanıcı
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="DEALER" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Bayilik
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem
                                                    className="focus:bg-red-500"
                                                    value="ADMIN"
                                                    onClick={() => {
                                                        alert(
                                                            "BU SEÇENEĞİ SEÇEREK YENİ BİR YÖNETİCİ OLUŞTURUYORSUNUZ!"
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal text-red-500">
                                                YÖNETİCİ
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emailVerified"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border border-gray-800 p-3 shadow-sm">
                                <FormLabel>
                                    E-posta otomatik doğrulansın mı?
                                </FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-3">
                        <FormLabel className="mt-2">
                            Kampanyalardan/indirimlerden haberdar olmak için
                        </FormLabel>
                        <div className="flex flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="emailNoti"
                                render={({ field }) => (
                                    <FormItem className="flex w-1/2 flex-row items-center justify-between gap-4 rounded-lg border border-gray-800 p-3 shadow-sm">
                                        <FormLabel>
                                            E-posta bildirimleri
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="smsNoti"
                                render={({ field }) => (
                                    <FormItem className="flex w-1/2 flex-row items-center justify-between gap-4 rounded-lg border border-gray-800 p-3 shadow-sm">
                                        <FormLabel>SMS bildirimleri</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Kullanıcı Oluştur
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
