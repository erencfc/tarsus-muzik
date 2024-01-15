"use client";

import { DEFAULT_LOGIN_PATH } from "@/routes";
import Link from "next/link";
import { newVerification } from "./new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "@/components/Form/form-error";
import { FormSuccess } from "@/components/Form/form-success";

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
        <div className="h-screen">
            <div className="mx-auto flex h-full w-fit max-w-6xl items-center justify-center p-6">
                <div className="card h-96 w-96 bg-gray-300 shadow-xl">
                    <div className="card-body justify-between">
                        <h2 className="card-title justify-center">
                            E-Mail Doğrulama
                        </h2>
                        {!success && !error && (
                            <span className="loading loading-bars mx-auto text-primary" />
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
        </div>
    );
}
