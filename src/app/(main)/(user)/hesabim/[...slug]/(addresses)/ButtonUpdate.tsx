"use client";

export default function UpdateAddressButton() {
    return (
        <button
            className="btn btn-primary btn-sm text-white"
            onClick={() => {
                (
                    document.getElementById(
                        "update_address_modal"
                    ) as HTMLDialogElement
                )?.showModal();
            }}
        >
            Düzenle
        </button>
    );
}
