import Link from "next/link";
import { Card } from "@radix-ui/themes";

export default function CategoriesPage() {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="rounded-lg border-r bg-gray-300/40 lg:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="mt-24 grid items-start px-4 text-sm font-medium">
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:text-primary"
                                href="#"
                            >
                                <HomeIcon className="h-4 w-4" />
                                Ana Sayfa
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg bg-gray-800 px-3 py-2 text-gray-50 transition-all hover:text-accent "
                                href="#"
                            >
                                <LayoutGridIcon className="h-4 w-4" />
                                Categories
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:text-primary"
                                href="#"
                            >
                                <PackageIcon className="h-4 w-4" />
                                Products
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <main className="flex flex-col p-4 md:gap-8 md:p-6">
                <h1 className="mb-4 flex flex-col text-center text-lg font-semibold after:mt-6 after:h-[1px] after:w-full after:bg-gray-400/40 after:content-[''] md:text-2xl">
                    Kategoriler
                </h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <div className="card-body flex flex-col items-center p-4">
                            <SmartphoneIcon className="mb-2 h-12 w-12" />
                            <Link className="text-lg font-medium" href="#">
                                Electronics
                            </Link>
                        </div>
                    </Card>
                    <Card>
                        <div className="card-body flex flex-col items-center p-4">
                            <BookOpenIcon className="mb-2 h-12 w-12" />
                            <Link className="text-lg font-medium" href="#">
                                Books
                            </Link>
                        </div>
                    </Card>
                    <Card>
                        <div className="card-body flex flex-col items-center p-4">
                            <ShirtIcon className="mb-2 h-12 w-12" />
                            <Link className="text-lg font-medium" href="#">
                                Clothing
                            </Link>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
function BookOpenIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    );
}

function HomeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function LayoutGridIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    );
}

function Package2Icon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    );
}

function PackageIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    );
}

function ShirtIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
    );
}

function SmartphoneIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
        </svg>
    );
}
