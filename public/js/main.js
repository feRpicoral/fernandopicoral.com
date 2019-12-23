(function () {
    'use-strict';

    //Shortcut to get object length
    Object.defineProperties(Object.prototype, {
        length: {
            get() {
                return Object.keys(this).length;
            },
            enumerable: false,
        }
    });

    //Init BS4 tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    const $dom = {
        menu: $('#menu-screen'),
        body: $('body:first'),
        html: $('html:first'),
        breakpoint: (function () {
            //Based on BS4 v4.4.1 breakpoints
            const w = document.documentElement.offsetWidth;
            let bp = 'xs';
            if (w > 576) {
                bp = 'sm';
            }
            if (w > 768) {
                bp = 'md';
            }
            if (w > 992) {
                bp = 'lg';
            }
            if (w > 1200) {
                bp = 'xl';
            }
            return bp;
        })(),
        getMenuBtn: function (text) {
            let obj;
            $.each($('.menu-link'), function () {
                if ($(this).text() == text) {
                    obj = $(this);
                }
            });
            return obj;
        },
        triedContactSubmission: false,
        contactForm: null,
    };

    function fadeOnScroll(e,type) {
        let n, o;
        let r = window.pageYOffset || document.documentElement.scrollTop;
        let a = document.documentElement.offsetHeight - window.innerHeight - r;

        switch ($dom.breakpoint) {
            case "sm":
                a += 1400;
                break;
            case "md":
                a += 1250;
                break;
            case "lg":
                a += 550;
                break;
            case "xl":
                a += 500;
                break;
            default:
                //xs breakpoint
                a += 1600;
        }

        (n = 1 - ("in" === type ? a : r) / (e.offsetHeight / 2)) <= 0 ? (n = 0,
            o = "hidden") : o = "visible",
        n > 1 && (n = 1),
            e.style.visibility = o,
            e.style.opacity = n
    }

    const menu = {
        toggle: function () {
            $dom.html.toggleClass("overflow-h");
            $dom.body.toggleClass("overflow-h");
            $dom.menu.toggleClass('menu-open');
        },
        buttons: {
            toggle: $("#menu-toggle-a"),
            home: $dom.getMenuBtn("home"),
            projects: $dom.getMenuBtn("projects"),
            skills: $dom.getMenuBtn("skills"),
            contact: $dom.getMenuBtn("contact"),
            other: $dom.getMenuBtn("other")

        }
    };

    const contact = {
        addEventListener: (function () {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function (form) {
                $dom.contactForm = form;
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                        $dom.triedContactSubmission = true;
                    }
                    form.classList.add('was-validated');
                });
            });
        })(),
        onChange: $(".contact-form").change(function () {
            if ($dom.triedContactSubmission) {
                $dom.contactForm.classList.add('was-validated');
            }
        })
    };


    menu.buttons.toggle.click(function(){menu.toggle()});

//Handle menu links on hover
    $.each($('.menu-link'), function () {
        $(this).hover(function () {
            $(this).toggleClass('rainbow-text');
        });
    });

    window.addEventListener("scroll", (function() {
            //Fade logo
            fadeOnScroll(document.querySelector(".logo-wrap"), "out");

        }
    ));

    window.addEventListener("scroll", (function() {
            //Fade and show (hidden to avoid bugs on page load) footer
            let f = document.querySelector("footer");
            $(f).removeClass('invisible');
            fadeOnScroll(f, "in");
        }
    ));

