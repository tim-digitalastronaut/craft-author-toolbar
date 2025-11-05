
export class SocialMediaPreviews extends HTMLElement {
    constructor() {
        super();

        this.element = this;
        this.tabElements = null;
    }

    connectedCallback() {
        this.tabElements = [...this.getElementsByClassName("cat-toolbar-seo-menu-previews-results-option-tabs-item-button")];

        this.registerEventListeners();
        this.changeTab("facebook");
    }

    changeTab(tab) {
        this.tabElements.forEach(tabElement => tabElement.classList.remove("active"));
        this.element.querySelector(`[data-tab="${tab}"]`).classList.add("active");

        [...this.element.querySelectorAll(`[data-tab-content]`)].forEach(tabContent => tabContent.classList.remove("active"));
        this.element.querySelector(`[data-tab-content="${tab}"]`).classList.add("active");
    }

    registerEventListeners() {
        this.tabElements.forEach(tabElement => {
            tabElement.addEventListener("click", () => this.changeTab(tabElement.dataset.tab));
        })
    }
}

customElements.define("social-media-previews", SocialMediaPreviews);