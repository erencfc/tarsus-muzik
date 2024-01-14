"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { createAddress } from "./action";

type CreateAddressModalProps = {
    userId: string;
};

export default function CreateAddressModal({
    userId,
}: CreateAddressModalProps) {
    const [billingType, setBillingType] = useState<"PERSONAL" | "CORPORATE">(
        "PERSONAL"
    );

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState<string>("");
    const { pending } = useFormStatus();

    return (
        <dialog
            id="create_address_modal"
            className="modal modal-bottom  sm:modal-middle"
        >
            <div className="modal-box">
                <h3 className="font-semibold">Adres Ekle</h3>

                <form
                    action={async (formData) => {
                        const address = await createAddress({
                            formData,
                            userId,
                        });

                        setSuccess(address.success);
                        setMessage(address.message || "");

                        toast[address.success ? "success" : "error"](
                            address.message
                        );

                        if (address.success) {
                            (
                                document.getElementById(
                                    "create_address_modal"
                                ) as HTMLDialogElement
                            )?.close();
                        }
                    }}
                    className="mt-4 flex flex-col gap-4 [&_*:focus]:outline-none [&_*:focus]:ring-2 [&_*:focus]:ring-blue-600"
                >
                    <div className="flex w-full flex-row gap-6">
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">Ad</label>
                            <input
                                type="text"
                                name="firstName"
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="Ad"
                                disabled={pending}
                                required
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">Soyad</label>
                            <input
                                type="text"
                                name="lastName"
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="Soyad"
                                disabled={pending}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-row gap-6">
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">Telefon</label>
                            <input
                                type="tel"
                                maxLength={11}
                                minLength={11}
                                name="tel"
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="Telefon"
                                disabled={pending}
                                required
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">İl</label>
                            <input
                                type="text"
                                name="city"
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="İl"
                                disabled={pending}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex w-full flex-row gap-6">
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">İlçe</label>
                            <input
                                type="text"
                                name="town"
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="İlçe"
                                disabled={pending}
                                required
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">Semt/Mahalle</label>
                            <input
                                type="text"
                                name="district"
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="Semt/Mahalle"
                                disabled={pending}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Adres</label>
                        <textarea
                            className="textarea textarea-bordered"
                            placeholder="Cadde, sokak, site, apartman, kapı numarası gibi bilgileri giriniz"
                            name="details"
                            disabled={pending}
                            required
                        ></textarea>
                    </div>

                    <div className="flex w-full flex-row gap-6">
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">Adres Başlığı</label>
                            <input
                                type="text"
                                name="alias"
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="Adres Başlığı"
                                disabled={pending}
                                required
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">Posta Kodu</label>
                            <input
                                type="text"
                                name="zipCode"
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="Posta Kodu"
                                disabled={pending}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex w-full items-center gap-8">
                        <label className="text-sm">Fatura Tipi:</label>
                        <div className="flex gap-3">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-2">
                                    Bireysel
                                </span>
                                <input
                                    type="radio"
                                    name="billingTypeRadio"
                                    value="PERSONAL"
                                    className="radio checked:bg-primary"
                                    defaultChecked
                                    onChange={() => {
                                        setBillingType("PERSONAL");
                                    }}
                                />
                            </label>

                            <label className="label cursor-pointer">
                                <span className="label-text mr-2">
                                    Kurumsal
                                </span>
                                <input
                                    type="radio"
                                    name="billingTypeRadio"
                                    value="CORPORATE"
                                    className="radio checked:bg-primary"
                                    onChange={() => {
                                        setBillingType("CORPORATE");
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {billingType === "PERSONAL" ? (
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">T.C Kimlik No</label>
                            <input
                                type="text"
                                name="nationalId"
                                min={0}
                                maxLength={11}
                                minLength={11}
                                className="input input-bordered w-full placeholder:text-sm"
                                placeholder="T.C Kimlik No"
                                disabled={pending}
                                required
                            />
                        </div>
                    ) : (
                        <>
                            <div className="flex w-full flex-col gap-1">
                                <label className="text-sm">Firma Adı</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    className="input input-bordered w-full placeholder:text-sm"
                                    placeholder="Firma Adı"
                                    disabled={pending}
                                    required
                                />
                            </div>
                            <div className="flex w-full flex-col gap-1">
                                <label className="text-sm">Vergi Dairesi</label>
                                <input
                                    type="text"
                                    name="taxOffice"
                                    className="input input-bordered w-full placeholder:text-sm"
                                    placeholder="Vergi Dairesi"
                                    disabled={pending}
                                    required
                                />
                            </div>
                            <div className="flex w-full flex-col gap-1">
                                <label className="text-sm">
                                    Vergi Numarası
                                </label>
                                <input
                                    type="text"
                                    name="taxNumber"
                                    min={0}
                                    maxLength={10}
                                    minLength={10}
                                    className="input input-bordered w-full placeholder:text-sm"
                                    placeholder="Vergi Numarası"
                                    disabled={pending}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="flex w-full justify-end">
                        {!pending && (success || !success) && (
                            <div className="mx-auto flex items-center font-medium">
                                <span
                                    className={`${
                                        success
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {message}
                                </span>
                            </div>
                        )}
                        <button
                            className="btn btn-primary btn-sm gap-1 text-white"
                            disabled={pending}
                        >
                            <span>Adresi Kaydet</span>
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
