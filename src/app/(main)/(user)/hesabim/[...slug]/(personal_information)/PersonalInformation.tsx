import { UserPayload } from "@/types/UserPayload";
import PersonalInformationForm from "./PersonalInformationForm";

export default function PersonalInformation({ user }: { user: UserPayload }) {
    return <PersonalInformationForm user={user} />;
}
