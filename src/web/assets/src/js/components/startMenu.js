import { BaseMenu } from "./baseMenu.js";

class StartMenu extends BaseMenu {
	constructor() {
		super();
	}

	connectedCallback() {
		this.menuElement = this;
		this.toggleElement = document.querySelector("#start-menu-toggle");
		this.contentElement = document.querySelector("#start-menu-content");
		this.anchorElement = document.querySelector("#start-menu-anchor");

		super.connectedCallback();
	}
}

customElements.define("start-menu", StartMenu);