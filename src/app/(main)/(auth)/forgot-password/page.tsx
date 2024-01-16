import ResetForm from "./ResetForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Şifremi Unuttum",
};

export default function ResetPage() {
    return <ResetForm />;
}
