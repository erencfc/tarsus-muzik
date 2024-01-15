"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Header from "@/components/auth/Header";
import BackButton from "@/components/auth/BackButton";

type CardWrapperProps = {
    children: React.ReactNode;
    headerIcon: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
};

export const CardWrapper = ({
    children,
    headerIcon,
    headerLabel,
    backButtonLabel,
    backButtonHref,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-lg">
            <CardHeader>
                <Header headerIcon={headerIcon} headerLabel={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
