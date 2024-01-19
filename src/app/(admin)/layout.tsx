import { auth } from "@/auth";
import RoleGate from "@/components/auth/RoleGate";
import { Role } from "@prisma/client";
import { SessionProvider } from "next-auth/react";

import SideBar from "@/app/(admin)/components/SideBar";
import Navbar from "@/app/(admin)/components/Navbar";
import SignOutButton from "@/app/(admin)/components/SignOutButton";
import ReturnButton from "@/app/(admin)/components/ReturnButton";

export const generateMetadata = () => ({
    title: "Yönetici Paneli",
});

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <div className="flex min-h-screen bg-gray-950/95 text-white">
                <aside className="flex flex-1 flex-col justify-between bg-gray-900 p-6 py-8">
                    <div>
                        <SideBar />
                    </div>
                    <div className="flex flex-col gap-2">
                        <ReturnButton />
                        <SignOutButton />
                    </div>
                </aside>
                <div className="flex-[4] px-16 py-8">
                    <div className="mb-8">
                        <Navbar />
                    </div>
                    <RoleGate allowedRole={Role.ADMIN}>{children}</RoleGate>
                </div>
            </div>
        </SessionProvider>
    );
}
