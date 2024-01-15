export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[600px] flex-col items-center bg-gray-800 pt-4 text-white">
            {children}
        </div>
    );
}
