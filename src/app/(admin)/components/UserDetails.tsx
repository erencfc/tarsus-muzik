"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "sonner";

import { formatDate } from "@/lib/format";
import {
    ArrowLeftIcon,
    BellAlertIcon,
    BellSlashIcon,
} from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { FormError } from "@/components/Form/form-error";
import { getUserRole } from "@/app/utils/getUserRole";
import Link from "next/link";

export default function UserDetails({
    user,
}: {
    user: Prisma.UserGetPayload<{
        include: {
            _count: {
                select: {
                    Favorite: true;
                    Order: true;
                };
            };
            Cart: {
                select: {
                    id: true;
                };
            };
        };
    }>;
}) {
    const currentRole = useCurrentRole();

    if (currentRole !== "ADMIN") {
        return (
            <FormError message="Bu sayfayı görüntülemek için yetkiniz yok." />
        );
    }

    const notiIcon = ({ noti, type }: { noti: boolean; type: string }) => (
        <HoverCard openDelay={150} closeDelay={200}>
            <HoverCardTrigger asChild>
                <i>
                    {noti ? (
                        <BellAlertIcon className="h-5 w-5" />
                    ) : (
                        <BellSlashIcon className="h-5 w-5" />
                    )}
                </i>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <p className="px-3 py-2 text-sm">
                    Bu kullanıcı {type} bildirimlerini{" "}
                    {noti ? (
                        <span className="text-green-500">aktif etmiş.</span>
                    ) : (
                        <span className="text-red-500">
                            devre dışı bırakmış.
                        </span>
                    )}
                </p>
            </HoverCardContent>
        </HoverCard>
    );

    const role = getUserRole(user.role);

    return (
        <div className="space-y-2">
            <Link href={`/admin/dashboard/users`} className="w-fit">
                <Button variant="outline" size="sm">
                    <i>
                        <ArrowLeftIcon width={20} height={20} />
                    </i>
                    <span className="ml-2">Geri Dön</span>
                </Button>
            </Link>
            <Card className="bg-gray-900 p-4 text-gray-300 dark:bg-gray-900 dark:text-gray-300">
                <CardHeader>
                    <Label className="text-center text-xl text-white/90">
                        Kullanıcı Bilgileri
                    </Label>
                </CardHeader>

                <div className="mt-2 flex flex-col">
                    {/* First Row */}
                    <div className="flex min-h-[50px] flex-row justify-between">
                        <div className="flex w-full flex-col items-center justify-between text-sm text-gray-400">
                            <Label className="font-normal">ID</Label>
                            {user.id}
                        </div>
                        <div className="flex w-full flex-col items-center justify-between text-sm text-gray-400">
                            <Label className="font-normal">
                                Kullanıcı Rolü
                            </Label>

                            <span className={role.color}>{role.name}</span>
                        </div>
                        <div className="flex w-full flex-col items-center justify-between text-sm text-gray-400">
                            <Label className="font-normal">
                                Hesap Oluşturulma Tarihi
                            </Label>
                            <div className="flex flex-row items-center gap-2">
                                {formatDate(user.createdAt)}
                            </div>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Second Row */}
                    <div className="flex min-h-[50px] flex-row justify-between">
                        <div className="flex w-full flex-col items-center justify-center">
                            {user._count?.Favorite > 0 ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toast("TODO")}
                                >
                                    Favorileri Görüntüle
                                </Button>
                            ) : (
                                <Label className="font-normal text-gray-400">
                                    Favoriler yok
                                </Label>
                            )}
                        </div>
                        <div className="flex w-full flex-col items-center justify-center">
                            {user.Cart && user.Cart.length > 0 ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toast("TODO")}
                                >
                                    Sepeti Görüntüle
                                </Button>
                            ) : (
                                <Label className="font-normal text-gray-400">
                                    Sepet yok
                                </Label>
                            )}
                        </div>
                        <div className="flex w-full flex-col items-center justify-center">
                            {user._count?.Order > 0 ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toast("TODO")}
                                >
                                    Geçmişi Görüntüle
                                </Button>
                            ) : (
                                <Label className="flex flex-row items-center gap-1 font-normal text-gray-400">
                                    Alışveriş geçmişi yok
                                </Label>
                            )}
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Third Row */}
                    <div className="flex flex-row justify-between">
                        <div className="flex w-full flex-col items-center justify-between">
                            <Label className="font-normal text-gray-400">
                                İsim
                            </Label>
                            <div className="flex flex-row items-center gap-2">
                                {user.firstName} {user.lastName}
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-center justify-between">
                            <Label className="flex flex-row items-center gap-1 font-normal text-gray-400">
                                Telefon Numarası
                                {notiIcon({ noti: user.smsNoti, type: "SMS" })}
                            </Label>
                            {user.tel}
                        </div>
                        <div className="flex w-full flex-col items-center justify-between">
                            <Label className="flex flex-row items-center gap-1 font-normal text-gray-400">
                                E-posta
                                {notiIcon({
                                    noti: user.emailNoti,
                                    type: "e-posta",
                                })}
                            </Label>
                            <div className="text-xs text-gray-400">
                                Onay Tarihi:{" "}
                                {user.emailVerified
                                    ? formatDate(user.emailVerified)
                                    : "Onaylanmamış"}
                            </div>
                            {user.email}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
