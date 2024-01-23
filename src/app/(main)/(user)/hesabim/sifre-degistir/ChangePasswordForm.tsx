"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { UpdatePasswordSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Form/form-error";
import { FormSuccess } from "@/components/Form/form-success";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updatePassword } from "./action";

export default function ChangePasswordForm({ userId }: { userId: string }) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
        resolver: zodResolver(UpdatePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            updatePassword(values, userId).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return (
        <div className="mx-auto max-w-[400px] rounded-lg bg-gray-950 p-4 text-gray-300">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-3"
                >
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mevcut Şifre</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Mevcut Şifre"
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
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Yeni Şifre</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Yeni Şifre"
                                        type="password"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button type="submit">Kaydet</Button>
                </form>
            </Form>
        </div>
    );
}
