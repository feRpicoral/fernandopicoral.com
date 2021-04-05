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
    }
});
