export default function OtherLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="h-screen bg-black/[0.98]">{children}</div>;
}
