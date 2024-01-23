import { currentUser } from "@/lib/auth";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function ChangePasswordPage() {
    const user = await currentUser();

    return (
        <div className="mx-auto max-w-6xl p-6">
            <ChangePasswordForm userId={user.id} />
        </div>
    );
}
