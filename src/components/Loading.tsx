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
        <div className="flex items-center justify-center">
            <span
                className={`loading loading-${type} loading-${size} text-${color} p-6`}
            />
        </div>
    );
}
