function menuToggle() {
    let menu = document.getElementById("menu-screen");
    let body = document.getElementsByTagName('body')[0];
    let html = document.getElementsByTagName('html')[0];


    if (menu.classList.contains("menu-open")) {
        //Close Menu
        body.style.overflow = "";
        html.style.overflow = "";
        menu.classList.remove("menu-open");
    } else {
        //Open Menu
        body.style.overflow = "hidden";
        html.style.overflow = "hidden";
        menu.classList.add("menu-open");
    }
}