//Handle menu buttons scroll
    $.each(menu.buttons, function (index, btn) {
        if (btn.hasClass('menu-link')) {
            btn.click(function () {
                menu.toggle();

                if (btn.text() == 'home') {
                    window.scrollTo(0,0);
                } else {
                    let targetID = "#" + btn.text() + "-wrap";
                    try {
                        $([document.documentElement, document.body]).animate({
                            scrollTop: $(targetID).offset().top - 100
                        }, 500);
                    } catch (e) {
                        console.error("Couldn't scroll to '" + targetID + "'. Element not found.");
                    }
                }

            });
        }
    });

    let projects = {
        idPrefix: "project-",
        //Projects HTML storage
        list: {
            //TODO Add projects
            istudi: {
                innerHtml: "<div class=\"w-100 h-100 project-content \"> <div class=\"p-title\"> <h1>Project Title</h1> <h2>This is the first project</h2> </div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores beatae consectetur consequatur corporis deserunt doloremque esse facere fugit illum obcaecati perferendis possimus ratione rerum, sapiente sint sit tempora vel.</p></div><a class=\"btn-see-more btn btn-primary\"><span>show more</span><i class=\"fal fa-caret-down\"></i></a> <div class=\"see-more w-100 my-4 h-100 d-none\"> <div class=\"row\"> <div class=\"col-12 col-lg-6\"> <img src=\"/img/html-code.jpg\" class=\"img-fluid img-thumbnail\" alt=\"\"> </div><div class=\"col-12 col-lg-6 mt-4 mt-lg-auto\"> <img src=\"/img/html-code.jpg\" class=\"img-fluid img-thumbnail\" alt=\"\"> </div></div></div><div class=\"p-btns d-flex align-items-center justify-content-center mt-3 mb-2\"> <span data-toggle=\"tooltip\" data-placement=\"left\" title=\"Soon\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline btn-outline-success demo-btn mr-3 disabled\">Demo</a> </span> <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Private project\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline github-btn disabled\"><i class=\"fab fa-github\"></i></a> </span> </div>"
            },
            codeIt: {
                innerHtml: "<div class=\"w-100 h-100 project-content \"> <div class=\"p-title\"> <h1>Project Title</h1> <h2>This is the second project</h2> </div> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores beatae consectetur consequatur corporis deserunt doloremque esse facere fugit illum obcaecati perferendis possimus ratione rerum, sapiente sint sit tempora vel.</p> </div> <div class=\"p-btns d-flex align-items-center justify-content-center mt-5 mb-2\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline btn-outline-success demo-btn mr-3\">Demo</a> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline github-btn\"><i class=\"fab fa-github\"></i></a> </div>"
            },
            restaurantSystem: {
                innerHtml: "<div class=\"w-100 h-100 project-content \"> <div class=\"p-title\"> <h1>Project Title</h1> <h2>This is the third project</h2> </div> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores beatae consectetur consequatur corporis deserunt doloremque esse facere fugit illum obcaecati perferendis possimus ratione rerum, sapiente sint sit tempora vel.</p> </div> <div class=\"p-btns d-flex align-items-center justify-content-center mt-5 mb-2\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline btn-outline-success demo-btn mr-3\">Demo</a> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline github-btn\"><i class=\"fab fa-github\"></i></a> </div>"
            }
        },
        order: ['istudi', 'codeIt', 'restaurantSystem'],
        current: '', //Project being displayed. If empty, the first from order array will be selected
        showPage: function (wrapId) {
            if (wrapId[0] !== "#") {
                wrapId = "#" + wrapId;
            }
            let w = $(wrapId);
            if (w.hasClass('d-none')) {
                w.removeClass('d-none');
            }
        },
        hidePage: function (wrapId) {
            if (wrapId[0] !== "#") {
                wrapId = "#" + wrapId;
            }
            let w = $(wrapId);
            if (!w.hasClass('d-none')) {
                w.addClass('d-none');
            }
        }

    };

    //Add idSuffix to each project. Has to be done this way to avoid repetition and increase compatibility
    (function (p = projects) {
        for (let [key, value] of Object.entries(p.list)) {
            p.list[key].idSuffix = key;
        }
    })();

    //Add project elements
    (function (wrap = $('.project-content-wrap'), p = projects) {
        for (let el of p.order) {

            let debugging = false;
            //Debugger. Set page name being added manually here so it doesn't get duplicated
            if (el === "istudi" && debugging) {
                continue;
            }

            let obj = p.list[el];
            let divWrap = document.createElement('div');
            let divContent = document.createElement('div');

            divWrap.id = p.idPrefix + obj.idSuffix;
            wrap[0].appendChild(divWrap);

            $(divContent).addClass("w-100 h-100 project-content");
            divContent.innerHTML = obj.innerHtml;

            p.hidePage(divWrap.id);

            if (el === p.order[0] && !debugging) {
                p.showPage(divWrap.id);
            }

            divWrap.appendChild(divContent);
        }
    })();

    //Set projects section on bottom of viewport
    (function (pHeader = $('.projects-header'), newMargin) {
        newMargin = (window.innerHeight - pHeader.offset().top - pHeader.innerHeight() + 100) + "px";
        $('#projects-wrap').css('margin-top', newMargin);
    })();

    //Add page dots below projects
    (function (p = projects, numOfProjects, div) {
        numOfProjects = p.list.length;

        let projectsArr = p.order.slice();

        div = document.createElement('div');
        div.id = "projects-page-dots-wrap";
        for (let i = 0; i < numOfProjects; i++) {
            let linkedPageID = p.idPrefix + projectsArr[0];
            projectsArr.shift();
            div.innerHTML += "<i class=\"fas fa-circle page-dot\" data-linked-page='#" + linkedPageID + "'></i>";
        }
        $('.page-dot-col')[0].appendChild(div);
        div.children[0].classList.add('page-dot-active');
    })();

    //Handle see more button
    (function () {

        let btn = $('.btn-see-more');
        let el = $('.see-more');

        let text = {
          current: function () {
            return btn.find('span').text();
          },
          seeMoreHtml: "<span>show more</span><i class=\"fal fa-caret-down\"></i>",
          seeLessHtml: "<span>show less</span><i class=\"fal fa-caret-up\"></i>"
        };

        btn.click(function () {
            //TODO Add animation to button change
            if (text.current() === 'show more') {
                //Show
                btn.html(text.seeLessHtml);
                el.toggleClass('d-none', false);
            } else {
                //Hide
                btn.html(text.seeMoreHtml);
                el.toggleClass('d-none', true);
            }
        });
    })();

    //Make sure skills columns are equal height
    //TODO Make lists aligned by center
    (function () {
        let cols = $('.skills-col');
        let highest = cols[0].offsetHeight;

        for (let col of cols) {
            if (col.offsetHeight > highest) {
                highest = col.offsetHeight;
            }
        }
        for (let col of cols) {
            col.style.minHeight = highest + "px";
        }

    })();

    //TODO Add mobile compatibility - maybe just scale things nicely, to avoid a headache with dragging
    //Handle next/previous project buttons and dots
    (function (pWrap = $('.project-content-wrap'), p = projects) {

        let previous;

        if (p.current == '') {
            p.current = p.order[0]
        } else {
            let currentPageId = "#" + p.idPrefix + p.list[p.current].idSuffix;

            for (let e of $('.project-content-wrap').children()) {
                e.classList.add('d-none');
            }
            p.showPage(currentPageId);
            updateArrows();
            updatePageDot();
        }


        $('.a-btn-control.a-btn-nxt').click(function () {

            $('.a-btn-control.a-btn-bfr').removeClass('invisible');

            if (p.current !== p.order[p.order.length - 1]) {
                previous = p.current;

                p.current = p.order[p.order.indexOf(p.current)+ 1];
                if (p.current === p.order[p.order.length - 1]) {
                    $('.a-btn-control.a-btn-nxt').addClass('invisible');
                }

                p.hidePage(p.idPrefix + p.list[previous].idSuffix);
                p.showPage(p.idPrefix + p.list[p.current].idSuffix);

                updatePageDot()

            }

        });


        $('.a-btn-control.a-btn-bfr').click(function () {

            $('.a-btn-control.a-btn-nxt').removeClass('invisible');

            if (p.current !== p.order[0]) {
                previous = p.current;

                p.current = p.order[p.order.indexOf(p.current) - 1];
                if (p.current === p.order[0]) {
                    $('.a-btn-control.a-btn-bfr').addClass('invisible');
                }

                p.hidePage(p.idPrefix + p.list[previous].idSuffix);
                p.showPage(p.idPrefix + p.list[p.current].idSuffix);

                updatePageDot()
            }
        });

        //Handle page dot click
        $.each($('#projects-page-dots-wrap').children(), function (index, item) {

            $(item).click(function () {
                let active = $('.page-dot-active');
                if ($(item) !== active) {
                    active.toggleClass('page-dot-active', false);
                    $(this).toggleClass('page-dot-active', true);

                    let linkedPageId = $(this).attr('data-linked-page');

                    previous = p.current;
                    p.current = linkedPageId.replace('#' + p.idPrefix,'');

                    p.hidePage(p.idPrefix + p.list[previous].idSuffix);
                    p.showPage(p.idPrefix + p.list[p.current].idSuffix);

                    updateArrows();
                }
            });
        });

        //Only to be called when changing views using the arrows due to its dependencies
        function updatePageDot() {
            if (p.current) {
                $('.page-dot-active').toggleClass('page-dot-active', false);
                let currentId = "#" + p.idPrefix + p.list[p.current].idSuffix;
                for (let dot of $('#projects-page-dots-wrap').children()) {
                    if(dot.getAttribute('data-linked-page') === currentId) {
                        $(dot).addClass('page-dot-active');
                    }
                }
            } else {
                console.error("Couldn't update the active page dot because the current page was not set yet")
            }
        }

        function updateArrows() {
            if (p.current === p.order[0]) {
                //Changed to first page
                $('.a-btn-control.a-btn-bfr').addClass('invisible');
                $('.a-btn-control.a-btn-nxt').removeClass('invisible');
            } else {
                if (p.current === p.order[p.order.length - 1]) {
                    //Changed to last page
                    $('.a-btn-control.a-btn-bfr').removeClass('invisible');
                    $('.a-btn-control.a-btn-nxt').addClass('invisible');
                } else {
                    //Changed to random page, not the first nor the last
                    $('.a-btn-control.a-btn-nxt').removeClass('invisible');
                    $('.a-btn-control.a-btn-bfr').removeClass('invisible');
                }
            }
        }
    })();

    //Handle footer links
    (function () {
        let f =  $('footer:first');

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

//END Wrapper function
})();


