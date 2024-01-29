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
    className?: string;
    headerIcon: React.ReactNode;
    headerLabel: string;
    backButtonLabel?: string;
    backButtonHref?: string;
};

export const CardWrapper = ({
    children,
    className,
    headerIcon,
    headerLabel,
    backButtonLabel,
    backButtonHref,
}: CardWrapperProps) => {
    return (
        <Card className={`min-w-[400px] shadow-lg ${className}`}>
            <CardHeader>
                <Header headerIcon={headerIcon} headerLabel={headerLabel} />
            </CardHeader>
            <CardContent className="text-white dark:text-white">
                {children}
            </CardContent>
            {backButtonLabel && backButtonHref ? (
                <CardFooter>
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                </CardFooter>
            ) : null}
        </Card>
    );
};
