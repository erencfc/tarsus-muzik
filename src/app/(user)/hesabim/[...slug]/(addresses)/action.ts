"use server";

import { prisma } from "@/lib/db/prisma";
import { $Enums, Address, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createAddress = async ({
    formData,
    userId,
}: {
    formData: FormData;
    userId: string;
}): Promise<{ success: boolean; message: string | null }> => {
    const alias = formData.get("alias")?.toString();

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const tel = formData.get("tel")?.toString();

    const city = formData.get("city")?.toString();
    const town = formData.get("town")?.toString();
    const district = formData.get("district")?.toString();
    const details = formData.get("details")?.toString();
    const zipCode = formData.get("zipCode")?.toString();

    const billingTypeRadio = formData
        .get("billingTypeRadio")
        ?.toString() as $Enums.BillingType;

    const nationalId = formData.get("nationalId")?.toString();

    const companyName = formData.get("companyName")?.toString();
    const taxOffice = formData.get("taxOffice")?.toString();
    const taxNumber = formData.get("taxNumber")?.toString();

    if (!alias) {
        return {
            success: false,
            message: "Lütfen adres adını giriniz.",
        };
    }

    if (!firstName) {
        return {
            success: false,
            message: "Lütfen adınızı giriniz.",
        };
    }

    if (!lastName) {
        return {
            success: false,
            message: "Lütfen soyadınızı giriniz.",
        };
    }

    if (!tel) {
        return {
            success: false,
            message: "Lütfen telefon numaranızı giriniz.",
        };
    }

    if (!city) {
        return {
            success: false,
            message: "Lütfen şehir giriniz.",
        };
    }

    if (!town) {
        return {
            success: false,
            message: "Lütfen ilçe giriniz.",
        };
    }

    if (!district) {
        return {
            success: false,
            message: "Lütfen mahalle giriniz.",
        };
    }

    if (!details) {
        return {
            success: false,
            message: "Lütfen adres giriniz.",
        };
    }

    if (!zipCode) {
        return {
            success: false,
            message: "Lütfen posta kodu giriniz.",
        };
    }

    if (!billingTypeRadio) {
        return {
            success: false,
            message: "Lütfen fatura tipi seçiniz.",
        };
    }

    if (billingTypeRadio === "CORPORATE") {
        if (!companyName) {
            return {
                success: false,
                message: "Lütfen şirket adını giriniz.",
            };
        }

        if (!taxNumber) {
            return {
                success: false,
                message: "Lütfen vergi numaranızı giriniz.",
            };
        }

        if (!taxOffice) {
            return {
                success: false,
                message: "Lütfen vergi dairesi giriniz.",
            };
        }
    } else {
        if (!nationalId) {
            return {
                success: false,
                message: "Lütfen TC kimlik numaranızı giriniz.",
            };
        }
    }

    let data: Prisma.AddressCreateInput = {
        firstName,
        lastName,
        alias,
        tel,
        city,
        details,
        district,
        town,
        zipCode,
        User: {
            connect: {
                id: userId,
            },
        },
        billingType: billingTypeRadio,
    };

    if (billingTypeRadio === "CORPORATE") {
        data = {
            ...data,
            companyName,
            taxNumber,
            taxOffice,
        };
    } else {
        data = {
            ...data,
            nationalId,
        };
    }

    try {
        const address = await prisma.address.create({ data });

        if (!address) {
            return {
                success: false,
                message: "Bir hata oluştu, lütfen tekrar deneyiniz.",
            };
        }

        revalidatePath("/hesabim/adreslerim");

        return {
            success: true,
            message: "Adres başarıyla oluşturuldu.",
        };
    } catch (error: unknown) {
        console.log(error);

        return {
            success: false,
            message: "Bir hata oluştu, lütfen tekrar deneyiniz.",
        };
    }
};

export const updateAddress = async ({
    formData,
    userId,
    oldAddress,
}: {
    formData: FormData;
    userId: string;
    oldAddress: Address;
}): Promise<{ success: boolean; message: string | null }> => {
    const alias = formData.get("alias")?.toString();

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const tel = formData.get("tel")?.toString();

    const city = formData.get("city")?.toString();
    const town = formData.get("town")?.toString();
    const district = formData.get("district")?.toString();
    const details = formData.get("details")?.toString();
    const zipCode = formData.get("zipCode")?.toString();

    const billingTypeRadio = formData
        .get("billingTypeRadio")
        ?.toString() as $Enums.BillingType;

    const nationalId = formData.get("nationalId")?.toString();

    const companyName = formData.get("companyName")?.toString();
    const taxOffice = formData.get("taxOffice")?.toString();
    const taxNumber = formData.get("taxNumber")?.toString();

    if (!alias) {
        return {
            success: false,
            message: "Lütfen adres adını giriniz.",
        };
    }

    if (!firstName) {
        return {
            success: false,
            message: "Lütfen adınızı giriniz.",
        };
    }

    if (!lastName) {
        return {
            success: false,
            message: "Lütfen soyadınızı giriniz.",
        };
    }

    if (!tel) {
        return {
            success: false,
            message: "Lütfen telefon numaranızı giriniz.",
        };
    }

    if (!city) {
        return {
            success: false,
            message: "Lütfen şehir giriniz.",
        };
    }

    if (!town) {
        return {
            success: false,
            message: "Lütfen ilçe giriniz.",
        };
    }

    if (!district) {
        return {
            success: false,
            message: "Lütfen mahalle giriniz.",
        };
    }

    if (!details) {
        return {
            success: false,
            message: "Lütfen adres giriniz.",
        };
    }

    if (!zipCode) {
        return {
            success: false,
            message: "Lütfen posta kodu giriniz.",
        };
    }

    if (!billingTypeRadio) {
        return {
            success: false,
            message: "Lütfen fatura tipi seçiniz.",
        };
    }

    if (billingTypeRadio === "CORPORATE") {
        if (!companyName) {
            return {
                success: false,
                message: "Lütfen şirket adını giriniz.",
            };
        }

        if (!taxNumber) {
            return {
                success: false,
                message: "Lütfen vergi numaranızı giriniz.",
            };
        }

        if (!taxOffice) {
            return {
                success: false,
                message: "Lütfen vergi dairesi giriniz.",
            };
        }
    } else {
        if (!nationalId) {
            return {
                success: false,
                message: "Lütfen TC kimlik numaranızı giriniz.",
            };
        }
    }

    let data: Prisma.AddressCreateInput = {
        firstName,
        lastName,
        alias,
        tel,
        city,
        details,
        district,
        town,
        zipCode,
        User: {
            connect: {
                id: userId,
            },
        },
        billingType: billingTypeRadio,
    };

    if (billingTypeRadio === "CORPORATE") {
        data = {
            ...data,
            companyName,
            taxNumber,
            taxOffice,
            nationalId: null,
        };
    } else {
        data = {
            ...data,
            nationalId,
            companyName: null,
            taxNumber: null,
            taxOffice: null,
        };
    }

    try {
        const address = await prisma.address.update({
            where: {
                id: oldAddress.id,
            },
            data,
        });

        if (!address) {
            return {
                success: false,
                message: "Bir hata oluştu, lütfen tekrar deneyiniz.",
            };
        }

        revalidatePath("/hesabim/adreslerim");

        return {
            success: true,
            message: "Adres başarıyla güncellendi.",
        };
    } catch (error: any) {
        console.log(error);

        if (error.message.includes("alias_key")) {
            return {
                success: false,
                message: "Bu başlıkta bir adres zaten var.",
            };
        }

        return {
            success: false,
            message: "Bir hata oluştu, lütfen tekrar deneyiniz.",
        };
    }
};
