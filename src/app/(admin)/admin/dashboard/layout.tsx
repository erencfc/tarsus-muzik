import Navbar from "./Navbar";
import SideBar from "./SideBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="-mb-12 bg-gray-900">
            <div className="flex">
                <aside className="flex-1 bg-gray-950/70 p-6 py-16">
                    <SideBar />
                </aside>
                <div className="flex-[4] p-6 py-16">
                    <Navbar />
                    {children}
                </div>
            </div>
        </div>
    );
}
