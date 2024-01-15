import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";

import { Carousel } from "./Carousel";
import Loading from "@/app/loading";
import ImageCarousel from "@/app/(main)/(home)/ImageCarousel";

import {
    ArrowUturnRightIcon,
    CreditCardIcon,
    EnvelopeIcon,
    LockClosedIcon,
    PhoneIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";

import Categories from "./Categories";
const NewProducts = dynamic(() => import("./NewProducts"), { ssr: false });
const PopularProducts = dynamic(() => import("./PopularProducts"), {
    ssr: false,
});

export default function Home() {
    return (
        <div className="flex flex-col gap-16 p-6">
            <Suspense>
                <ImageCarousel />
            </Suspense>

            <div className="container mx-auto flex max-w-6xl grid-cols-1 flex-col items-center gap-x-8 gap-y-6 py-4 sm:grid lg:grid-cols-4 [&>div]:flex [&>div]:w-[250px] [&>div]:flex-row [&>div]:items-center [&>div]:gap-3">
                <div className="col-span-2 col-start-1 lg:col-span-1 lg:col-start-1">
                    <div className="rounded-full bg-gray-200/70 p-3">
                        <TruckIcon className="mb-0.5 h-7 w-7 text-gray-700" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                        Hızlı ve Sorunsuz Teslimat
                    </span>
                </div>
                <div className="col-span-2 col-start-3 lg:col-span-1 lg:col-start-2">
                    <div className="rounded-full bg-gray-200/70 p-3">
                        <ArrowUturnRightIcon className="mb-0.5 h-7 w-7 text-gray-700" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                        İade ve Değişim
                    </span>
                </div>
                <div className="col-span-2 col-start-1 row-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
                    <div className="rounded-full bg-gray-200/70 p-3">
                        <LockClosedIcon className="mb-0.5 h-7 w-7 text-gray-700" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                        Güvenli Ödeme
                    </span>
                </div>
                <div className="col-start-3 row-start-2 lg:col-span-1 lg:col-start-4 lg:row-start-1">
                    <div className="rounded-full bg-gray-200/70 p-3">
                        <CreditCardIcon className="mb-0.5 h-7 w-7 text-gray-700" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                        Kredi Kartına Taksit
                    </span>
                </div>
            </div>

            <Categories Carousel={Carousel} />

            <Suspense fallback={<Loading />}>
                <PopularProducts Carousel={Carousel} />
            </Suspense>

            <Suspense fallback={<Loading />}>
                <NewProducts Carousel={Carousel} />
            </Suspense>

            <div className="container mx-auto mt-14 flex max-w-6xl flex-col items-center">
                <h2 className="text-2xl font-bold">
                    Soru ve Talepleriniz İçin
                </h2>
                <div className="mt-8 flex flex-col justify-between gap-8 sm:flex-row sm:gap-12 md:flex-row md:gap-36  lg:flex-row lg:gap-64">
                    <Link href="tel:01234567890">
                        <div className="group flex flex-col items-center gap-4">
                            <i className="transition-colors duration-300 ease-in-out group-hover:text-primary">
                                <PhoneIcon className="h-8 w-8" />
                            </i>
                            <div className="flex flex-col items-center gap-1 [&>span]:transition-colors [&>span]:duration-300 [&>span]:ease-in-out [&>span]:group-hover:text-primary">
                                <span className="text-center text-sm font-semibold text-gray-700">
                                    (0123) 456 78 90
                                </span>
                                <span className="text-xs font-semibold text-gray-500 opacity-70">
                                    TELEFON
                                </span>
                            </div>
                        </div>
                    </Link>
                    <Link href="mailto:mail@mail.com">
                        <div className="group flex flex-col items-center gap-4">
                            <i className="transition-colors duration-300 ease-in-out group-hover:text-primary">
                                <EnvelopeIcon className="h-8 w-8" />
                            </i>
                            <div className="flex flex-col items-center gap-1 [&>span]:transition-colors [&>span]:duration-300 [&>span]:ease-in-out [&>span]:group-hover:text-primary">
                                <span className="text-center text-sm font-semibold text-gray-700">
                                    mail@mail.com
                                </span>
                                <span className="text-xs font-semibold text-gray-500 opacity-70">
                                    E-MAİL
                                </span>
                            </div>
                        </div>
                    </Link>
                    <Link href="https://wa.me/905012345678">
                        <div className="group flex flex-col items-center gap-4">
                            <i className="transition-colors duration-300 ease-in-out group-hover:text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                </svg>
                            </i>
                            <div className="flex flex-col items-center gap-1 [&>span]:transition-colors [&>span]:duration-300 [&>span]:ease-in-out [&>span]:group-hover:text-primary">
                                <span className="text-center text-sm font-semibold text-gray-700">
                                    0501 234 56 78
                                </span>
                                <span className="text-xs font-semibold text-gray-500 opacity-70">
                                    WHATSAPP
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="flex min-h-screen flex-col">
    //         <main className="flex-1">
    //             <section className="bg-cover bg-center py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
    //                 <div className="container max-w-6xl py-8 md:px-6">
    //                     <div className="flex h-full flex-col justify-center space-y-4">
    //                         <div className="space-y-2">
    //                             <h1 className="text-3xl font-bold tracking-tighter text-black sm:text-5xl xl:text-6xl/none">
    //                                 Lorem ipsum dolor sit amet
    //                             </h1>
    //                             <p className="max-w-[600px] py-3 text-lg text-gray-500 md:text-xl">
    //                                 Lorem ipsum dolor sit amet consectetur
    //                                 adipisicing elit. Explicabo eius doloribus
    //                                 consecrator obcaecati militia vero
    //                                 inventor, ulam assumenda.
    //                             </p>
    //                         </div>
    //                         <div className="flex gap-2 min-[400px]:flex-row">
    //                             <button className="btn btn-primary text-white">
    //                                 Satın Al
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </section>
    //         </main>
    //     </div>
    // );
}
