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

    return config;
  },
};

export default config;
