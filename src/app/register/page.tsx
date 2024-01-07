import RegisterForm from "@/components/Register/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await getServerSession(authOptions as any);

    if (session) redirect("/hesabim");

    return <RegisterForm />;
}
