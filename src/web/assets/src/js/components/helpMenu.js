import { BaseMenu } from "./baseMenu.js";

class HelpMenu extends BaseMenu {
    constructor() {
        super();
    }

    connectedCallback() {
        this.menuElement = this;
        this.toggleElement = document.querySelector("#help-menu-toggle");
        this.contentElement = document.querySelector("#help-menu-content");
        this.anchorElement = document.querySelector("#help-menu-anchor");

        super.connectedCallback();
    }
}

customElements.define("help-menu", HelpMenu);