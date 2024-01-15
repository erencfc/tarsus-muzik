"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
import { DEFAULT_FORGOT_PASSWORD_PATH, DEFAULT_REGISTER_PATH } from "@/routes";
import { login } from "./action";

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
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return (
        <CardWrapper
            headerIcon={
                <i>
                    <ArrowRightEndOnRectangleIcon width={20} height={20} />
                </i>
            }
            headerLabel="Giriş Yap"
            backButtonLabel="Hesabınız mı yok?"
            backButtonHref={DEFAULT_REGISTER_PATH}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                >
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
                                <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className="px-0 font-normal"
                                >
                                    <Link href={DEFAULT_FORGOT_PASSWORD_PATH}>
                                        <p className="text-ellipsis text-[13px] text-gray-300/80">
                                            Şifremi Unuttum
                                        </p>
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Giriş Yap
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
