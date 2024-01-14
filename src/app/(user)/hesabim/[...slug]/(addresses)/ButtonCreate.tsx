"use client";

export default function CreateAddressButton() {
    return (
        <button
            className="btn btn-primary btn-sm my-4 w-fit text-white"
            onClick={() => {
                (
                    document.getElementById(
                        "create_address_modal"
                    ) as HTMLDialogElement
                )?.showModal();
            }}
        >
            Yeni Adres Tanımla
        </button>
    );
}
