export const metadata = {
    title: "Sayfa Bulunamadı - Tarsus Müzik Market",
};

export default function NotFound() {
    return (
        <div>
            <div
                className="absolute left-0 top-0 h-full w-full bg-black"
                style={{ zIndex: -1 }}
            >
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <div>
                        <style>
                            {`
            .error-h1 {
                font-size: 1.5rem;
                font-weight: 900;
                color: #fff;
                text-shadow: 0 0 10px #000;
                border-right: 1px solid rgba(255, 255, 255, 0.3);
            }
            `}
                        </style>
                        <h1 className="error-h1 my-0 ml-0 mr-5 inline-block py-0 pl-0 pr-6 align-top">
                            404
                        </h1>
                        <p className="inline-block leading-10">
                            Sayfa bulunamadı.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
