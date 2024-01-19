import ViewDetails from "./ViewDetails";

export default function UserDetailsPage({
    params: { id },
}: {
    params: { id: string };
}) {
    return <ViewDetails id={id} />;
}
