import RegisterForm from "./RegisterForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kayıt Ol",
};

export default function RegisterPage() {
    return <RegisterForm />;
}
