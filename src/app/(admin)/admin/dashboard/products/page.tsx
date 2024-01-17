import FormWrapper from "@/app/(admin)/components/FormWrapper";
import { formatPrice } from "@/lib/format";
import Image from "next/image";

export default function ProductsPage() {
    return (
        <FormWrapper
            inputPlaceHolder="Ürün Ara"
            buttonTitle="Yeni Ürün"
            buttonHref="/admin/dashboard/products/new"
            tableHeadings={[
                "Model",
                "Açıklama",
                "Fiyat",
                "Stok",
                "Eklenme Tarihi",
                "",
            ]}
        >
            <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                <td>
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src="/images/category/gitarlar.png"
                            width={64}
                            height={64}
                            alt=""
                            className="h-16 w-16 object-contain"
                        />
                        <span>Guitar Model Lorem Ipsum</span>
                    </div>
                </td>

                <td title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. At maigres Venite fugit unde corrupt molesting molests obcaecati temporizes doit nihil!">
                    {"Lorem ipsum, dolor sit amet consectetur adipisicing elit. At maigres Venite fugit unde corrupt molesting molests obcaecati temporizes doit nihil!".slice(
                        0,
                        40
                    )}
                    ...
                </td>
                <td>{formatPrice(1234)}</td>
                <td>99</td>
                <td>16.01.2024</td>
                <td>
                    <div className="flex flex-row gap-3">
                        <button className="btn btn-sm w-16 border-none bg-teal-700 text-white hover:bg-teal-700/70">
                            İncele
                        </button>
                        <button className="btn btn-sm w-16 border-none bg-red-500 text-white hover:bg-red-800/70">
                            Sil
                        </button>
                    </div>
                </td>
            </tr>
            <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                <td>
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src="/images/category/gitarlar.png"
                            width={64}
                            height={64}
                            alt=""
                            className="h-16 w-16 object-contain"
                        />
                        <span>Guitar Model Lorem Ipsum</span>
                    </div>
                </td>

                <td title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. At maigres Venite fugit unde corrupt molesting molests obcaecati temporizes doit nihil!">
                    {"Lorem ipsum, dolor sit amet consectetur adipisicing elit. At maigres Venite fugit unde corrupt molesting molests obcaecati temporizes doit nihil!".slice(
                        0,
                        40
                    )}
                    ...
                </td>
                <td>{formatPrice(1234)}</td>
                <td>99</td>
                <td>16.01.2024</td>
                <td>
                    <div className="flex flex-row gap-3">
                        <button className="btn btn-sm w-16 border-none bg-teal-700 text-white hover:bg-teal-700/70">
                            İncele
                        </button>
                        <button className="btn btn-sm w-16 border-none bg-red-500 text-white hover:bg-red-800/70">
                            Sil
                        </button>
                    </div>
                </td>
            </tr>
            <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                <td>
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src="/images/category/gitarlar.png"
                            width={64}
                            height={64}
                            alt=""
                            className="h-16 w-16 object-contain"
                        />
                        <span>Guitar Model Lorem Ipsum</span>
                    </div>
                </td>

                <td title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. At maigres Venite fugit unde corrupt molesting molests obcaecati temporizes doit nihil!">
                    {"Lorem ipsum, dolor sit amet consectetur adipisicing elit. At maigres Venite fugit unde corrupt molesting molests obcaecati temporizes doit nihil!".slice(
                        0,
                        40
                    )}
                    ...
                </td>
                <td>{formatPrice(1234)}</td>
                <td>99</td>
                <td>16.01.2024</td>
                <td>
                    <div className="flex flex-row gap-3">
                        <button className="btn btn-sm w-16 border-none bg-teal-700 text-white hover:bg-teal-700/70">
                            İncele
                        </button>
                        <button className="btn btn-sm w-16 border-none bg-red-500 text-white hover:bg-red-800/70">
                            Sil
                        </button>
                    </div>
                </td>
            </tr>
            <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                <td>
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src="/images/category/gitarlar.png"
                            width={64}
                            height={64}
                            alt=""
                            className="h-16 w-16 object-contain"
                        />
                        <span>Guitar Model Lorem Ipsum</span>
                    </div>
                </td>

                <td title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. At maigres Venite fugit unde corrupt molesting molests obcaecati temporizes doit nihil!">
                    {"Lorem ipsum, dolor sit amet consectetur adipisicing elit. At maigres Venite fugit unde corrupt molesting molests obcaecati temporizes doit nihil!".slice(
                        0,
                        40
                    ) + "..."}
                </td>
                <td>{formatPrice(1234)}</td>
                <td>99</td>
                <td>16.01.2024</td>
                <td>
                    <div className="flex flex-row gap-3">
                        <button className="btn btn-sm w-16 border-none bg-teal-700 text-white hover:bg-teal-700/70">
                            İncele
                        </button>
                        <button className="btn btn-sm w-16 border-none bg-red-500 text-white hover:bg-red-800/70">
                            Sil
                        </button>
                    </div>
                </td>
            </tr>
        </FormWrapper>
    );
}
