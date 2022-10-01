// https://nextjs.org/docs/api-reference/next.config.js/introduction

/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        return config;
    },
    compiler: {
        styledComponents: true
    }
};
