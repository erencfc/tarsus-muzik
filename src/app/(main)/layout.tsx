import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import HeaderTop from "@/components/Header/HeaderTop";
import HeaderMobile from "@/components/Header/HeaderMobile";
import FooterTop from "@/components/Footer/FooterTop";
import NavLinks from "@/components/Header/NavLinks";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header className="inline">
                <div className="hidden xl:inline">
                    <div className="container m-auto max-w-6xl">
                        <HeaderTop />
                    </div>
                    <div className="sticky top-0 z-[1111] hidden h-12 items-center justify-center bg-zinc-950 font-semibold text-white xl:flex">
                        <ul className="flex items-center justify-between gap-6">
                            <NavLinks />
                        </ul>
                    </div>
                </div>

                <HeaderMobile />
            </header>

            {/* Main */}
            <main className="min-h-[300px]">
                {children}
                <Suspense>
                    <ToastContainer />
                </Suspense>
            </main>

            {/* Footer */}
            <footer className="overflow-clip">
                <FooterTop />
                <div className="bg-black/90">
                    <div className="mx-auto min-w-[300px] max-w-6xl p-6">
                        <div className="flex w-full shrink-0 flex-col items-center gap-2 px-4 py-6 sm:flex-row md:px-6">
                            <p className="text-xs text-gray-400 dark:text-gray-400">
                                © Hesaplı Müzik Aletleri. Tüm hakları saklıdır.
                            </p>
                            {/* <nav className="flex gap-4 sm:ml-auto sm:gap-6">
                                        <Link
                                            className="text-xs underline-offset-4 hover:underline"
                                            href="#"
                                        >
                                            Terms of Service
                                        </Link>
                                        <Link
                                            className="text-xs underline-offset-4 hover:underline"
                                            href="#"
                                        >
                                            Privacy
                                        </Link>
                                    </nav> */}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
