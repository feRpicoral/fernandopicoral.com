'use-strict';

/*
* Add length to Object prototype.
*
* Shortcut to Object.keys(o).length.
*
* @return {number} Object length
*/
Object.defineProperties(Object.prototype, {
    length: {
        get() {
            return Object.keys(this).length;
        },
        enumerable: false,
    }
});

/*
* Utilities class with only static methods.
*
* @static getBreakpoint, fadeOnScroll, getUrlParameter*/
class Utils {

    /*
    * Get screen breakpoint.
    *
    * Get screen breakpoint based on Bootstrap 4 breakpoints.
    *
    * @return {string} Two characters breakpoint from 'xs' to 'xl'.
    */
    static getBreakpoint() {
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
    }

    /*
    * Fade elements on scroll.
    *
    * Fade in or out elements when scrolled by or approaching.
    *
    * @param {object} e    DOM element to be faded.
    * @param {string} type Desired fade type, 'in' or 'out.
    *
    * @return {undefined}
    */
    static fadeOnScroll(e,type) {
        let n, o;
        let r = window.pageYOffset || document.documentElement.scrollTop;
        let a = document.documentElement.offsetHeight - window.innerHeight - r;

        switch (Utils.getBreakpoint()) {
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

    /*
    * Get URL GET parameters.
    *
    * @param {string} param Param to be get.
    *
    * @return {string} Value of the URL parameter.
    */
    static getUrlParameter(param) {
        var url = window.location.search.substring(1),
            urlParams = url.split('&'),
            paramName,
            i;

        for (i = 0; i < urlParams.length; i++) {
            paramName = urlParams[i].split('=');

            if (paramName[0] === param) {
                return paramName[1] === undefined ? true : decodeURIComponent(paramName[1]);
            }
        }
    }
}

/*
* Handles the menu. Needs initialization.
* 
* Handles all the menu related buttons and screens.
* 
* @methods handleMenuBtn, handleLinkHover
* @static toggle, getButton (deprecated)
*/
class Menu {
    constructor() {
        this.handleMenuBtn();
        this.handleLinkHover();
    }

    /*Gives functionality to menu toggle button*/
    handleMenuBtn() {
        $('#menu-toggle-a').click(function () {
            Menu.toggle();
        });
    }
    
    /*
    Handle menu buttons.
    * 
    * Set style on hover and go to section on click.
    */
    handleLinkHover() {
        $.each($('.menu-link'), (index, btn) => {
            btn = $(btn);
            
            btn.hover(() => {
                btn.toggleClass('rainbow-text');
            });
            
            btn.click(() => {
                Menu.toggle();

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
        });
    }
    
    /*Toggle menu screen*/
    static toggle() {
        $(document.documentElement).toggleClass('overflow-h');
        $(document.body).toggleClass('overflow-h');
        $('#menu-screen').toggleClass('menu-open');
    }

    /*
    * Get menu button element.
    *
    * Get menu button element based on its text.
    *
    * @deprecated Function currently deprecated
    *
    * @param {string} text Button text.
    *
    * @return {jQuery element} Button as jQuery element.
    */
    static getButton(text) {
        let o;
        $.each($('.menu-link'), function () {
            if ($(this).text() == text) {
                o = $(this);
            }
        });
        return o;
    }
}

/*
* Project related handling. Needs initialization.
*
* Handles all the project-related methods and variables.
*
* @methods createElements, addPageDots, handleSeeMore, handleArrows, handlePageDots, updateArrows & updatePageDots
* @static setMarginTop & updatePage
*/
class Projects {
    constructor() {
        /*Prefix to be added to projects ids*/
        this.idPrefix = "project-";

        /*List of projects and their contents*/
        this.list = {
            istudi: {
                innerHtml: "<div class=\"w-100 h-100 project-content \"> <div class=\"p-title\"> <h1>First Project</h1> <h2>This is the first project</h2> </div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores beatae consectetur consequatur corporis deserunt doloremque esse facere fugit illum obcaecati perferendis possimus ratione rerum, sapiente sint sit tempora vel.</p></div><a class=\"btn-see-more btn btn-primary\"><span>show more</span><i class=\"fal fa-caret-down\"></i></a> <div class=\"see-more w-100 my-4 h-100 d-none\"> <div class=\"row\"> <div class=\"col-12 col-lg-6\"> <img src=\"/img/html-code.jpg\" class=\"img-fluid img-thumbnail\" alt=\"\"> </div><div class=\"col-12 col-lg-6 mt-4 mt-lg-auto\"> <img src=\"/img/html-code.jpg\" class=\"img-fluid img-thumbnail\" alt=\"\"> </div></div></div><div class=\"p-btns d-flex align-items-center justify-content-center mt-3 mb-2\"> <span data-toggle=\"tooltip\" data-placement=\"left\" title=\"Soon\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline btn-outline-success demo-btn mr-3 disabled\">Demo</a> </span> <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Private project\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline github-btn disabled\"><i class=\"fab fa-github\"></i></a> </span> </div>"
            },
            codeIt: {
                innerHtml: "<div class=\"w-100 h-100 project-content \"> <div class=\"p-title\"> <h1>Second Project</h1> <h2>This is the second project</h2> </div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores beatae consectetur consequatur corporis deserunt doloremque esse facere fugit illum obcaecati perferendis possimus ratione rerum, sapiente sint sit tempora vel.</p></div><a class=\"btn-see-more btn btn-primary\"><span>show more</span><i class=\"fal fa-caret-down\"></i></a> <div class=\"see-more w-100 my-4 h-100 d-none\"> <div class=\"row\"> <div class=\"col-12 col-lg-6\"> <img src=\"/img/html-code.jpg\" class=\"img-fluid img-thumbnail\" alt=\"\"> </div><div class=\"col-12 col-lg-6 mt-4 mt-lg-auto\"> <img src=\"/img/html-code.jpg\" class=\"img-fluid img-thumbnail\" alt=\"\"> </div></div></div><div class=\"p-btns d-flex align-items-center justify-content-center mt-3 mb-2\"> <span data-toggle=\"tooltip\" data-placement=\"left\" title=\"Soon\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline btn-outline-success demo-btn mr-3 disabled\">Demo</a> </span> <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Private project\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline github-btn disabled\"><i class=\"fab fa-github\"></i></a> </span> </div>"
            },
            restaurantSystem: {
                innerHtml: "<div class=\"w-100 h-100 project-content \"> <div class=\"p-title\"> <h1>Third Project</h1> <h2>This is the third project</h2> </div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores beatae consectetur consequatur corporis deserunt doloremque esse facere fugit illum obcaecati perferendis possimus ratione rerum, sapiente sint sit tempora vel.</p></div><a class=\"btn-see-more btn btn-primary\"><span>show more</span><i class=\"fal fa-caret-down\"></i></a> <div class=\"see-more w-100 my-4 h-100 d-none\"> <div class=\"row\"> <div class=\"col-12 col-lg-6\"> <img src=\"/img/html-code.jpg\" class=\"img-fluid img-thumbnail\" alt=\"\"> </div><div class=\"col-12 col-lg-6 mt-4 mt-lg-auto\"> <img src=\"/img/html-code.jpg\" class=\"img-fluid img-thumbnail\" alt=\"\"> </div></div></div><div class=\"p-btns d-flex align-items-center justify-content-center mt-3 mb-2\"> <span data-toggle=\"tooltip\" data-placement=\"left\" title=\"Soon\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline btn-outline-success demo-btn mr-3 disabled\">Demo</a> </span> <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Private project\"> <a href=\"#\" target=\"_blank\" role=\"button\" class=\"btn no-outline github-btn disabled\"><i class=\"fab fa-github\"></i></a> </span> </div>"
            }
        };

        /* Order to be displayed the projects. Names as in this.list keys
        *  If empty, order will be the same as this.list*/
        this.order = [];

        /*Project being displayed currently. If empty the first of this.order will be selected.*/
        this.current = '';

        /*Previous page displayed. Set automatically.*/
        this.previous = '';

        for (let [key, value] of Object.entries(this.list)) {

            /*Add idSuffix key as the properties own name to DRY the code to create the projects elements*/
            this.list[key].idSuffix = key;

            /*Set this.order to this.list keys if empty*/
            if (this.order.length < Object.keys(this.list).length) {
                this.order = Object.keys(this.list);
            }
        }

        /*Set this.current to this.order first item if empty*/
        if (!this.current) {
            this.current = this.order[0];
        }

        /*Initialization finished*/

        Projects.setMarginTop();
        this.createElements();
        this.addPageDots();
        this.handleSeeMore();
        this.handleArrows();
        this.handlePageDots();
    }

    /*Create project elements based on this.list*/
    createElements() {
        const wrap = $('.project-content-wrap');

        for (let el of this.order) {
            let obj = this.list[el];
            let divWrap = document.createElement('div');
            let divContent = document.createElement('div');

            divWrap.id = this.idPrefix + obj.idSuffix;
            wrap[0].appendChild(divWrap);

            $(divContent).addClass("w-100 h-100 project-content");
            divContent.innerHTML = obj.innerHtml;

            Projects.updatePage(divWrap.id, 'hide');

            if (el === this.order[0]) {
                Projects.updatePage(divWrap.id, 'show');
            }

            divWrap.appendChild(divContent);
        }
    }

    /*Add page dots and mobile control arrows below the projects*/
    addPageDots() {
        let arr = this.order.slice();

        let div = document.createElement('div');
        div.id = "projects-page-dots-wrap";
        $(div).addClass('d-flex align-items-center justify-content-center');

        let mobileLeftArrowAdded = false;

        var a = document.createElement('a');
        $(a).addClass('a-btn-control btn-control-mobile d-sm-none mr-2 invisible');
        a.href = 'javascript:void(0)';


        for (let i = 0; i < this.list.length; i++) {
            /*Mobile left arrow*/
            if (!mobileLeftArrowAdded) {
                $(a).addClass('a-btn-bfr');
                a.innerHTML = "<i class=\"fal fa-chevron-left\"></i>";
                mobileLeftArrowAdded = true;
                div.appendChild(a);
            }

            /*Page dots*/
            let linkedPageID = this.idPrefix + arr[0];
            arr.shift();
            div.innerHTML += "<i class=\"fas fa-circle page-dot\" data-linked-page='#" + linkedPageID + "'></i>";
        }

        /*Mobile right arrow*/
        $(a).removeClass('a-btn-bfr invisible mr-2');
        $(a).addClass('a-btn-nxt ml-2');
        a.innerHTML = "<i class=\"fal fa-chevron-right\"></i>";
        div.appendChild(a);

        $('.page-dot-col')[0].appendChild(div);
        div.children[1].classList.add('page-dot-active');
    }

    /* Handles the see more button
    *  @todo Add animation on button change
    */
    handleSeeMore() {
        const btns = $('.btn-see-more');
        let els = $('.see-more').toArray(); //Elements to be affected by the see more button

        let text = {
            current: function (btn) {
                return btn.find('span').text();
            },
            seeMoreHtml: "<span>show more</span><i class=\"fal fa-caret-down\"></i>",
            seeLessHtml: "<span>show less</span><i class=\"fal fa-caret-up\"></i>"
        };

        for (let btn of btns) {
            btn = $(btn);
            btn.click(() => {

                let el = $(els[btns.toArray().indexOf(btn[0])]); //btns[0] to get DOM element, not jQuery reference

                if (text.current(btn) === 'show more') {
                    //Show
                    btn.html(text.seeLessHtml);
                    el.toggleClass('d-none', false);
                } else {
                    //Hide
                    btn.html(text.seeMoreHtml);
                    el.toggleClass('d-none', true);
                }
            });
        }
    }

    /*Handles next & previous arrows*/
    handleArrows() {
        const pWrap = $('.project-content-wrap');
        const nxtBtn = $('.a-btn-control.a-btn-nxt');
        const bfrBtn = $('.a-btn-control.a-btn-bfr');

        if (this.current) {
            let currentId = '#' + this.idPrefix + this.list[this.current].idSuffix;
            for (let e of pWrap.children()) {
                e.classList.add('d-none');
            }
            Projects.updatePage(currentId, 'show');
            this.updateArrows();
            this.updatePageDots();
        }

        nxtBtn.click(() => {
            bfrBtn.removeClass('invisible');

            if (this.current !== this.order[this.order.length - 1]) {
                
                this.previous = this.current;
                this.current = this.order[this.order.indexOf(this.current)+ 1];
                
                if (this.current === this.order[this.order.length - 1]) {
                    nxtBtn.addClass('invisible');
                }

                Projects.updatePage(this.idPrefix + this.list[this.previous].idSuffix, 'hide');
                Projects.updatePage(this.idPrefix + this.list[this.current].idSuffix, 'show');
                this.updatePageDots();
            }
        });

        bfrBtn.click(() => {

            nxtBtn.removeClass('invisible');

            if (this.current !== this.order[0]) {
                this.previous = this.current;

                this.current = this.order[this.order.indexOf(this.current) - 1];
                if (this.current === this.order[0]) {
                    bfrBtn.addClass('invisible');
                }

                Projects.updatePage(this.idPrefix + this.list[this.previous].idSuffix, 'hide');
                Projects.updatePage(this.idPrefix + this.list[this.current].idSuffix, 'show');
                this.updatePageDots();
            }
        });
        
    }
    
    /*Handle page dots*/
    handlePageDots() {
        $.each($('#projects-page-dots-wrap').children(), (index, item) => {

            if (!$(item).hasClass('btn-control-mobile')) {
                $(item).click(() => {
                    let active = $('.page-dot-active');
                    if ($(item) !== active) {
                        active.toggleClass('page-dot-active', false);
                        $(item).toggleClass('page-dot-active', true);

                        let linkedPageId = $(item).attr('data-linked-page');

                        this.previous = this.current;
                        this.current = linkedPageId.replace('#' + this.idPrefix,'');

                        Projects.updatePage(this.idPrefix + this.list[this.previous].idSuffix, ' hide');
                        Projects.updatePage(this.idPrefix + this.list[this.current].idSuffix, 'show');

                        this.updateArrows();
                    }
                });
            }
        });
    }

    /*Update the arrows buttons to match the current page.*/
    updateArrows() {
        const nxtBtn = $('.a-btn-control.a-btn-nxt');
        const bfrBtn = $('.a-btn-control.a-btn-bfr');

        if (this.current === this.order[0]) {
            //Changed to first page
            bfrBtn.addClass('invisible');
            nxtBtn.removeClass('invisible');
        } else {
            if (this.current === this.order[this.order.length - 1]) {
                //Changed to last page
                bfrBtn.removeClass('invisible');
                nxtBtn.addClass('invisible');
            } else {
                //Changed to random page, not the first nor the last
                nxtBtn.removeClass('invisible');
                bfrBtn.removeClass('invisible');
            }
        }
    }

    /*Update the page dots to match the current page.*/
    updatePageDots() {
        if (this.current) {
            $('.page-dot-active').toggleClass('page-dot-active', false);
            let currentId = "#" + this.idPrefix + this.list[this.current].idSuffix;
            for (let dot of $('#projects-page-dots-wrap').children()) {
                if(dot.getAttribute('data-linked-page') === currentId) {
                    $(dot).addClass('page-dot-active');
                }
            }
        } else {
            console.error("Couldn't update the active page dot because the current page was not set yet");
        }
    }

    /*
    * Put projects section on the bottom of the viewport.
    *
    * Change projects section margin-top so it sits at the bottom of the viewport. Called on resize event.
    *
    * @access global
    */
    static setMarginTop() {
        const header = $('.projects-header');
        let newMargin = (window.innerHeight - header.offset().top - header.innerHeight() + 100) + "px";
        $('#projects-wrap').css('margin-top', newMargin);
    }

    /*
    * Show or hide projects page.
    *
    * @access global
    *
    * @param {string} wrapId Project wrap id.
    * @param {string} method Desired method (show or hide).
    */
    static updatePage(wrapId, method) {
        if (wrapId[0] !== "#") {
            wrapId = "#" + wrapId;
        }
        let w = $(wrapId);

        if (method === 'show') {
            if (w.hasClass('d-none')) {
                w.removeClass('d-none');
            }
        } else {
            if (!w.hasClass('d-none')) {
                w.addClass('d-none');
            }
        }
    }
}

/*
* Contact form related handling. Needs initialization.
*
* Handles all the contact form related methods and variables.
*
* @todo Validate on the fly each input field
*
* @constructor {object} form DOM Element or jQuery object of form to handle.
*
* @methods bs4Validation, validateOnChange, handleSubmitBtn & goToForm
*/
class Contact {
    constructor(form) {
        /*Sets form as a jQuery object in which the methods will act upon*/
        this.form = $(form);

        /*Stores if an submission attempt was made*/
        this.triedSubmission = false;

        /*Status message element*/
        this.status = $('.' + this.form[0].id + ' .contact-status');

        /*Message to be displayed while sending*/
        this.message = 'Hold on, your message is being sent...';

        this.bs4Validation();
        this.validateOnChange();
        this.handleSubmitBtn();
        this.goToForm();
    }

    /*Add event listener to validate the inputs before submission using BS4 validation method.*/
    bs4Validation() {
        this.form[0].addEventListener('submit', (event) => {
            if (!this.form[0].checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                this.triedSubmission = true;
            }
            this.form.addClass('was-validated');
        });
    }

    /* Validate inputs on the fly.
    *  Only validates if tried to submit before.*/
    validateOnChange() {
        this.form.change(() => {
            /*Remove message if interacting with the form again*/
            this.status[0].innerHTML = '';

            if (this.triedSubmission) { //Avoid validation when first filling the form
                this.form.addClass('was-validated');
            }
        });
    }

    /*Add sending feedback text on successful submission attempt*/
    handleSubmitBtn() {
        $('#submit-btn').click(() => {
            if (this.form[0].checkValidity()) {
                this.status[0].innerHTML = this.message;
                this.status.addClass('text-primary');
            }
        });
    }

    /*Goes to the form if feedback message is present*/
    goToForm() {
        if (Utils.getUrlParameter('contact')) {
            window.scrollTo(0, this.form[0].offsetTop);
        }
    }
}

/*
* Mobile exclusive methods. Needs initialization.
*
* Handles all mobile relate changes and exclusive methods. Re-initialized on window resize.
*
* @deprecated CSS already handles the changes
*/
class Mobile {
    constructor() {
        let main = $('.main-wrap');
        /*Make sure only works on mobile*/
        if (Utils.getBreakpoint() === 'xs') {
            main.removeClass('container');
            main.addClass('container-fluid');
        } else {
            /*Revert changes. Done to return to previous state on resize event*/
            main.addClass('container');
            main.removeClass('container-fluid');
        }
    }

}

/*DOM ready and safe to manipulate*/
$(() => {
    new Menu();
    new Projects();
    new Contact($('.contact-form'));

    /*Activate Bootstrap 4 tooltips*/
    $('[data-toggle="tooltip"]').tooltip();

    /*
    * Fade logo on scroll past.
    *
    * Fade out the main logo when scrolled by.
    *
    * @todo Move this to ejs partial file
    */
    window.addEventListener("scroll", (function() {
            Utils.fadeOnScroll(document.querySelector(".logo-wrap"), "out");
        }
    ));

    /*
    * Make sure skills columns are equal height.
    *
    * Set min-height of skills columns to the highest's height. Disabled on mobile.
    * Called on window resize.
    */
    function setSkillsColHeight() {
        if (Utils.getBreakpoint() === 'xs') {
            return;
        }

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
    }

    /*Update elements on window resize*/
    $(window).resize(() => {
      Projects.setMarginTop();
      setSkillsColHeight();
    });
});