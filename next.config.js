import webpack from "webpack";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.net = false;
            config.resolve.fallback.tls = false;
            config.resolve.fallback.perf_hooks = false;
            config.resolve.fallback.fs = false;
        }

        config.plugins.push(
            new webpack.IgnorePlugin({
                resourceRegExp:
                    /^pg-native$|^cloudflare:sockets$|^node:stream$/,
            }),
        );

        // Grab the existing rule that handles SVG imports
        // @ts-ignore - rules is a private property that is not typed
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg"),
        );

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/],
                }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
    pageExtensions: ["ts", "tsx"],
};

export default config;
