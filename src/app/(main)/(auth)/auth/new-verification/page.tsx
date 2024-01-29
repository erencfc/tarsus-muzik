"use client";

import { DEFAULT_LOGIN_PATH } from "@/routes";
import Link from "next/link";
import { newVerification } from "./new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "@/components/Form/form-error";
import { FormSuccess } from "@/components/Form/form-success";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

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
        <CardWrapper
            headerIcon={
                <i>
                    <CheckBadgeIcon width={36} height={36} />
                </i>
            }
            headerLabel="E-mail Doğrulama"
            backButtonHref={DEFAULT_LOGIN_PATH}
            backButtonLabel="Giriş Sayfasına Dön"
        >
            <div className="mx-auto flex h-full w-fit max-w-6xl items-center justify-center p-6">
                {!success && !error ? (
                    <span className="loading loading-bars mx-auto text-primary" />
                ) : null}
                <div className="flex justify-center">
                    <FormSuccess message={success} />
                    {!success ? <FormError message={error} /> : null}
                </div>
            </div>
        </CardWrapper>
    );
}
