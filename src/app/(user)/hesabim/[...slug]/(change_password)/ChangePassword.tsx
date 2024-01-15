"use client";

import { toast } from "react-toastify";
import { UserPayload } from "@/types/UserPayload";
import { changeUserPassword } from "./action";
import { useFormStatus } from "react-dom";
import Loading from "@/app/loading";

export default function ChangePassword({ user }: { user: UserPayload }) {
    function Submit() {
        const { pending } = useFormStatus();

        return (
            <button
                className="btn btn-primary btn-sm ml-auto mt-6 text-white"
                disabled={pending}
            >
                {pending ? <Loading /> : <span>Şifreyi Değiştir</span>}
            </button>
        );
    }

    if (!user) return null;

    async function clientAction(formData: FormData) {
        const result = await changeUserPassword({
            formData,
            user,
        });

        if (result.success) {
            toast.success("Şifreniz başarıyla güncellendi.");
        } else {
            toast.error(result.error);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <form action={clientAction} className="min-w-[300px]">
                <h1 className="text-center text-xl font-bold">
                    Şifre Değiştir
                </h1>
                <div className="mt-5 grid grid-cols-1 grid-rows-2 gap-x-6 gap-y-4 ">
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Mevcut Şifre
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="currentPassword"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Yeni Şifre
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="newPassword"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Yeni Şifre (Tekrar)
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="newPasswordConfirm"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <Submit />
                </div>
            </form>
        </div>
    );
}
