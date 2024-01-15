export default function Header({
    headerIcon,
    headerLabel,
}: {
    headerIcon: React.ReactNode;
    headerLabel: string;
}) {
    return (
        <div className="flex w-full flex-row items-center justify-center gap-x-2 gap-y-4">
            {headerIcon}
            <h1 className="text-white">{headerLabel}</h1>
        </div>
    );
}
