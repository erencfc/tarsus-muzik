"use client";

import { toast } from "react-toastify";
import LoginFormButton from "./LoginFormButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputClass =
    "input input-bordered input-secondary mb-5 h-10 w-96 rounded-lg border-2 border-solid border-neutral text-sm placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary";

export default function LoginForm() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center bg-gray-800">
            <h1 className="p-5 text-white">Giriş Yap</h1>
            <div className="relative">
                <form
                    action={async (formData) => {
                        const [emailOrTel, password] = [
                            formData.get("emailOrTel")?.toString(),
                            formData.get("password")?.toString(),
                        ];

                        if (!emailOrTel || !password) {
                            return toast.error("Lütfen tüm alanları doldurun.");
                        }

                        try {
                            const res = await signIn("credentials", {
                                emailOrTel,
                                password,
                                redirect: false,
                            });

                            if (res?.error) {
                                return toast.error("Email veya şifre hatalı");
                            }

                            if (res?.ok) {
                                toast.success("Giriş başarılı");
                                router.replace("/");
                                router.refresh();
                            }
                        } catch (error) {
                            toast.error("Bir hata oluştu.");
                        }
                    }}
                    className="flex flex-col items-center justify-center"
                >
                    <input
                        className={inputClass}
                        type="text"
                        name="emailOrTel"
                        placeholder="Email veya Telefon Numaranız"
                        minLength={2}
                        maxLength={26}
                    />
                    <input
                        className={inputClass}
                        type="password"
                        name="password"
                        placeholder="Şifreniz"
                        minLength={6}
                        maxLength={26}
                    />
                    <Link href="/register" className="mb-5">
                        <p className="absolute right-1 top-28 text-ellipsis text-[13px] text-white underline transition-colors duration-100 ease-in-out hover:text-accent">
                            Üye Ol
                        </p>
                    </Link>
                    <LoginFormButton />
                </form>
            </div>
        </div>
    );
}
