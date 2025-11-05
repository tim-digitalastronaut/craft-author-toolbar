import { BaseMenu } from "./baseMenu.js";
import { getSeoChecklistResults } from "../helpers/seoChecklist.js";
import { getHeadingsOverview } from "../helpers/headingsOverview.js";
import { getImagesOverview } from "../helpers/imagesOverview.js";
import { getSeoMetaData } from "../helpers/socialMediaPreviews.js";
import { showElementOnPage } from "../helpers/misc.js";
import { templateRequest } from "../utils.js";
import { defaultJsonRequestHeaders } from "../helpers/constants.js";

class SeoMenu extends BaseMenu {
    constructor() {
        super();

        this.toggleStatusElement = null;
        this.tabElements = [];
    }

    async connectedCallback() {
        this.menuElement = this;
        this.toggleElement = document.querySelector("#seo-menu-toggle");
        this.contentElement = document.querySelector("#seo-menu-content");
        this.anchorElement = document.querySelector("#seo-menu-anchor");
        this.toggleStatusElement = document.querySelector("#seo-menu-toggle-status");

        this.tabElements = [...this.menuElement.getElementsByClassName("cat-toolbar-seo-menu-tab-button")];

        this.changeTab("checklist");

        super.connectedCallback();

        await this.renderChecklist();
        await this.renderHeadingsOverview();
        await this.renderImagesOverview();
        await this.renderSocialMediaPreviews();
    }

    async renderChecklist() {
        const { results, status, passedChecks } = getSeoChecklistResults();

        const { content } = await templateRequest("/actions/author-toolbar/seo/get-checklist-html", {
            method: "POST",
            headers: defaultJsonRequestHeaders,
            body: JSON.stringify(results)
        })

        document.querySelector("[data-tab-content='checklist']").innerHTML = content;

        this.toggleStatusElement.classList.remove("passed", "warning", "failed");
        this.toggleStatusElement.classList.add(status);

        this.toggleStatusElement.querySelector(".seo-menu-toggle-status-summary").innerText = `${passedChecks}/${results.length}`;
    }

    async renderHeadingsOverview() {
        const { results } = getHeadingsOverview();

        const { content } = await templateRequest("/actions/author-toolbar/seo/get-headings-overview-html", {
            method: "POST",
            headers: defaultJsonRequestHeaders,
            body: JSON.stringify(results)
        });

        document.querySelector("[data-tab-content='headings']").innerHTML = content;

        [...this.getElementsByClassName("cat-toolbar-seo-menu-headings-list-item-link")].forEach((link, index) => {
            link.addEventListener("click", () => showElementOnPage(results[index].element));
        })
    }

    async renderImagesOverview() {
        const { imagesData } = await getImagesOverview();

        const { content } = await templateRequest("/actions/author-toolbar/seo/get-images-overview-html", {
            method: "POST",
            headers: defaultJsonRequestHeaders,
            body: JSON.stringify(imagesData)
        });

        document.querySelector("[data-tab-content='images']").innerHTML = content;

        [...this.getElementsByClassName("cat-toolbar-seo-menu-images-list-item-button")].forEach((link, index) => {
            link.addEventListener("click", () => showElementOnPage(imagesData[index].element));
        })
    }

    async renderSocialMediaPreviews() {
        const { seoMetaData } = getSeoMetaData();

        const { content } = await templateRequest("/actions/author-toolbar/seo/get-social-media-previews-html", {
            method: "POST",
            headers: defaultJsonRequestHeaders,
            body: JSON.stringify(seoMetaData)
        });

        document.querySelector("[data-tab-content='social-media-previews']").innerHTML = content;
    }

    changeTab(tab) {
        this.tabElements.forEach(tabElement => tabElement.classList.remove("active"));
        this.menuElement.querySelector(`[data-tab="${tab}"]`).classList.add("active");

        [...this.menuElement.querySelectorAll(`.cat-toolbar-seo-menu-tab-content > [data-tab-content]`)]
            .forEach(tabContent => tabContent.classList.remove("active"));
        this.menuElement.querySelector(`.cat-toolbar-seo-menu-tab-content > [data-tab-content="${tab}"]`)
            .classList.add("active");
    }

    registerEventListeners() {
        super.registerEventListeners();

        this.tabElements.forEach(tabElement => {
            tabElement.addEventListener("click", () => this.changeTab(tabElement.dataset.tab));
        });
    }
}

customElements.define("seo-menu", SeoMenu);