export const showElementOnPage = (element) => {
    if (!element) return;

    [...document.getElementsByClassName("cat-show-on-page")].forEach((element) => {
        element.classList.remove("cat-show-on-page");
    })

    element.classList.add("cat-show-on-page");
    setTimeout(() => element.classList.remove("cat-show-on-page"), 1000);

    console.log("showing");

    element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
    });
}