import { getUserCount } from "@/lib/db/user";
import { UsersIcon } from "@heroicons/react/24/solid";
import CardComponent from "@/app/(admin)/components/Card";
import Orders from "@/app/(admin)/components/Orders";

const cardList = [
    {
        icon: UsersIcon,
        header: "Toplam Kullanıcı",
        content: 0,
        footer: (
            <>
                Son haftadan{" "}
                <span className="font-semibold text-green-500">%12</span> daha
                fazla
            </>
        ),
    },
    {
        icon: UsersIcon,
        header: "Toplam Kullanıcı",
        content: 0,
        footer: (
            <>
                Son haftadan{" "}
                <span className="font-semibold text-green-500">%12</span> daha
                fazla
            </>
        ),
    },
    {
        icon: UsersIcon,
        header: "Toplam Kullanıcı",
        content: 0,
        footer: (
            <>
                Son haftadan{" "}
                <span className="font-semibold text-green-500">%12</span> daha
                fazla
            </>
        ),
    },
    {
        icon: UsersIcon,
        header: "Toplam Kullanıcı",
        content: 0,
        footer: (
            <>
                Son haftadan{" "}
                <span className="font-semibold text-green-500">%12</span> daha
                fazla
            </>
        ),
    },
];

export default async function Dashboard() {
    const count = await getUserCount();
    cardList[0].content = count;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full flex-row justify-between gap-8">
                {cardList.map((card, index) => (
                    <CardComponent card={card} key={index} />
                ))}
            </div>
            <Orders />
            TODO: Add charts
        </div>
    );
}
