"use client";

import { register } from "@/actions/register.action";
import { useState } from "react";
import { toast } from "react-toastify";
import RegisterFormButton from "./RegisterFormButton";
import Link from "next/link";

const inputClass =
    "input input-bordered input-secondary mb-5 h-10 w-96 rounded-lg border-2 border-solid border-neutral text-sm placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary";

export default function RegisterForm() {
    const [message, setMessage] = useState({ message: "", error: false });

    return (
        <div className="flex flex-col items-center justify-center bg-gray-800">
            <h1 className="p-5 text-white">Üye Ol</h1>
            <div className="relative">
                <form
                    action={async (formData) => {
                        const [
                            firstName,
                            lastName,
                            email,
                            tel,
                            password,
                            passwordConfirm,
                        ] = [
                            formData.get("firstName")?.toString(),
                            formData.get("lastName")?.toString(),
                            formData.get("email")?.toString(),
                            formData.get("tel")?.toString(),
                            formData.get("password")?.toString(),
                            formData.get("passwordConfirm")?.toString(),
                        ];

                        if (
                            !firstName ||
                            !lastName ||
                            !email ||
                            !tel ||
                            !password ||
                            !passwordConfirm
                        ) {
                            return {
                                success: false,
                                error: "Lütfen tüm alanları doldurun.",
                            };
                        }

                        if (password !== passwordConfirm) {
                            toast.error("Şifreler uyuşmuyor.");
                            setMessage({
                                message: "Şifreler uyuşmuyor.",
                                error: true,
                            });
                            return;
                        }

                        const result = await register(formData);

                        if (result.success) {
                            toast.success("Hesap Oluşturuldu.");
                            setMessage({
                                message: "Doğrulama maili gönderildi.",
                                error: false,
                            });
                        } else {
                            toast.error(result.error);
                            setMessage({
                                message: result.error || "",
                                error: true,
                            });
                        }
                    }}
                    className="flex flex-col items-center justify-center"
                >
                    <input
                        className={inputClass}
                        type="text"
                        name="firstName"
                        placeholder="Adınız"
                        minLength={2}
                        maxLength={26}
                    />
                    <input
                        className={inputClass}
                        type="text"
                        name="lastName"
                        placeholder="Soyadınız"
                        minLength={2}
                        maxLength={26}
                    />
                    <input
                        className={inputClass}
                        type="email"
                        name="email"
                        placeholder="Email Adresiniz"
                    />
                    <input
                        className={inputClass}
                        type="tel"
                        name="tel"
                        placeholder="Telefon Numaranız"
                        minLength={11}
                        maxLength={11}
                    />
                    <input
                        className={inputClass}
                        type="password"
                        name="password"
                        placeholder="Şifreniz"
                        minLength={6}
                        maxLength={26}
                    />
                    <input
                        className={inputClass}
                        type="password"
                        name="passwordConfirm"
                        placeholder="Tekrar Şifreniz"
                        minLength={6}
                        maxLength={26}
                    />
                    <Link href="/login" className="mb-5">
                        <p className="absolute right-1 top-[348px] text-ellipsis text-[13px] text-white underline transition-colors duration-100 ease-in-out  hover:text-accent">
                            Zaten Üye Misiniz?
                        </p>
                    </Link>
                    {message?.message && (
                        <p
                            className={
                                message.error
                                    ? "mb-5 text-red-500"
                                    : "mb-5 text-green-500"
                            }
                        >
                            {message.message}
                        </p>
                    )}
                    <RegisterFormButton />
                </form>
            </div>
        </div>
    );
}
