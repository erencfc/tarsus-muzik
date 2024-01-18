import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Mail adresi geçerli değil.",
    }),
    password: z.string().min(1, {
        message: "Lütfen şifrenizi giriniz.",
    }),
});

export const RegisterSchema = z
    .object({
        firstName: z
            .string({ required_error: "Lütfen adınızı giriniz." })
            .min(1, {
                message: "Lütfen adınızı giriniz.",
            }),
        lastName: z
            .string({ required_error: "Lütfen soyadınızı giriniz." })
            .min(1, {
                message: "Lütfen soyadınızı giriniz.",
            }),
        email: z.string().email({
            message: "Mail adresi geçerli değil.",
        }),
        tel: z
            .string({ required_error: "Lütfen telefon numaranızı giriniz." })
            .refine(
                (val) =>
                    val.startsWith("0") && val.length === 11 && !!Number(val),
                {
                    message: "Telefon numarası geçerli değil.",
                }
            ),
        password: z
            .string({ required_error: "Lütfen şifrenizi giriniz." })
            .min(6, {
                message: "Şifreniz en az 6 karakter olmalıdır.",
            }),
        passwordConfirm: z
            .string({ required_error: "Lütfen şifrenizi giriniz." })
            .min(6, {
                message: "Şifreniz en az 6 karakter olmalıdır.",
            }),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
        if (password !== passwordConfirm) {
            ctx.addIssue({
                code: "custom",
                path: ["passwordConfirm"],

                message: "Şifreler eşleşmiyor.",
            });
        }
    });

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Mail adresi geçerli değil.",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Şifreniz en az 6 karakter olmalıdır.",
    }),
});

export const PersonalInformationSchema = z.object({
    firstName: z.string({ required_error: "Lütfen adınızı giriniz." }).min(1, {
        message: "Lütfen adınızı giriniz.",
    }),
    lastName: z
        .string({ required_error: "Lütfen soyadınızı giriniz." })
        .min(1, {
            message: "Lütfen soyadınızı giriniz.",
        }),
    email: z.string().email({
        message: "Mail adresi geçerli değil.",
    }),
    tel: z
        .string({ required_error: "Lütfen telefon numaranızı giriniz." })
        .refine(
            (val) => val.startsWith("0") && val.length === 11 && !!Number(val),
            {
                message: "Telefon numarası geçerli değil.",
            }
        ),
    emailNoti: z.boolean(),
    smsNoti: z.boolean(),
});

export const NewUserSchema = z.object({
    firstName: z.string({ required_error: "Ad girmelisin." }).min(1, {
        message: "Ad girmelisin.",
    }),
    lastName: z.string({ required_error: "Soyad girmelisin." }).min(1, {
        message: "Soyad girmelisin.",
    }),
    email: z.string().email({
        message: "Mail adresi geçerli değil.",
    }),
    tel: z
        .string({ required_error: "Telefon numarası girmelisin." })
        .refine(
            (val) => val.startsWith("0") && val.length === 11 && !!Number(val),
            {
                message: "Telefon numarası geçerli değil.",
            }
        ),
    password: z.string({ required_error: "Şifre girmelisin." }).min(6, {
        message: "Şifre en az 6 karakter olmalıdır.",
    }),
    role: z.enum(["ADMIN", "USER", "DEALER"]),
    smsNoti: z.boolean(),
    emailNoti: z.boolean(),
    emailVerified: z.boolean(),
});

export const NewProductSchema = z
    .object({
        images: z.array(z.string()),
        stock: z
            .string({
                required_error: "Stok sayısını girmelisin.",
            })
            .refine((val) => !!Number(val), {
                message: "Stok sayısını girmelisin.",
            }),
        deliveryTimeMinDay: z
            .string({
                required_error:
                    "En erken tahmini kargoya verilme süresini girmelisin.",
            })
            .refine((val) => !!Number(val), {
                message:
                    "En erken tahmini kargoya verilme süresini girmelisin.",
            }),
        deliveryTimeMaxDay: z
            .string({
                required_error:
                    "En geç tahmini kargoya verilme süresini girmelisin.",
            })
            .refine((val) => !!Number(val), {
                message: "En geç tahmini kargoya verilme süresini girmelisin.",
            }),
        description: z.string().min(1, {
            message: "Açıklama girmelisin.",
        }),
        price: z
            .string({ required_error: "Ürün fiyatını girmelisin." })
            .refine((val) => !!Number(val), {
                message: "Ürün fiyatını girmelisin.",
            }),
        model: z.string().min(1, { message: "Ürün modelini girmelisin." }),
        brand: z.string({ required_error: "Marka seçmelisin." }),
        newBrand: z.string(),
        subCategory: z.string({ required_error: "Alt kategori seçmelisin." }),
        newSubCategory: z.string(),
        category: z.string({ required_error: "Kategori seçmelisin." }),
        newCategory: z.string(),
    })
    .superRefine(
        (
            {
                category,
                subCategory,
                brand,
                newCategory,
                newSubCategory,
                newBrand,
            },
            ctx
        ) => {
            if (category === "newCategory" && newCategory.length < 1) {
                ctx.addIssue({
                    code: "custom",
                    path: ["newCategory"],

                    message: "Yeni kategori girmelisin.",
                });
            }

            if (subCategory === "newSubCategory" && newSubCategory.length < 1) {
                ctx.addIssue({
                    code: "custom",
                    path: ["newSubCategory"],

                    message: "Yeni alt kategori girmelisin.",
                });
            }

            if (brand === "newBrand" && newBrand.length < 1) {
                ctx.addIssue({
                    code: "custom",
                    path: ["newBrand"],

                    message: "Yeni marka girmelisin.",
                });
            }
        }
    );
