"use server";

import { Suspense } from "react";
import { UserPayload } from "@/types/UserPayload";
import { prisma } from "@/lib/db/prisma";

import CreateAddressButton from "./ButtonCreate";
import CreateAddressModal from "./ModalCreate";

import UpdateAddressModal from "./ModalUpdate";
import UpdateAddressButton from "./ButtonUpdate";
import DeleteAddressButton from "./ButtonDelete";

export default async function Addresses({ user }: { user: UserPayload }) {
    const addresses = await prisma.address.findMany({
        where: {
            userId: user.id,
        },
    });

    return (
        <div className="flex flex-col">
            <Suspense>
                <CreateAddressModal userId={user.id} />
            </Suspense>
            <h1 className="text-center text-xl font-bold">Adreslerim</h1>
            <CreateAddressButton />
            <div className="flex flex-col">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="mb-4 flex flex-col rounded-lg border border-gray-200 p-4"
                    >
                        <UpdateAddressModal
                            userId={user.id}
                            address={address}
                        />
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className="font-bold">
                                    {address.alias}
                                </span>
                                <span className="text-sm">
                                    {address.firstName} {address.lastName}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <UpdateAddressButton />
                                <DeleteAddressButton addressId={address.id} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="line-clamp-2 text-sm">
                                {address.details}
                            </span>
                            <br />
                            <span className="text-sm">
                                {address.city} / {address.district}
                            </span>
                            <span className="text-sm">
                                Telefon: {address.tel}
                            </span>
                        </div>
                    </div>
                ))}

                {addresses.length === 0 && (
                    <div className="flex flex-col">
                        <span className="text-center text-sm text-gray-500">
                            Henüz adres tanımlamadınız.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
