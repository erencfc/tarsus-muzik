"use client";

import { DEFAULT_LOGIN_PATH } from "@/routes";
import Link from "next/link";
import { newVerification } from "./new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "@/app/(main)/(auth)/login/form-error";
import { FormSuccess } from "@/app/(main)/(auth)/login/form-success";

export default function NewVerificationPage() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Doğrulama kodu bulunamadı!");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Bir hata oluştu!");
            });
    }, [error, success, token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="mx-auto -mb-10 flex max-w-6xl justify-center p-6">
            <div className="card w-96 bg-gray-300 shadow-xl">
                <div className="card-body gap-4">
                    <h2 className="card-title justify-center">
                        E-Mail Doğrulama
                    </h2>
                    {!success && !error && (
                        <span
                            className={`loading loading-bars  mx-auto text-primary`}
                        />
                    )}
                    <div className="flex justify-center">
                        <FormSuccess message={success} />
                        {!success && <FormError message={error} />}
                    </div>
                    <Link
                        href={DEFAULT_LOGIN_PATH}
                        className="text-center text-sm font-semibold text-gray-600"
                    >
                        Giriş Sayfasına Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}
