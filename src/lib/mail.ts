import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "Tarsus Müzik Market <tarsusmuzik@resend.dev>",

        to: email,
        subject: "Hesap Doğrulama | Tarsus Müzik Market",
        html:
            `<p>Merhaba,</p>` +
            `<p>Üyeliğinizi tamamlamak için lütfen <a href="${confirmLink}">buraya</a> tıklayın.</p>` +
            `<p>Doğrulama linki 1 saat içinde geçersiz olacaktır.</p>`,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "Tarsus Müzik Market <tarsusmuzik@resend.dev>",
        to: email,
        subject: "Şifre Sıfırlama | Tarsus Müzik Market",
        html:
            `<p>Merhaba,</p>` +
            `<p>Şifrenizi sıfırlamak için lütfen <a href="${confirmLink}">buraya</a> tıklayın.</p>` +
            `<p>Sıfırlama linki 1 saat içinde geçersiz olacaktır.</p>`,
    });
};
