'use-strict';

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
    breakpoint: function () {
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
    },
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


$.each(menu.buttons, function (index, btn) {
    if (btn.hasClass('menu-link')) {
        btn.click(function () {
            menu.toggle();

            if (btn.text() == 'home') {
                $([document.documentElement, document.body]).animate({
                    scrollTop: 0
                }, 500);
            } else {
                let targetID = "#" + btn.text() + "-wrap";
                try {
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $(targetID).offset().top - 100
                    }, 500);
                } catch (e) {
                    console.log("ERROR: Couldn't scroll to '" + targetID + "'. Element not found.");
                }
            }

        });
    }
});

//Set projects section on bottom of viewport
window.onload = function () {
    let pHeader = $('.projects-header');
    let newMargin = (window.innerHeight - pHeader.offset().top - pHeader.innerHeight() + 100) + "px";
    $('#projects-wrap').css('margin-top', newMargin);
};









