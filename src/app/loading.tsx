export default function Loading({
    color = "primary",
    size = "md",
    type = "spinner",
}: {
    color?: string;
    size?: "xs" | "sm" | "md" | "lg";
    type?:
        | "spinner"
        | "bars"
        | "spinningBubbles"
        | "dots"
        | "ring"
        | "ball"
        | "bars"
        | "infinity";
}) {
    return (
        <div className="m-auto flex items-center justify-center p-6">
            <span
                className={`loading loading-${type} loading-${size} text-${color}`}
            />
        </div>
    );
}
