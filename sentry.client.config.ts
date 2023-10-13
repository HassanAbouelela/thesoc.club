// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isVercel = process.env.VERCEL === "true";

if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        debug: false,

        environment: isVercel ? "vercel" : "production",
        initialScope: {
            tags: {
                "vercel": isVercel,
                "branch": process.env.BRANCH,
                "pull": process.env.VERCEL_GIT_PULL_REQUEST_ID,
                "side": "client",
            },
        },

        autoSessionTracking: true,
        sampleRate: 1,
        tracesSampleRate: isVercel ? 1 : 0.25,
        replaysSessionSampleRate: 1,
        replaysOnErrorSampleRate: 1.0,

        integrations: [],
    });
}
