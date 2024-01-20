import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `https://tarsus-muzik-production.up.railway.app/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "Hesaplı Müzik Aletleri <hesaplimuzikaletleri@resend.dev>",

        to: email,
        subject: "Hesap Doğrulama | Hesaplı Müzik Aletleri",
        html:
            `<p>Merhaba,</p>` +
            `<p>Üyeliğinizi tamamlamak için lütfen <a href="${confirmLink}">buraya</a> tıklayın.</p>` +
            `<p>Doğrulama linki 1 saat içinde geçersiz olacaktır.</p>`,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `https://tarsus-muzik-production.up.railway.app/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "Hesaplı Müzik Aletleri <hesaplimuzikaletleri@resend.dev>",
        to: email,
        subject: "Şifre Sıfırlama | Hesaplı Müzik Aletleri",
        html:
            `<p>Merhaba,</p>` +
            `<p>Şifrenizi sıfırlamak için lütfen <a href="${confirmLink}">buraya</a> tıklayın.</p>` +
            `<p>Sıfırlama linki 1 saat içinde geçersiz olacaktır.</p>`,
    });
};
