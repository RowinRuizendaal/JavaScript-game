const isMobile = () => {
    return window.innerWidth < 768;
};

window.onload = () => {
    isMobile() ?
        document.body.classList.add("mobile") :
        document.body.classList.add("desktop");

    window.addEventListener("resize", () => {
        if (isMobile()) {
            document.body.classList.add("mobile");
        } else {
            document.body.classList.remove("mobile");
        }
    });
};