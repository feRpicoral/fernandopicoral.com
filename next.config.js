// https://nextjs.org/docs/api-reference/next.config.js/introduction

/** @type {import("next").NextConfig} */
module.exports = {
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        return config;
    },
    experimental: {
        styledComponents: true
    },
};
