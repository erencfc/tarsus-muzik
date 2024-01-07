/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "images.unsplash.com" },
            { hostname: "i.dummyjson.com" },
            { hostname: "ideacdn.net" },
        ],
    },
};

module.exports = nextConfig;
