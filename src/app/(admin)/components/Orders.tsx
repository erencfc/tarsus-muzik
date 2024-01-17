import { formatPrice } from "@/lib/format";

export default function Orders() {
    return (
        <div className="mt-4 flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900 p-4">
            <h2>Son Siparişler</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-white">
                            <th>Ad Soyad</th>
                            <th>Durum</th>
                            <th>Fiyat</th>
                            <th>Tarih</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                            <td>Cy Ganderton</td>
                            <td>
                                <span className="rounded-lg bg-yellow-300/50 p-1 px-2">
                                    Bekleniyor
                                </span>
                            </td>
                            <td>{formatPrice(1234)}</td>
                            <td>16.01.2024</td>
                        </tr>
                        <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                            <td>Hart Hagerty</td>
                            <td>
                                <span className="rounded-lg bg-red-300/50 p-1 px-2">
                                    İptal Edildi
                                </span>
                            </td>
                            <td>{formatPrice(1234)}</td>
                            <td>16.01.2024</td>
                        </tr>
                        <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                            <td>Brice Seyre</td>
                            <td>
                                <span className="rounded-lg bg-green-300/50 p-1 px-2">
                                    Onaylandı
                                </span>
                            </td>
                            <td>{formatPrice(1234)}</td>
                            <td>16.01.2024</td>
                        </tr>
                        <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                            <td>Marj French</td>
                            <td>
                                <span className="rounded-lg bg-yellow-300/50 p-1 px-2">
                                    Bekleniyor
                                </span>
                            </td>
                            <td>{formatPrice(1234)}</td>
                            <td>16.01.2024</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
