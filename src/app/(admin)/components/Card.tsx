import { Card, CardContent } from "@/components/ui/card";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export default function CardComponent({
    card,
}: {
    card: {
        icon: ForwardRefExoticComponent<
            SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>
        >;
        header: string;
        content: number;
        footer: JSX.Element;
    };
}) {
    const Icon = card?.icon;

    return (
        <Card className="w-full bg-gray-900 hover:cursor-pointer dark:bg-gray-900">
            <CardContent className="mt-4 h-28">
                {card ? (
                    <div className="flex h-full flex-row gap-6">
                        <span className="badge badge-primary badge-ghost h-6 w-6 rounded-full bg-white">
                            <Icon
                                width={18}
                                height={18}
                                className="min-h-[18px] min-w-[18px] text-black"
                            />
                        </span>
                        <div className="flex flex-col justify-between">
                            <h3 className="inline-block text-start font-normal text-white">
                                {card.header}
                            </h3>
                            <p className="font-bold text-white">
                                {Number(card.content).toLocaleString("tr-TR")}
                            </p>
                            {card.footer ? (
                                <span className="text-xs font-medium">
                                    {card.footer}
                                </span>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}
