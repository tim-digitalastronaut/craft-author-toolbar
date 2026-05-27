import { BaseMenu } from "./baseMenu.js";

class CreateMenu extends BaseMenu {
	connectedCallback() {
		this.menuElement = this;
		this.toggleElement = document.querySelector("#create-menu-toggle");
		this.contentElement = document.querySelector("#create-menu-content");
		this.anchorElement = document.querySelector("#create-menu-anchor");

		super.connectedCallback();
	}
}

customElements.define("create-menu", CreateMenu);
