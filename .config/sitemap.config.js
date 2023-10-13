// @ts-check
/** Configure next-sitemap generation. */

/** @type {import("next-sitemap").IRobotPolicy[]} */
robotPolicies = [
    {userAgent: "*", allow: "/"},
];

/**
 * @type {import("next-sitemap").IRobotPolicy[]}
 * Don't index preview deployments site.
 * */
previewRobotPolicies = [{userAgent: "*", disallow: "/"}];

/** @type {import("next-sitemap").IConfig} */
module.exports = {
    siteUrl: process.env.VERCEL_URL || process.env.URL || "https://thesoc.club/",
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: process.env.CI === "1" ? previewRobotPolicies : robotPolicies,
    }
}
