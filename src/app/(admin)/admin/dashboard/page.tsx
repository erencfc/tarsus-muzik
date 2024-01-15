import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = (await getServerSession(authOptions as any)) as any;

    if (!session) {
        redirect("/");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user) {
        redirect("/");
    }
    if (user.Role !== "ADMIN") {
        redirect("/");
    }

    return (
        <>
            {user.Role === "ADMIN" ? (
                <div>
                    <h1>Dashboard</h1>
                </div>
            ) : (
                <div>
                    <h1>Not Allowed</h1>
                </div>
            )}
        </>
    );
}
