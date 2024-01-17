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
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { newUser } from "./action";

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
                    {/* 
                        //! TODO: Rol seçimi ve sms/e-posta bildirimi için checkbox'lar eklenecek
                    */}

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Kullanıcıyı Oluştur
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
