import LoginForm from "./LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Üye Girişi",
};

export default function LoginPage() {
    return <LoginForm />;
}
