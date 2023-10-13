// @ts-check
/** Configure webpack setup */
const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");


/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    env: {
        VERCEL: process.env.VERCEL || "false",
        BRANCH: process.env.VERCEL_GIT_COMMIT_REF || "main",
        VERCEL_GIT_PULL_REQUEST_ID: process.env.VERCEL_GIT_PULL_REQUEST_ID,
        URL: process.env.DEPLOY_URL || process.env.URL || "https://thesoc.club/",
        SENTRY_DSN: process.env.SENTRY_DSN,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "app")]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
            },
        ],
    },
};

/** @type {import("@sentry/nextjs").SentryWebpackPluginOptions} */
const sentryWebpackOptions = {
    org: "soc-club",
    project: "site",

    silent: true,
    ignoreFile: ".gitignore",
    validate: true,
}

/** @type {import("@sentry/nextjs/types/config/types").UserSentryOptions} */
const sentryOptions = {
    widenClientFileUpload: true,
    tunnelRoute: "/api/reporting",
    autoInstrumentServerFunctions: true,
    autoInstrumentAppDirectory: true,
    transpileClientSDK: true,
    hideSourceMaps: true,
    disableLogger: true,
}

// Only enable sentry plugin when DSN is set
if (process.env.SENTRY_DSN) {
    module.exports = withSentryConfig(nextConfig, sentryWebpackOptions, sentryOptions);
} else {
    module.exports = nextConfig;
}
