export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/hesabim", "/api/auth/session"],
};
