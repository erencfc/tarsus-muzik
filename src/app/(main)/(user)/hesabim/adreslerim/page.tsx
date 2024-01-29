import CreateAddressButton from "./CreateAddressButton";
import UpdateAddressButton from "./UpdateAddressButton";
import DeleteAddressButton from "./DeleteAddressButton";

import { getAddressesByUserId } from "@/lib/db/address";
import { currentUser } from "@/lib/auth";

export default async function AddressesPage() {
    const user = await currentUser();

    const addresses = await getAddressesByUserId({ userId: user.id });

    return (
        <div className="mx-auto mt-6 flex min-h-[600px] max-w-6xl flex-col p-6">
            <h1 className="text-center text-xl font-bold">Adreslerim</h1>
            <CreateAddressButton />
            <ul>
                {addresses.map((address) => (
                    <li
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
                                <UpdateAddressButton address={address} />
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
                    </li>
                ))}

                {addresses.length === 0 ? (
                    <div className="flex flex-col">
                        <span className="text-center text-sm text-gray-500">
                            Henüz adres tanımlamadınız.
                        </span>
                    </div>
                ) : null}
            </ul>
        </div>
    );
}
