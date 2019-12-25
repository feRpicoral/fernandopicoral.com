'use-strict';

(function () {

    let f =  $('footer:first');


    window.addEventListener("scroll", (function() {
            //Fade and show (hidden to avoid bugs on page load) footer
            f.removeClass('invisible');
            fadeOnScroll(f[0], "in");
        }
    ));

    f.children('h1').click(function () {
        window.scrollTo(0,0);
    });

    for (let a of f.children('ul').children('a')) {
        let token = $(a).children('i')[0].classList[1];
        switch (token) {
            case 'f':
                $(a).remove();
                a.href = "https://www.facebook.com/fernandopicora";
                break;
            case 't':
                $(a).remove();
                a.href = "https://twitter.com/fe_picoral";
                break;
            case 'r':
                $(a).remove();
                a.href = "https://www.reddit.com/u/fpicoral";
                break;
            case 'l':
                a.href = "https://www.linkedin.com/in/fernando-picoral-51173a35/";
                break;
            case 'm':
                continue;
            case 'i':
                $(a).remove();
                a.href = "https://www.instagram.com/fernandopicoral/";
                break;

        }
    }
})();