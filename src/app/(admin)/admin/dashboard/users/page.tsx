import FormWrapper from "@/app/(admin)/components/FormWrapper";
import PaginationComponent from "@/app/(admin)/components/Pagination";
import { getUserCount, getUsers } from "@/lib/db/user";
import { formatDate } from "@/lib/format";
import { redirect } from "next/navigation";

export default async function UsersPage({
    searchParams: { page },
}: {
    searchParams: { page: string };
}) {
    const currentPage = parseInt(page || "1");
    const itemsPerPage = 12;

    const users = await getUsers({ currentPage, itemsPerPage });
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
                    <td>{user.role}</td>
                    <td>
                        <div className="flex flex-row gap-3">
                            <button className="btn btn-sm w-16 border-none bg-teal-700 text-white hover:bg-teal-700/70">
                                İncele
                            </button>
                            <button className="btn btn-sm w-16 border-none bg-red-500 text-white hover:bg-red-800/70">
                                Sil
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </FormWrapper>
    );
}
