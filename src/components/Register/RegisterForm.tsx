"use client";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
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
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { register } from "@/app/(main)/(auth)/register/action";
import { useState, useTransition } from "react";
import Link from "next/link";
import { DEFAULT_LOGIN_PATH } from "@/routes";

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
        <div className="flex min-h-[450px] flex-col items-center bg-gray-800 pb-10 pt-4 text-white">
            <h1 className="p-5 text-white">Kayıt Ol</h1>
            <div className="relative">
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
                                                placeholder="Adınız"
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
                                                placeholder="Soyadınız"
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
                        <Link href={DEFAULT_LOGIN_PATH} className="mx-auto">
                            <p className="text-ellipsis text-[13px] text-gray-300/80 underline transition-colors duration-100 ease-in-out  hover:text-accent">
                                Zaten üye misiniz?
                            </p>
                        </Link>
                    </form>
                </Form>
            </div>
        </div>
    );
}
