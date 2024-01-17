import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import {
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_LOGIN_PATH,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    adminRoutes,
} from "@/routes";
import { Role } from "@prisma/client";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

    // console.log("ROUTE: ", nextUrl.pathname);
    // console.log("IS LOGGED IN: ", isLoggedIn);
    // console.log("USER ROLE: ", userRole);
    // console.log("IS API AUTH ROUTE: ", isApiAuthRoute);
    // console.log("IS PUBLIC ROUTE: ", isPublicRoute);
    // console.log("IS AUTH ROUTE: ", isAuthRoute);
    // console.log("IS ADMIN ROUTE: ", isAdminRoute);

    if (isAdminRoute) {
        if (userRole !== Role.ADMIN) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return null;
    }

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl));
    }

    return null;
});

export const config = {
    matcher: [
        "/",
        "/auth/:path*",
        "/hesabim/:path*",
        "/api",
        "/login",
        "/register",
        "/api/auth/session",
        "/admin/:path*",
    ],
};
