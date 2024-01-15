"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import Link from "next/link";

import { RegisterSchema } from "@/schemas";
import { DEFAULT_LOGIN_PATH } from "@/routes";
import { register } from "./action";

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

export default function RegisterForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            tel: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return (
        <CardWrapper
            backButtonHref={DEFAULT_LOGIN_PATH}
            backButtonLabel="Zaten Üye Misiniz?"
            headerLabel="Kayıt Ol"
            headerIcon={
                <i>
                    <UserPlusIcon width={20} height={20} />
                </i>
            }
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                >
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adınız</FormLabel>
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
                                    <FormLabel>Soyadınız</FormLabel>
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
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
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
                                    <FormLabel>Telefon Numaranız</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="05012345678"
                                            type="text"
                                            disabled={isPending}
                                            maxLength={11}
                                            minLength={11}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-4">
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
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Şifre (Tekrar)</FormLabel>
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="mt-3 w-full"
                        disabled={isPending}
                    >
                        Kayıt Ol
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
