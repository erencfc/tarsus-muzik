import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        absolute: "",
        default: "Tarsus Müzik Market",
        template: "%s | Tarsus Müzik Market",
    },
    description: "Tarsus Müzik Market - Müzik Aletleri Ve Ekipmanları",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                <main>
                    {children}
                    <Toaster />
                </main>
            </body>
        </html>
    );
}
