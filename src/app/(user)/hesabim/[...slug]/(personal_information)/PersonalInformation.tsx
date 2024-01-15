"use client";

import { ChangeEvent, useState } from "react";
import { updateUserInfo } from "./action";
import { toast } from "react-toastify";
import { UserPayload } from "@/types/UserPayload";

export default function PersonalInformation({ user }: { user: UserPayload }) {
    const [changedInputs, setChangedInputs] = useState<string[]>([]);

    if (!user) return <div>Kişisel bilgiler yüklenirken bir hata oluştu.</div>;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const isValueChanged = e.target.value !== e.target.defaultValue;

        if (!isValueChanged) {
            setChangedInputs(changedInputs.filter((input) => input !== name));
        } else {
            if (!changedInputs.includes(name)) {
                setChangedInputs([...changedInputs, name]);
            }
        }
    };

    async function clientAction(formData: FormData) {
        const result = await updateUserInfo({
            formData,
            oldUser: user,
        });

        if (result.success) {
            toast.success("Bilgiler başarıyla güncellendi.");
            setChangedInputs([]);
        } else {
            toast.error(result.error);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <form action={clientAction} className="min-w-[550px]">
                <h1 className="text-center text-xl font-bold">
                    Kişisel Bilgilerim
                </h1>
                <div className="mt-5 grid grid-cols-2 grid-rows-3 gap-x-6 gap-y-4 ">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Adınız
                            {changedInputs.includes("firstName") && (
                                <span className="font-bold text-red-500">
                                    {" "}
                                    *
                                </span>
                            )}
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                defaultValue={user.firstName}
                                onChange={(e) => handleChange(e)}
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            />
                        </div>
                    </div>

                    <div className="">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Soyadınız
                            {changedInputs.includes("lastName") && (
                                <span className="font-bold text-red-500">
                                    {" "}
                                    *
                                </span>
                            )}
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                defaultValue={user.lastName}
                                onChange={(e) => handleChange(e)}
                                autoComplete="familyName"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email Adresiniz
                            {changedInputs.includes("email") && (
                                <span className="font-bold text-red-500">
                                    {" "}
                                    *
                                </span>
                            )}
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={user.email}
                                onChange={(e) => handleChange(e)}
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="tel"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Telefon Numaranız
                            {changedInputs.includes("tel") && (
                                <span className="font-bold text-red-500">
                                    {" "}
                                    *
                                </span>
                            )}
                        </label>
                        <div className="mt-1">
                            <input
                                id="tel"
                                name="tel"
                                type="tel"
                                defaultValue={user.tel}
                                onChange={(e) => handleChange(e)}
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-col gap-2">
                            <label className="label justify-start">
                                <input
                                    type="checkbox"
                                    name="mailNoti"
                                    defaultChecked={user.emailNoti}
                                    onChange={(e) => {
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
                                    className="checkbox-primary checkbox checkbox-sm"
                                />
                                <span className="label-text ml-2 text-start">
                                    Kampanyalardan/indirimlerden haberdar olmak
                                    için e-posta almak istiyorum.
                                    {changedInputs.includes("mailNoti") && (
                                        <span className="font-bold text-red-500">
                                            {" "}
                                            *
                                        </span>
                                    )}
                                </span>
                            </label>

                            <label className="label justify-start">
                                <input
                                    type="checkbox"
                                    name="smsNoti"
                                    defaultChecked={user.smsNoti}
                                    onChange={(e) => {
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
                                    className="checkbox-primary checkbox checkbox-sm"
                                />
                                <span className="label-text ml-2">
                                    Kampanyalardan/indirimlerden haberdar olmak
                                    için SMS almak istiyorum.
                                    {changedInputs.includes("smsNoti") && (
                                        <span className="font-bold text-red-500">
                                            {" "}
                                            *
                                        </span>
                                    )}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-sm mt-6 text-white"
                >
                    Kaydet
                </button>
            </form>
        </div>
    );
}
