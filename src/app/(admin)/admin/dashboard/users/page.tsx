import FormWrapper from "@/app/(admin)/components/FormWrapper";

export default function UsersPage() {
    return (
        <FormWrapper
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
            <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                <td>Cy Ganderton</td>
                <td>lorem@ipsum.com</td>
                <td>0501 234 56 78</td>
                <td>16.01.2024</td>
                <td>USER</td>
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
            <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                <td>Hart Hagerty</td>
                <td>lorem@ipsum.com</td>
                <td>0501 234 56 78</td>
                <td>16.01.2024</td>
                <td>USER</td>
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
            <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                <td>Brice Seyre</td>
                <td>lorem@ipsum.com</td>
                <td>0501 234 56 78</td>
                <td>16.01.2024</td>
                <td>USER</td>
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
            <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-950/30">
                <td>Marj French</td>
                <td>lorem@ipsum.com</td>
                <td>0501 234 56 78</td>
                <td>16.01.2024</td>
                <td>USER</td>
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
        </FormWrapper>
    );
}
