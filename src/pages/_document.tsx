import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/*
 * SSR config for styled components
 * https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
 */

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="Fernando Picoral's portfolio website. I'm a full stack web developer with experience in React & Javascript"
                    />
                    <meta name="robots" content="notranslate" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Roboto:wght@100;300&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
