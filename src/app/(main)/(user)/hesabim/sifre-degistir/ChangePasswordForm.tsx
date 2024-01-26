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
import { Checkbox } from "@/components/ui/checkbox";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export default function ChangePasswordForm({ userId }: { userId: string }) {
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
    });
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
                    <FormLabel className="py-2 text-center text-xl font-semibold text-gray-200">
                        Şifre Değiştir
                    </FormLabel>
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mevcut Şifre</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            placeholder="Mevcut Şifre"
                                            id="currentPassword"
                                            type={
                                                showPasswords.currentPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            disabled={isPending}
                                        />

                                        <Button
                                            variant="link"
                                            className=" absolute right-0 top-0 text-gray-300 underline dark:text-gray-300"
                                            type="button"
                                            onClick={() => {
                                                setShowPasswords({
                                                    ...showPasswords,
                                                    currentPassword:
                                                        !showPasswords.currentPassword,
                                                });
                                            }}
                                        >
                                            {showPasswords.currentPassword ? (
                                                <EyeClosedIcon
                                                    width={24}
                                                    height={24}
                                                />
                                            ) : (
                                                <EyeOpenIcon
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                        </Button>
                                    </div>
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
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            placeholder="Yeni Şifre"
                                            id="password"
                                            type={
                                                showPasswords.newPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            disabled={isPending}
                                        />

                                        <Button
                                            variant="link"
                                            className=" absolute right-0 top-0 text-gray-300 underline dark:text-gray-300"
                                            type="button"
                                            onClick={() => {
                                                setShowPasswords({
                                                    ...showPasswords,
                                                    newPassword:
                                                        !showPasswords.newPassword,
                                                });
                                            }}
                                        >
                                            {showPasswords.newPassword ? (
                                                <EyeClosedIcon
                                                    width={24}
                                                    height={24}
                                                />
                                            ) : (
                                                <EyeOpenIcon
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button type="submit" disabled={isPending}>
                        Kaydet
                    </Button>
                </form>
            </Form>
        </div>
    );
}
