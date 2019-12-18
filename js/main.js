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



const $dom = {
    menu: $('#menu-screen'),
    body: $('body:first'),
    html: $('html:first'),
    fadeOnScroll: function(e,type) {
        let n, o;
        const r = window.pageYOffset || document.documentElement.scrollTop;
        const a = document.documentElement.offsetHeight - window.innerHeight - r;

        (n = 1 - ("in" === type ? a : r) / (e.offsetHeight / 2)) <= 0 ? (n = 0,
            o = "hidden") : o = "visible",
        n > 1 && (n = 1),
            e.style.visibility = o,
            e.style.opacity = n
    },
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
        about: $dom.getMenuBtn("about"),
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
        //in or out
        $dom.fadeOnScroll(document.querySelector(".logo-wrap"), "out")
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
        istudi: {
            innerHtml: "<h1 style=\"color: #ffffff; font-size: 50px\">iStudi</h1>\n<p class=\"mt-5\" style=\"color: #ffffff; font-size: 40px\">And I'm the content of this project!</p>"
        },
        codeIt: {
            innerHtml: "<h1 style=\"color: #ffffff; font-size: 50px\">Code-It</h1>\n<p class=\"mt-5\" style=\"color: #ffffff; font-size: 40px\">And I'm the content of this other project!</p>"
        },
        restaurantSystem: {
            innerHtml: "<h1 style=\"color: #ffffff; font-size: 50px\">Restaurant</h1>\n<p class=\"mt-5\" style=\"color: #ffffff; font-size: 40px\">And I'm the content of this last project!</p>"

        }
    },
    order: ['istudi', 'codeIt', 'restaurantSystem'],
    current: '', //Project being displayed. If empty, the first from order array will be selected
};

//Add idSufix to each project. Has to be done this way to avoid repetition and increase compatibility
(function (p = projects) {
    for (let [key, value] of Object.entries(p.list)) {
        p.list[key].idSufix = key;
    }
})();

//Add project elements
(function (wrap = $('.project-content-wrap'), p = projects) {
    for (let el of p.order) {
        let obj = p.list[el];
        let div = document.createElement('div');
        div.id = p.idPrefix + obj.idSufix;
        div.classList.add("w-100");
        div.innerHTML = obj.innerHtml;
        div.classList.add('d-none');

        if (el === p.order[0]) {
            div.classList.remove('d-none'); //TODO May need to change this to work with p.current
        }

        wrap[0].appendChild(div);
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

    // for (let el of p.order) {
    //     projectsArr.push(p.list[el])
    // }

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

//TODO Add mobile compatibility - maybe just scale things nicely, to avoid a headache with dragging
//Handle next/previous project buttons and dots
(function (pWrap = $('.project-content-wrap'), p = projects) {

    let previous;

    if (p.current == '') {
        p.current = p.order[0]
    } else {
        let currentPageId = "#" + p.idPrefix + p.list[p.current].idSufix;

        for (let e of $('.project-content-wrap').children()) {
            e.classList.add('d-none');
        }
        $(currentPageId).removeClass('d-none');

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

            $("#" + p.idPrefix + p.list[previous].idSufix).addClass('d-none');
            $("#" + p.idPrefix + p.list[p.current].idSufix).removeClass('d-none');
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
            $("#" + p.idPrefix + p.list[previous].idSufix).addClass('d-none');
            $("#" + p.idPrefix + p.list[p.current].idSufix).removeClass('d-none');
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

                $("#" + p.idPrefix + p.list[previous].idSufix).addClass('d-none');
                $("#" + p.idPrefix + p.list[p.current].idSufix).removeClass('d-none');

                updateArrows();
            }
        });
    });

    //Only to be called when changing pages using the arrows due to its dependencies
    function updatePageDot() {
        if (p.current) {
            $('.page-dot-active').toggleClass('page-dot-active', false);
            let currentId = "#" + p.idPrefix + p.list[p.current].idSufix;
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

