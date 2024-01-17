/**
 * An array of routes that are public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification",
    "/urun/*",
];

/**
 * An array of routes that are accessible by the users with the role of "ADMIN".
 * These routes will redirect users with other roles to the landing page.
 */
export const adminRoutes: string[] = [
    "/admin/dashboard",
    "/admin/dashboard/users",
    "/admin/dashboard/users/new",
    "/admin/dashboard/products",
    "/admin/dashboard/products/new",
    "/admin/dashboard/orders",
    "/admin/dashboard/coupons",
];

/**
 * An array of routes that require authentication.
 * These routes will redirect logged in users to the landing page.
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/login",
    "/register",
    "/forgot-password",
    "/auth/new-password",
];

/**
 * The prefix for the API authentication routes.
 * Routes that start with this prefix are used for authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";

/**
 * The default redirect path for login page.
 * @type {string}
 */
export const DEFAULT_LOGIN_PATH: string = "/login";

/**
 * The default redirect path for register page.
 * @type {string}
 */
export const DEFAULT_REGISTER_PATH: string = "/register";

/**
 * The default redirect path for forgot password page.
 * @type {string}
 */
export const DEFAULT_FORGOT_PASSWORD_PATH: string = "/forgot-password";
