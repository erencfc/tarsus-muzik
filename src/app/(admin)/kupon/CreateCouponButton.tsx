"use client";

import { PlusIcon } from "@heroicons/react/24/outline";

export default function CreateCouponButton() {
    return (
        <button
            className="btn btn-primary btn-sm gap-1 text-white"
            onClick={() =>
                (document.getElementById("create_modal") as any)?.showModal()
            }
        >
            <PlusIcon width={24} height={24} />
            <span>Kupon Oluştur</span>
        </button>
    );
}
