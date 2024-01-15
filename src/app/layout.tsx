import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import HeaderTop from "@/components/Header/HeaderTop";
import HeaderMobile from "@/components/Header/HeaderMobile";
import Navbar from "@/components/Header/Navbar";
import FooterTop from "@/components/Footer/FooterTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tarsus Müzik Market",
    description: "Tarsus Müzik Market - Müzik Aletleri ve Ekipmanları",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                {/* Header & Navbar */}
                <header className="inline">
                    <div className="hidden xl:inline">
                        <div className="container m-auto max-w-6xl">
                            <HeaderTop />
                        </div>
                        <Navbar />
                    </div>

                    <HeaderMobile />
                </header>
                <AuthProvider>
                    {/* Main */}
                    <main>
                        {children}
                        <Suspense>
                            <ToastContainer />
                        </Suspense>
                    </main>

                    {/* Footer */}
                    <footer className="mt-12">
                        <FooterTop />
                        <div className="bg-black/90">
                            <div className="mx-auto min-w-[300px] max-w-6xl p-6">
                                <div className="flex w-full shrink-0 flex-col items-center gap-2 px-4 py-6 sm:flex-row md:px-6">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        © Tarsus Müzik Market. Tüm hakları
                                        saklıdır.
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
                </AuthProvider>
            </body>
        </html>
    );
}
