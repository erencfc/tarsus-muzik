export const formatPrice = (price: number) => {
    return (
        price
            .toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
            })
            .slice(1) + " TL"
    );
};

export const formatSlug = (category: string) => {
    let lower = category.toLowerCase();
    lower = lower.replace(/ç/g, "c");
    lower = lower.replace(/ğ/g, "g");
    lower = lower.replace(/ı/g, "i");
    lower = lower.replace(/ö/g, "o");
    lower = lower.replace(/ş/g, "s");
    lower = lower.replace(/ü/g, "u");
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
    let slug = "";

    for (let i = 0; i < lower.length; i++) {
        if (allowed.indexOf(lower[i]) !== -1) {
            slug += lower[i];
        } else {
            slug += "-";
        }
    }

    slug = slug.replace(/-{2,}/g, "-");
    slug = slug.replace(/^-+|-+$/g, "");
    return slug;
};

export const getPath = (category: string, sub_category?: string) => {
    return `/kategori/${category}${sub_category ? `/${sub_category}` : ""}`;
};

export const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
};

export const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString("tr-TR", {
        hour: "numeric",
        minute: "numeric",
    });
};
