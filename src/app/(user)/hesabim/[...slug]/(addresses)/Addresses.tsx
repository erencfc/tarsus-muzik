"use server";

import { prisma } from "@/lib/db/prisma";
import { UserPayload } from "@/types/UserPayload";

export default async function Addresses({ user }: { user: UserPayload }) {
    const addresses = await prisma.address.findMany({
        where: {
            userId: user.id,
        },
    });

    return (
        <div className="flex flex-col">
            <h1 className="text-center text-xl font-bold">Adreslerim</h1>
            <button className="btn btn-primary btn-sm my-4 w-fit text-white">
                Yeni Adres Tanımla
            </button>
            <div className="flex flex-col">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="mb-4 flex flex-col rounded-lg border border-gray-200 p-4"
                    >
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
                                <button className="btn btn-primary btn-sm text-white">
                                    Düzenle
                                </button>
                                <button className="btn-danger btn btn-sm">
                                    Sil
                                </button>
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
                        <span className="text-sm text-gray-500">
                            Henüz adres tanımlamadınız.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
