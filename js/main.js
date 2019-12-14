//Navbar Controller
(new IntersectionObserver(function(e,o){
    if (e[0].intersectionRatio > 0){
        document.documentElement.removeAttribute('class');
        document.getElementById('main-nav').classList.add('d-none');
    } else {
        document.documentElement.setAttribute('class','stuck');

    };
})).observe(document.querySelector('.trigger'));

//TODO Add smooth animation to remove navbar
window.onscroll = function () {
    document.getElementById('main-nav').classList.remove('d-none');
};
