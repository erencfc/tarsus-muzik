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
