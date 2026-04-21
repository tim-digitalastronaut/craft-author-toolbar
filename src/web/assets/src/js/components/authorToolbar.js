import hotkeys from "hotkeys-js";
import { translate } from "../utils.js";
import { closeMenusEvent } from "../helpers/events.js";
import { timeStorage } from "../helpers/timeStorage.js";

class AuthorToolbar extends HTMLElement {
	constructor() {
		super();

		this.hidden = false;
		this.toolbarElement = null;
		this.copyPageUrlButtonElement = null;
		this.hideEnvironmentMessageButtonElement = null;
		this.environmentMessageElement = null;
	}

	connectedCallback() {
		this.toolbarElement = this;
		this.copyPageUrlButtonElement = document.querySelector("#author-toolbar-copy-page-url-button");
		this.toggleButtonElement = document.querySelector("#author-toolbar-toggle-button");
		this.hideEnvironmentMessageButtonElement = document.querySelector("#cat-hide-environment-message-button");
		this.environmentMessageElement = document.querySelector("#cat-environment-message");
		this.hidden = this.toolbarElement.classList.contains("hidden");

		document.body.style.marginBottom = this.hidden ? 0 : `${this.toolbarElement.offsetHeight}px`;

		const resizeObserver = new ResizeObserver((entries) => {
			if (!this.hidden) document.body.style.marginBottom = `${entries[0].target.offsetHeight}px`;
		});

		resizeObserver.observe(this.toolbarElement);

		if (timeStorage.getItem("author-toolbar:environment-message") === "hidden")
			this.environmentMessageElement.classList.add("hidden");

		this.registerEventListeners();
	}

	async copyPageURLToClipboard() {
		await navigator.clipboard.writeText(window.location.href);
		alert(`${window.location.href} copied to clipboard`);
	}

	toggleToolbar() {
		this.toolbarElement.classList.toggle("hidden");
		this.hidden = this.toolbarElement.classList.contains("hidden");

		const toggleButtonTextElement = this.toolbarElement.querySelector("span");

		console.log(this.hidden);

		document.body.style.marginBottom = this.hidden ? 0 : `${this.toolbarElement.offsetHeight}px`;
		toggleButtonTextElement.innerText = this.hidden ? translate["Show toolbar"] : translate["Hide toolbar"];
	}

	registerEventListeners() {
		this.copyPageUrlButtonElement.addEventListener("click", async () => {
			await this.copyPageURLToClipboard();
		});

		this.hideEnvironmentMessageButtonElement.addEventListener("click", () => {
			timeStorage.setItem("author-toolbar:environment-message", "hidden", 24 * 60 * 60 * 1000);
			this.environmentMessageElement.classList.add("hidden");
		});

		this.toggleButtonElement.addEventListener("click", () => {
			this.toggleToolbar();
		});

		document.addEventListener("show-toolbar", () => {
			if (this.toolbarElement.classList.contains("hidden")) this.toggleToolbar();
		});

		hotkeys("command+v", () => {
			this.toggleToolbar();
			document.dispatchEvent(closeMenusEvent);
			return false;
		});

		hotkeys("command+d", () => {
			window.location = window.craftAuthorToolbar.dashboardUrl;
			return false;
		});
	}
}

window.customElements.define("author-toolbar", AuthorToolbar);
