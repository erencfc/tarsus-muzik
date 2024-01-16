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
                                <FormItem>
                                    <FormLabel>Adınız</FormLabel>{" "}
                                    {changedInputs.includes("firstName") && (
                                        <span className="text-xs font-semibold text-red-400">
                                            *
                                        </span>
                                    )}
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
                                <FormItem>
                                    <FormLabel>Soyadınız</FormLabel>{" "}
                                    {changedInputs.includes("lastName") && (
                                        <span className="text-xs font-semibold text-red-400">
                                            *
                                        </span>
                                    )}
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
                                <FormItem>
                                    <FormLabel>Email Adresiniz</FormLabel>{" "}
                                    {changedInputs.includes("email") && (
                                        <span className="text-xs font-semibold text-red-400">
                                            *
                                        </span>
                                    )}
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
                                <FormItem>
                                    <FormLabel>Telefon Numaranız</FormLabel>{" "}
                                    {changedInputs.includes("tel") && (
                                        <span className="text-xs font-semibold text-red-400">
                                            *
                                        </span>
                                    )}
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
                        <FormField
                            control={form.control}
                            name="emailNoti"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-center gap-1">
                                        <FormLabel className="flex justify-center py-2 text-center font-medium leading-4">
                                            Kampanyalardan/indirimlerden
                                            haberdar olmak için e-posta almak
                                            istiyorum.
                                        </FormLabel>
                                        {changedInputs.includes(
                                            "emailNoti"
                                        ) && (
                                            <span className="text-xs font-semibold text-red-400">
                                                *
                                            </span>
                                        )}
                                    </div>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            defaultChecked={user.emailNoti}
                                            type="checkbox"
                                            disabled={isPending}
                                            value={
                                                user.emailNoti
                                                    ? "true"
                                                    : "false"
                                            }
                                            onChange={(e) => {
                                                e.target.value = e.target
                                                    .checked
                                                    ? "true"
                                                    : "false";
                                                setEmailNoti(e.target.checked);
                                                setChangedInputs(
                                                    e.target.checked !==
                                                        e.target.defaultChecked
                                                        ? [
                                                              ...changedInputs,
                                                              e.target.name,
                                                          ]
                                                        : changedInputs.filter(
                                                              (input) =>
                                                                  input !==
                                                                  e.target.name
                                                          )
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="smsNoti"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-center gap-1">
                                        <FormLabel className="flex justify-center py-2 text-center font-medium leading-4">
                                            Kampanyalardan/indirimlerden
                                            haberdar olmak için SMS almak
                                            istiyorum.
                                        </FormLabel>
                                        {changedInputs.includes("smsNoti") && (
                                            <span className="text-xs font-semibold text-red-400">
                                                *
                                            </span>
                                        )}
                                    </div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            defaultChecked={user.smsNoti}
                                            type="checkbox"
                                            disabled={isPending}
                                            value={
                                                user.smsNoti ? "true" : "false"
                                            }
                                            onChange={(e) => {
                                                e.target.value = e.target
                                                    .checked
                                                    ? "true"
                                                    : "false";
                                                setSmsNoti(e.target.checked);
                                                setChangedInputs(
                                                    e.target.checked !==
                                                        e.target.defaultChecked
                                                        ? [
                                                              ...changedInputs,
                                                              e.target.name,
                                                          ]
                                                        : changedInputs.filter(
                                                              (input) =>
                                                                  input !==
                                                                  e.target.name
                                                          )
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
