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
        <span
            className={`loading loading-${type} loading-${size} text-${color}`}
        />
    );
}
