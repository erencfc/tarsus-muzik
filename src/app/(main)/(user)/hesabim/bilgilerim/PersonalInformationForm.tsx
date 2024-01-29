"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChangeEvent, useState, useTransition } from "react";

import { PersonalInformationSchema } from "@/schemas";

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
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UserPayload } from "@/types/UserPayload";
import { updatePersonalInformation } from "./action";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PersonalInformationForm({
    user,
}: {
    user: UserPayload;
}) {
    const [changedInputs, setChangedInputs] = useState<string[]>([]);

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [tel, setTel] = useState(user.tel);
    const [emailNoti, setEmailNoti] = useState(user.emailNoti);
    const [smsNoti, setSmsNoti] = useState(user.smsNoti);

    const form = useForm<z.infer<typeof PersonalInformationSchema>>({
        resolver: zodResolver(PersonalInformationSchema),
        defaultValues: {
            firstName,
            lastName,
            email,
            tel,
            emailNoti,
            smsNoti,
        },
    });

    const onSubmit = () => {
        const values: z.infer<typeof PersonalInformationSchema> = {
            firstName,
            lastName,
            email,
            tel,
            emailNoti,
            smsNoti,
        };
        setError("");
        setSuccess("");

        startTransition(() => {
            updatePersonalInformation(values, user).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);

                if (data.success) {
                    setChangedInputs([]);
                }
            });
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const isValueChanged = e.target.value !== user[name];

        if (!isValueChanged) {
            setChangedInputs(changedInputs.filter((input) => input !== name));
        } else {
            if (!changedInputs.includes(name)) {
                setChangedInputs([...changedInputs, name]);
            }
        }
    };

    return (
        <div className="flex justify-center">
            <CardWrapper
                className="flex min-w-[320px] max-w-[320px] flex-col items-center justify-center md:max-w-none"
                headerIcon={
                    <i>
                        <UserCircleIcon width={36} height={36} />
                    </i>
                }
                headerLabel="Kişisel Bilgilerim"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col items-center space-y-5 md:w-[650px] md:items-stretch"
                    >
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Adınız</FormLabel>{" "}
                                    {changedInputs.includes("firstName") ? (
                                        <span className="text-xs font-semibold text-red-400">
                                            *
                                        </span>
                                    ) : null}
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={firstName}
                                            type="text"
                                            disabled={isPending}
                                            onChange={(e) => {
                                                setFirstName(e.target.value);
                                                handleChange(e);
                                            }}
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
                                <FormItem className="w-full">
                                    <FormLabel>Soyadınız</FormLabel>{" "}
                                    {changedInputs.includes("lastName") ? (
                                        <span className="text-xs font-semibold text-red-400">
                                            *
                                        </span>
                                    ) : null}
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={lastName}
                                            type="text"
                                            disabled={isPending}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                                handleChange(e);
                                            }}
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
                                <FormItem className="w-full">
                                    <FormLabel>Email Adresiniz</FormLabel>{" "}
                                    {changedInputs.includes("email") ? (
                                        <span className="text-xs font-semibold text-red-400">
                                            *
                                        </span>
                                    ) : null}
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={email}
                                            type="email"
                                            disabled={isPending}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                handleChange(e);
                                            }}
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
                                <FormItem className="w-full">
                                    <FormLabel>Telefon Numaranız</FormLabel>{" "}
                                    {changedInputs.includes("tel") ? (
                                        <span className="text-xs font-semibold text-red-400">
                                            *
                                        </span>
                                    ) : null}
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={tel}
                                            type="text"
                                            disabled={isPending}
                                            onChange={(e) => {
                                                setTel(e.target.value);
                                                handleChange(e);
                                            }}
                                            minLength={11}
                                            maxLength={11}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full flex-col gap-2">
                            <Label>
                                Kampanyalardan/indirimlerden haberdar olmak için
                            </Label>
                            <div className="flex w-full flex-col gap-4 sm:flex-row">
                                <FormField
                                    control={form.control}
                                    name="emailNoti"
                                    render={({ field }) => (
                                        <FormItem className="flex w-full flex-row items-center justify-between gap-4 rounded-lg border border-gray-800 p-3 shadow-sm">
                                            <FormLabel className="flex gap-1">
                                                E-posta bildirimleri
                                                <span
                                                    className={`text-xs font-semibold text-red-400 ${
                                                        !changedInputs.includes(
                                                            "emailNoti"
                                                        )
                                                            ? "invisible"
                                                            : null
                                                    }`}
                                                >
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={(e) => {
                                                        setEmailNoti(e);

                                                        if (
                                                            changedInputs.includes(
                                                                "emailNoti"
                                                            )
                                                        ) {
                                                            setChangedInputs(
                                                                changedInputs.filter(
                                                                    (input) =>
                                                                        input !==
                                                                        "emailNoti"
                                                                )
                                                            );
                                                        } else {
                                                            setChangedInputs([
                                                                ...changedInputs,
                                                                "emailNoti",
                                                            ]);
                                                        }

                                                        field.onChange(e);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="smsNoti"
                                    render={({ field }) => (
                                        <FormItem className="flex w-full flex-row items-center justify-between gap-4 rounded-lg border border-gray-800 p-3 shadow-sm">
                                            <FormLabel className="flex gap-1">
                                                SMS bildirimleri
                                                <span
                                                    className={`text-xs font-semibold text-red-400 ${
                                                        !changedInputs.includes(
                                                            "smsNoti"
                                                        )
                                                            ? "invisible"
                                                            : null
                                                    }`}
                                                >
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={(e) => {
                                                        setSmsNoti(e);
                                                        if (
                                                            changedInputs.includes(
                                                                "smsNoti"
                                                            )
                                                        ) {
                                                            setChangedInputs(
                                                                changedInputs.filter(
                                                                    (input) =>
                                                                        input !==
                                                                        "smsNoti"
                                                                )
                                                            );
                                                        } else {
                                                            setChangedInputs([
                                                                ...changedInputs,
                                                                "smsNoti",
                                                            ]);
                                                        }
                                                        field.onChange(e);
                                                    }}
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
                            className="w-56 md:w-full"
                            disabled={isPending}
                        >
                            Kaydet
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
}
