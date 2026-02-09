import { BaseMenu } from "./baseMenu.js";
import { buildQueryString, templateRequest } from "../utils.js";
import {closeMenusEvent, showToolbarEvent} from "../helpers/events.js";
import hotkeys from "hotkeys-js";

class SearchMenu extends BaseMenu {
    constructor() {
        super();

        this.searchQuery = "";
    }

    async connectedCallback() {
        this.menuElement = this;
        this.toggleElement = document.querySelector("#search-menu-input");
        this.contentElement = document.querySelector("#search-menu-content");
        this.anchorElement = document.querySelector("#search-menu-anchor");

        super.connectedCallback();

        await this.renderSearchResults();
    }

    async renderSearchResults() {
        const queryString = buildQueryString([{ key: "query", value: this.searchQuery }]);

        const { html } = await templateRequest(`/actions/author-toolbar/search/get-search-results-html?${queryString}`, {
            headers: {
                "X-Craft-Site": window.craftAuthorToolbar.siteId,
            },
        });

        const entryTitles = html.querySelectorAll(".entry-title");

        entryTitles.forEach((title) => {
            const regex = new RegExp(`(${this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
            title.innerHTML = title.textContent.replace(regex, '<span class="query-match">$1</span>');
        });

        document.querySelector("#search-menu-content").innerHTML = html.body.innerHTML;
    }

    focusSearch() {
        document.dispatchEvent(showToolbarEvent);
        document.dispatchEvent(closeMenusEvent);
        this.toggleElement.focus();
    }

    registerEventListeners() {
        super.registerEventListeners();

        this.toggleElement.addEventListener("input", async (event) => {
            this.searchQuery = event.target.value;
            await this.renderSearchResults();
        });

        hotkeys('command+k', () => {
            this.focusSearch();
            return false;
        });
    }
}

customElements.define("search-menu", SearchMenu);