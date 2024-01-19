import DeleteButton from "./DeleteButton";
import FormWrapper from "@/app/(admin)/components/FormWrapper";
import { getUserCount, getUsers } from "@/lib/db/user";
import { formatDate } from "@/lib/format";
import { redirect } from "next/navigation";
import ViewButton from "./ViewButton";
import { Button } from "@/components/ui/button";
import { getUserRole } from "@/app/utils/getUserRole";

export default async function UsersPage({
    searchParams: { page, q },
}: {
    searchParams: { page: string; q: string };
}) {
    const currentPage = parseInt(page || "1");
    const itemsPerPage = 6;

    const users = await getUsers({ currentPage, itemsPerPage, q });
    const totalItems = await getUserCount();

    // If there are no users and we are not on the first page, redirect to the first page
    if (users.length === 0 && currentPage !== 1) {
        redirect("/admin/dashboard/users");
    }

    return (
        <FormWrapper
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            paginationHref="/admin/dashboard/users"
            inputPlaceHolder="Kullanıcı Ara"
            buttonTitle="Yeni Kullanıcı"
            buttonHref="/admin/dashboard/users/new"
            tableHeadings={[
                "Ad Soyad",
                "Email",
                "Telefon",
                "Kayıt Tarihi",
                "Rol",
                "",
            ]}
        >
            {users.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center text-gray-400">
                        Görüntülenecek kayıt bulunamadı.
                    </td>
                </tr>
            )}
            {users.map((user) => (
                <tr
                    className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30"
                    key={user.id}
                >
                    <td>
                        {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.tel}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                        <span className={getUserRole(user.role).color}>
                            {getUserRole(user.role).name}
                        </span>
                    </td>
                    <td>
                        <div className="flex flex-row gap-3">
                            <ViewButton id={user.id}>
                                <Button variant="outline" size="sm">
                                    İncele
                                </Button>
                            </ViewButton>
                            <DeleteButton id={user.id} />
                        </div>
                    </td>
                </tr>
            ))}
        </FormWrapper>
    );
}
