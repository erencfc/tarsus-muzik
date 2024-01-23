import { currentUser } from "@/lib/auth";
import PersonalInformationForm from "./PersonalInformationForm";
import { getUserById } from "@/data/user";

export default async function PersonalInformationPage() {
    const currUser = await currentUser();
    const user = await getUserById({ id: currUser.id });

    return (
        <div className="mx-auto max-w-6xl p-6">
            <PersonalInformationForm user={user} />
        </div>
    );
}
