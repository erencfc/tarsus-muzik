import CartEntry from "@/components/Cart/CartEntry";
import { getCart } from "@/lib/db/cart";
import { removeCoupon } from "./cart";
import { ExclamationCircleIcon, TagIcon } from "@heroicons/react/24/outline";
import Discount from "@/components/Cart/Discount";
import { formatPrice } from "@/lib/format";
import BackButton from "./BackButton";
import RemoveCouponButton from "./RemoveCouponButton";
import { Suspense } from "react";
import Loading from "@/app/loading";

export const generateMetadata = async () => {
    return {
        title: "Sepetim",
    };
};

export default async function CartPage() {
    const cart = await getCart();

    return (
        <Suspense fallback={<Loading />}>
            <div className="m-auto grid min-w-[300px] max-w-6xl grid-cols-4 grid-rows-2 gap-4 p-6">
                {cart && cart.items.length > 0 ? (
                    <>
                        <div className="col-span-3 mb-6 rounded-md border border-solid border-[#dadada] p-6">
                            <h1 className="flex flex-col text-lg font-semibold uppercase text-gray-900 after:my-2 after:h-[1px] after:w-full after:bg-[#dadada] after:content-['']">
                                Sepet Detayı
                            </h1>

                            {cart &&
                                cart.items.map((item) => (
                                    <CartEntry cartItem={item} key={item.id} />
                                ))}

                            <BackButton />
                        </div>
                        <div className="col-span-3 col-start-1 row-start-2 mb-6 h-fit rounded-md border border-solid border-[#dadada] p-6">
                            <Discount />
                        </div>
                        <div className="col-start-4 row-span-2 row-start-1 mb-6 h-fit rounded-md border border-solid border-[#dadada] p-6">
                            <h1 className="flex w-full flex-col text-lg font-semibold uppercase text-gray-900 after:my-2 after:h-[1px] after:w-full after:bg-[#dadada] after:content-['']">
                                SEPET ÖZETİ
                            </h1>
                            <div className="flex flex-col gap-2 [&>div:nth-last-child(2)]:border-b [&>div:nth-last-child(2)]:border-solid [&>div:nth-last-child(2)]:border-b-[#dadada] [&>div:nth-last-child(2)]:pb-2">
                                <div className="flex flex-row items-center">
                                    <span className="text-xs text-gray-700">
                                        Ara Toplam
                                    </span>
                                    <span className="ml-auto text-sm font-extrabold">
                                        {formatPrice(cart.subtotal)}
                                    </span>
                                </div>

                                <div className="flex flex-row items-center">
                                    <span className="text-xs text-gray-700">
                                        Kargo Ücreti
                                    </span>
                                    <span className="ml-auto text-sm font-extrabold">
                                        {cart.shipping
                                            ? formatPrice(cart.shipping)
                                            : "Ücretsiz"}
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center">
                                        <span className="text-xs text-gray-700">
                                            İndirim
                                        </span>
                                        <span className="ml-auto text-sm font-extrabold">
                                            {formatPrice(cart.discount)}
                                        </span>
                                    </div>
                                    {cart.Coupon && (
                                        <div className="flex flex-col before:my-2 before:h-[1px] before:w-full before:bg-[#dadada] before:content-['']">
                                            <div className="flex w-fit max-w-full flex-row items-center gap-1 bg-blue-400/50 p-1">
                                                <TagIcon
                                                    width={16}
                                                    height={16}
                                                />
                                                <span className="overflow-hidden break-words text-xs text-gray-700">
                                                    {cart.Coupon.code}
                                                </span>
                                                <RemoveCouponButton
                                                    couponId={cart.Coupon.id}
                                                    removeCoupon={removeCoupon}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-row items-center">
                                    <span className="text-xs text-gray-700">
                                        Toplam
                                    </span>
                                    <span className="ml-auto text-sm font-extrabold">
                                        {formatPrice(cart.total)}
                                    </span>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-sm btn-block mt-4 rounded-sm text-white">
                                ALIŞVERİŞİ TAMAMLA
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col-span-4 row-span-2 mb-6 rounded-md border border-solid border-[#dadada] p-6">
                            <div className="flex flex-col items-center justify-center">
                                <ExclamationCircleIcon
                                    width={84}
                                    height={84}
                                    className="rounded-full text-red-500"
                                />
                                <span className="py-4 text-xs font-medium text-gray-700">
                                    Sepetinizde ürün bulunmamaktadır.
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Suspense>
    );
}
