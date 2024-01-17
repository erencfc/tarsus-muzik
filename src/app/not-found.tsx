"use client";

export const metadata = {
    title: "Sayfa Bulunamadı - Tarsus Müzik Market",
};

export default function NotFound() {
    return (
        <div className="h-screen w-full">
            <div className="h-full w-full bg-black">
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="flex scale-150 items-center justify-center">
                        <h1 className="my-0 ml-0 mr-5 inline-block border-r border-r-white/30 py-0 pl-0 pr-6 align-top text-2xl font-black text-white">
                            404
                        </h1>
                        <p className="inline-block leading-10 text-white">
                            Sayfa bulunamadı.
                        </p>
                    </div>
                    <div className="flex w-1/5 flex-row justify-between px-4">
                        <button
                            className="mt-10 inline-block rounded-2xl bg-gray-300 px-8 py-3 font-semibold text-black"
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                            Geri Dön
                        </button>
                        <a
                            href="/"
                            className="mt-10 inline-block rounded-2xl bg-gray-300 px-8 py-3 font-semibold text-black"
                        >
                            Ana Sayfa
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
