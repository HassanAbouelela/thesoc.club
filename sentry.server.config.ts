// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isVercel = process.env.VERCEL === "true";

if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        debug: false,
        tracesSampleRate: isVercel ? 1 : 0.25,

        environment: isVercel ? "vercel" : "production",
        initialScope: {
            tags: {
                "vercel": isVercel,
                "branch": process.env.BRANCH,
                "pull": process.env.VERCEL_GIT_PULL_REQUEST_ID,
                "side": "server",
            },
        },
    });
}
