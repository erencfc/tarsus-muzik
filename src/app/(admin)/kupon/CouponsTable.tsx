import {
    DocumentIcon,
    EllipsisVerticalIcon,
    TagIcon,
} from "@heroicons/react/24/outline";
import DeleteCouponButton from "./DeleteCouponButton";
import { deleteCoupon } from "./coupon";
import { Prisma } from "@prisma/client";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import Link from "next/link";

export default function CouponsTable({
    coupons,
}: {
    coupons: Prisma.CouponGetPayload<{
        include: {
            Category: true;
            SubCategory: true;
        };
    }>[];
}) {
    return (
        <div>
            <table className="table table-pin-rows table-pin-cols table-lg mt-2">
                <thead>
                    <tr className="text-sm">
                        <th></th>
                        <td>Kupon Başlangıç</td>
                        <td>Kupon Bitiş</td>
                        <td>Kupon Kodu</td>
                        <td>Kategori</td>
                        <td>İndirim Miktarı</td>
                        <th></th>
                    </tr>
                </thead>

                {coupons.map((coupon, index) => (
                    <tbody key={coupon.id}>
                        <tr key={coupon.id}>
                            <th>{index + 1}</th>
                            <td>
                                {coupon.validFrom ? (
                                    <div className="flex flex-col items-start justify-center">
                                        <span>
                                            {formatDate(coupon.validFrom)}
                                        </span>
                                        <span>
                                            {formatTime(coupon.validFrom)}
                                        </span>
                                    </div>
                                ) : (
                                    <span>-</span>
                                )}
                            </td>
                            <td>
                                {coupon.validTo ? (
                                    <div className="flex flex-col items-start justify-center">
                                        <span>
                                            {formatDate(coupon.validTo)}
                                        </span>
                                        <span>
                                            {formatTime(coupon.validTo)}
                                        </span>
                                    </div>
                                ) : (
                                    <span>Sınırsız</span>
                                )}
                            </td>

                            <td className="max-w-xs break-words text-sm">
                                <span>{coupon.code}</span>
                            </td>
                            <td>
                                {coupon.SubCategory ? (
                                    <span className="flex w-fit items-center justify-center rounded-md bg-blue-200 px-2 py-1 text-blue-800">
                                        <TagIcon className="mr-1 h-4 w-4" />
                                        {coupon.SubCategory.name}
                                    </span>
                                ) : coupon.Category ? (
                                    <span className="flex w-fit items-center justify-center rounded-md bg-blue-200 px-2 py-1 text-blue-800">
                                        <TagIcon className="mr-1 h-4 w-4" />
                                        {coupon.Category.name}
                                    </span>
                                ) : (
                                    <span className="flex w-fit items-center justify-center rounded-md bg-blue-200 px-2 py-1 text-blue-800">
                                        <TagIcon className="mr-1 h-4 w-4" />
                                        Tüm Ürünler
                                    </span>
                                )}
                            </td>
                            <td>
                                {coupon.discountType === "PERCENT" ? (
                                    <span className="font-bold text-green-600">
                                        %{coupon.discount}
                                    </span>
                                ) : (
                                    <span className="font-bold text-green-600">
                                        {formatPrice(coupon.discount)}
                                    </span>
                                )}
                            </td>
                            <td>
                                <div className="dropdown dropdown-end">
                                    <button className="btn btn-circle btn-ghost h-fit w-fit">
                                        <EllipsisVerticalIcon
                                            width={28}
                                            height={28}
                                        />
                                    </button>
                                    <ul
                                        tabIndex={0}
                                        className="menu dropdown-content z-[99] w-fit rounded-box bg-base-100 p-2 shadow"
                                    >
                                        <li>
                                            <Link href={`/kupon/${coupon.id}`}>
                                                <DocumentIcon
                                                    width={16}
                                                    height={16}
                                                    className="opacity-60"
                                                />
                                                <span className="text-sm text-gray-800/80">
                                                    Detaylar
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <DeleteCouponButton
                                                couponId={coupon.id}
                                                deleteCoupon={
                                                    deleteCoupon as any
                                                }
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                ))}

                <tfoot>
                    <tr className="text-sm">
                        <th></th>
                        <td>Kupon Başlangıç</td>
                        <td>Kupon Bitiş</td>
                        <td>Kupon Kodu</td>
                        <td>Kategori</td>
                        <td>İndirim Miktarı</td>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
