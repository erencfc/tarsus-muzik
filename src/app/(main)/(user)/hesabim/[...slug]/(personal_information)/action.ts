"use server";

import { prisma } from "@/lib/db/prisma";
import { getErrorMessage } from "@/lib/utils";
import { UserPayload } from "@/types/UserPayload";

export async function updateUserInfo({
    formData,
    oldUser,
}: {
    formData: FormData;
    oldUser: UserPayload | null;
}) {
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const email = formData.get("email")?.toString();
    const tel = formData.get("tel")?.toString();
    const emailNoti =
        formData.get("mailNoti")?.toString() === "on" ? true : false;
    const smsNoti = formData.get("smsNoti")?.toString() === "on" ? true : false;

    if (!firstName || !lastName || !email || !tel) {
        return {
            success: false,
            error: "Lütfen boş alan bırakmayınız.",
        };
    }

    if (!email.includes("@")) {
        return {
            success: false,
            error: "Lütfen geçerli bir e-posta adresi giriniz.",
        };
    }

    if (tel.length !== 11 || isNaN(Number(tel))) {
        return {
            success: false,
            error: "Lütfen geçerli bir telefon numarası giriniz.",
        };
    }
    if (oldUser === null) {
        return {
            success: false,
            error: "Kullanıcı bulunamadı.",
        };
    }
    if (
        oldUser.firstName === firstName &&
        oldUser.lastName === lastName &&
        oldUser.email === email &&
        oldUser.tel === tel &&
        oldUser.emailNoti === emailNoti &&
        oldUser.smsNoti === smsNoti
    ) {
        return {
            success: false,
            error: "Değişiklik yapmadınız.",
        };
    }

    if (oldUser.email !== email) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            return {
                success: false,
                error: "Bu e-posta adresi kullanılmaktadır.",
            };
        }
    }

    if (oldUser.tel !== tel) {
        const user = await prisma.user.findUnique({
            where: {
                tel,
            },
        });
        if (user) {
            return {
                success: false,
                error: "Bu telefon numarası kullanılmaktadır.",
            };
        }
    }

    let user = null;

    try {
        user = await prisma.user.update({
            where: {
                id: oldUser.id,
            },
            data: {
                firstName,
                lastName,
                email,
                tel,
                emailNoti,
                smsNoti,
            },
        });
        if (!user) {
            return {
                success: false,
                error: "Kullanıcı bulunamadı.",
            };
        }

        delete (user as { password?: string }).password;
    } catch (error: unknown) {
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }

    return {
        success: true,
        data: user,
        error: null,
    };
}
