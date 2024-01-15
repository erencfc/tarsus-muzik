export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center bg-gray-900 py-6 text-white">
            {children}
        </div>
    );
}
