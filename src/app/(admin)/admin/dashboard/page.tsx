import { currentUser } from "@/lib/auth";

export default async function Dashboard() {
    const user = await currentUser();

    return (
        <div>
            <h1 className="text-2xl font-semibold text-white">
                ROLE : {user.role}
            </h1>
        </div>
    );
}
