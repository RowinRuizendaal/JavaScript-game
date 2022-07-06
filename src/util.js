const isMobile = () => {
    // basic easy check for now
    return window.innerWidth < 768;
};

window.onload = () => {
    if (isMobile()) {
        document.body.classList.add("mobile");
    }
};