/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { CLIENT_STATIC_FILES_PATH } = require('next/constants');

const generateSiteMap = () => {
    const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        '    <url>\n' +
        '        <loc>https://www.fernandopicoral.com/</loc>\n' +
        '    </url>\n' +
        '</urlset>';

    const dir = `.next/${CLIENT_STATIC_FILES_PATH}`;
    if (!fs.existsSync(dir))
        throw new Error('Static directory not found, cannot generate sitemap');

    fs.writeFileSync(`${dir}/sitemap.xml`, sitemap);
};

generateSiteMap();
