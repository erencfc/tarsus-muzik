import { ShoppingCart, getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import CartRemoveItemButton from "./CartRemoveItemButton";
import Link from "next/link";

export default function ShoppingCartButton({
    width,
    height,
    cart,
}: {
    width: number;
    height: number;
    cart: ShoppingCart | null;
}) {
    const items = cart?.items || [];

    return (
        <div className="dropdown dropdown-end">
            <label
                tabIndex={0}
                className="btn btn-ghost btn-sm border border-transparent transition duration-300 ease-in-out hover:translate-y-1 hover:cursor-pointer hover:border-gray-600 hover:bg-transparent hover:text-primary"
            >
                <div className="relative">
                    <ShoppingCartIcon width={width} height={height} />
                    <span className="absolute bottom-4 left-5 rounded-full bg-primary px-1 py-0.5 text-sm font-semibold leading-none text-white">
                        {cart?.size || 0}
                    </span>
                </div>
            </label>
            <div
                tabIndex={0}
                className="card dropdown-content card-compact z-[2222] mt-3 w-80 bg-white shadow-md"
            >
                <div className="card-body max-h-[90vh] overflow-y-auto text-black">
                    <h1 className="text-2xl font-bold">Alışveriş Sepeti</h1>
                    <span className="font-bold">
                        Sepetinizde <u>{cart?.size || 0} ürün</u> bulunmaktadır.
                    </span>
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`mt-1 flex flex-col before:mb-2 before:h-[1px] before:w-full before:bg-gray-500/20 before:content-[''] ${
                                index === items.length - 1
                                    ? "after:mt-2 after:h-[1px] after:w-full after:bg-gray-500/20 after:content-['']"
                                    : ""
                            }`}
                        >
                            <div className="my-2 flex flex-row items-center gap-2">
                                <div className="max-w-[96px]">
                                    <Link
                                        href={`/urun/${item.Product.modelSlug}`}
                                    >
                                        <Image
                                            src={item.Product.images[0]}
                                            alt={item.Product.model}
                                            width={96}
                                            height={96}
                                        />
                                    </Link>
                                </div>
                                <div className="flex w-full flex-col">
                                    <span className="text-xs font-medium text-gray-900/60 transition-colors duration-200 hover:text-primary">
                                        <Link
                                            href={`/marka/${item.Product.Brand.slug}`}
                                        >
                                            {item.Product.Brand.name}
                                        </Link>
                                    </span>
                                    <span
                                        className="my-2 line-clamp-2 w-5/6 text-xs transition-colors duration-200 hover:text-primary"
                                        title={item.Product.model}
                                    >
                                        <Link
                                            href={`/urun/${item.Product.modelSlug}`}
                                        >
                                            {item.Product.model}
                                        </Link>
                                    </span>
                                    <span className="font-bold">
                                        <span className="text-xs font-normal">
                                            {item.quantity} Adet -{" "}
                                        </span>
                                        {formatPrice(
                                            item.quantity * item.Product.price
                                        )}
                                    </span>
                                </div>

                                <CartRemoveItemButton itemId={item.id} />
                            </div>
                        </div>
                    ))}
                    <span className="mt-4 font-semibold">Sepet Toplamı</span>
                    <span className="text-xl font-extrabold">
                        {formatPrice(cart?.subtotal || 0)}
                    </span>
                    <Link
                        href="/sepetim"
                        className="btn btn-primary btn-block mt-4 text-white"
                    >
                        Ödeme Yap
                    </Link>
                </div>
            </div>
        </div>
    );
}
