// https://nextjs.org/docs/api-reference/next.config.js/introduction

module.exports = (phase, { defaultConfig }) => ({
    ...defaultConfig,
    env: {
        /*
         * Add env variables here
         * The ones that must be accessible from the app should be
         * prefixed with NEXT_PUBLIC_
         */
        ...defaultConfig.env
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts|jsx|tsx)x?$/
            },
            use: ['@svgr/webpack']
        });

        return config;
    }
});
