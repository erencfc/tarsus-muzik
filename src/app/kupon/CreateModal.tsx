"use client";

import { DocumentIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import { createCoupon } from "./action";
import { toast } from "react-toastify";

type CreateModalProps = {
    categories: Prisma.CategoryGetPayload<{
        include: {
            SubCategory: true;
        };
    }>[];
};

export default function CreateModal({ categories }: CreateModalProps) {
    return (
        <dialog
            id="create_modal"
            className="modal modal-bottom  sm:modal-middle"
        >
            <div className="modal-box">
                <h3 className="text-lg font-bold">Kupon Oluştur</h3>

                <form
                    action={async (formData) => {
                        const coupon = await createCoupon({
                            formData,
                            categories,
                        });

                        toast[coupon.success ? "success" : "error"](
                            coupon.message
                        );
                    }}
                    className="mt-4 flex flex-col gap-4 [&_*:focus]:outline-none [&_*:focus]:ring-2 [&_*:focus]:ring-blue-600"
                >
                    <div className="flex w-full flex-row gap-2">
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-center text-sm">
                                Kupon Başlangıç Tarihi
                            </label>
                            <input
                                type="date"
                                name="coupon_start_date"
                                className="input input-bordered w-full"
                                placeholder="Kupon Başlangıç Tarihi"
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-center text-sm">
                                Kupon Başlangıç Saati
                            </label>
                            <input
                                type="time"
                                name="coupon_start_time"
                                className="input input-bordered w-full"
                                placeholder="Kupon Başlangıç Saati"
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-row gap-2">
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-center text-sm">
                                Kupon Bitiş Tarihi
                            </label>
                            <input
                                type="date"
                                name="coupon_end_date"
                                className="input input-bordered w-full"
                                placeholder="Kupon Bitiş Tarihi"
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-center text-sm">
                                Kupon Bitiş Saati
                            </label>
                            <input
                                type="time"
                                name="coupon_end_time"
                                className="input input-bordered w-full"
                                placeholder="Kupon Bitiş Saati"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Kupon Kodu</label>
                        <input
                            type="text"
                            name="coupon_code"
                            className="input input-bordered w-full"
                            placeholder="Kupon Kodu"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Kupon Açıklaması</label>
                        <textarea
                            className="textarea textarea-bordered"
                            placeholder="Kupon Açıklaması"
                            name="coupon_description"
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm">İndirim Miktarı</label>
                        <input
                            type="number"
                            name="coupon_discount_amount"
                            min={1}
                            className="input input-bordered"
                            placeholder="İndirim Miktarı"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">İndirim Türü</label>
                        <select
                            className="input input-bordered"
                            name="coupon_discount_type"
                        >
                            <option value="1">Yüzde</option>
                            <option value="2">TL</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Kategori</label>
                        <select
                            className="input input-bordered"
                            name="coupon_category_id"
                        >
                            <option value={`all`}>Tüm Kategoriler</option>
                            {categories.map((category) => (
                                <optgroup
                                    key={category.id}
                                    label={category.name}
                                >
                                    <option value={category.id}>
                                        Tüm {category.name}
                                    </option>
                                    {category.SubCategory.map((subcategory) => (
                                        <option
                                            key={subcategory.id}
                                            value={subcategory.id}
                                        >
                                            {subcategory.name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Minimum Sepet Tutarı</label>
                        <input
                            type="number"
                            min={1}
                            name="coupon_min_order_amount"
                            className="input input-bordered"
                            placeholder="Minimum Sepet Tutarı"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">
                            Kullanım Limiti (Boş bırakırsanız sınırsız olur)
                        </label>
                        <input
                            type="number"
                            min={1}
                            name="coupon_max_use_count"
                            className="input input-bordered placeholder:text-[13px]"
                            placeholder="Kullanım Limiti"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Kupon Durumu</label>
                        <select
                            className="input input-bordered"
                            name="coupon_status"
                        >
                            <option value="1">Aktif</option>
                            <option value="2">Pasif</option>
                        </select>
                    </div>

                    <div className="flex w-full justify-end">
                        <button className="btn btn-primary btn-sm gap-1 text-white">
                            <DocumentIcon width={20} height={20} />
                            <span>Oluştur</span>
                        </button>
                    </div>
                </form>
                {/* <form method="dialog" className="modal-backdrop">
                    <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                        <XMarkIcon width={16} height={16} />
                    </button>
                </form> */}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
