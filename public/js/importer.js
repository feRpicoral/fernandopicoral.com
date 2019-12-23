/*
* Copyright (c) 2019 Fernando Picoral
*
* Auto Importer v0.2
*
* Usage:
*
* Set to 'true' the libraries you want to import on lines 16 to 21
* Link this script to you .html file using <script src='...' type='text/javascript'><script/>
* If needed alter the CDNs URLs and other configs on lines 28 to 53
*
* Default Values:
* - Everything is set to 'true'
* - jQuery 3.4.1
* - Popper 1.16.0
* - BS4 4.4.1
* - FA Pro 5.11.2
* - AOS.init({ once: true });
*
*/

let Importer = class  {

    constructor(config = {
        jquery: true,
        popper: true, //BS4 requirement
        bs4_js: true,
        bs4_css: true,
        fa_pro: true,
        aos: true //AOS Animations
    }) {

        this.config = config;

        this.cdn = {
            jquery: 'https://code.jquery.com/jquery-3.4.1.min.js',
            popper: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
            bs4_js: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
            bs4_css: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
            fa_pro: 'https://kit-pro.fontawesome.com/releases/v5.11.2/css/pro.min.css',
            aos_css: 'https://unpkg.com/aos@next/dist/aos.css',
            aos_js: 'https://unpkg.com/aos@next/dist/aos.js'
        };

        this.integrity = {
            jquery: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=',
            popper: 'sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo',
            bs4_js: 'sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6',
            bs4_css: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh'
        };

        this.crossorigin = {
            jquery: 'anonymous',
            popper: 'anonymous',
            bs4_js: 'anonymous',
            bs4_css: 'anonymous'
        };

        //DON'T use "double quotes" on string values here, only 'single quotes'
        this.aos_config = {
            once: true
        };
    }

    init() {

        let config = this.config;
        let cdn = this.cdn;
        let integrity = this.integrity;
        let crossorigin = this.crossorigin;
        let aos_config = this.aos_config;

        let head = document.getElementsByTagName('head')[0];

        //Repetition needed. Using the same element causes a bug and creates only one of the instances

        if (config.jquery) {
            let comment = document.createComment('');
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = false;

            script.src = cdn.jquery;
            script.integrity = integrity.jquery;
            script.crossOrigin = crossorigin.jquery;
            comment.data = "jQuery";
            head.appendChild(comment);
            head.appendChild(script);
        }
        if (config.popper) {
            let comment = document.createComment('');
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = false;

            script.src = cdn.popper;
            script.integrity = integrity.popper;
            script.crossOrigin = crossorigin.popper;
            comment.data = "Popper";
            head.appendChild(comment);
            head.appendChild(script);
        }
        if (config.bs4_js) {
            let comment = document.createComment('');
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;

            script.src = cdn.bs4_js;
            script.integrity = integrity.bs4_js;
            script.crossOrigin = crossorigin.bs4_js;
            comment.data = "Bootstrap 4 JS";
            head.appendChild(comment);
            head.appendChild(script);
        }
        if (config.bs4_css) {
            let comment = document.createComment('');
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';

            link.href = cdn.bs4_css;
            link.integrity = integrity.bs4_css;
            link.crossOrigin = crossorigin.bs4_css;
            comment.data = "Bootstrap 4 CSS";
            head.appendChild(comment);
            head.appendChild(link);
        }
        if (config.fa_pro) {
            let comment = document.createComment('');
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';

            link.href = cdn.fa_pro;
            comment.data = "FontAwesome Pro 4 CSS";
            head.appendChild(comment);
            head.appendChild(link);
        } if (config.aos) {
            let comment = document.createComment('');
            //JS
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;

            script.src = cdn.aos_js;
            comment.data = "AOS Animations";
            head.appendChild(comment);
            head.appendChild(script);

            //CSS
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';

            link.href = cdn.aos_css;
            head.appendChild(link);

            //Init
            let aos_init = document.createElement('script');
            aos_init.type = 'text/javascript';
            aos_init.text = "window.onload = function() { AOS.init(" + JSON.stringify(aos_config).replace(/['"]+/g, '') + "); };";
            head.appendChild(aos_init);

        }
    }
};

//Self Init
(function(){
    let head = document.getElementsByTagName('head')[0];
    let comment = document.createComment('');
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = "let I = new Importer();I.init();";
    comment.data = "Importer Init";
    head.appendChild(comment);
    head.appendChild(script);
})();



