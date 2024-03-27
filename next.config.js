/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const env = await import("./src/env.js");

let image_url
try {
  image_url = new URL(env.env.NEXT_PUBLIC_UPLOAD_BASE);
} catch (e) {
  image_url = {
    pathname: env.env.NEXT_PUBLIC_UPLOAD_BASE,
  }
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: image_url.protocol?.slice(0, -1) ?? 'http',
        hostname: image_url.hostname ?? 'localhost',
        port: (image_url.port ?? '80').length > 0 ? (image_url.port ?? '80') : '443',
        pathname:  image_url.pathname + '**'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

console.log(config.images?.remotePatterns)

export default config;
