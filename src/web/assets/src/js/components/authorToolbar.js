import hotkeys from 'hotkeys-js';
import { translate } from "../utils.js";
import { closeMenusEvent } from "../helpers/events.js";

class AuthorToolbar extends HTMLElement {
	constructor() {
		super();

		this.hidden = false;
		this.toolbarElement = null;
		this.copyPageUrlButtonElement = null
	}

	connectedCallback() {
		this.toolbarElement = this;
		this.copyPageUrlButtonElement = document.querySelector("#author-toolbar-copy-page-url-button");
		this.toggleButtonElement = document.querySelector("#author-toolbar-toggle-button")

		document.body.style.marginBottom = `${this.toolbarElement.offsetHeight}px`;

		const resizeObserver = new ResizeObserver((entries) => {
			if (!this.hidden) document.body.style.marginBottom = `${entries[0].target.offsetHeight}px`;
		});

		resizeObserver.observe(this.toolbarElement);

		this.registerEventListeners();
	}

	async copyPageURLToClipboard() {
		await navigator.clipboard.writeText(window.location.href);
		alert(`${window.location.href} copied to clipboard`);
	}

	toggleToolbar() {
		this.toolbarElement.classList.toggle("hidden");

		const toggleButtonTextElement = this.toolbarElement.querySelector("span");
		const hidden = this.toolbarElement.classList.contains("hidden");

		toggleButtonTextElement.innerText = hidden ?
			translate['Show toolbar'] : translate['Hide toolbar'];
	}

	registerEventListeners() {
		this.copyPageUrlButtonElement.addEventListener("click", async () => {
			await this.copyPageURLToClipboard();
		})

		this.toggleButtonElement.addEventListener("click", () => {
			this.toggleToolbar();
		})

		document.addEventListener("show-toolbar", (event) => {
			if (this.toolbarElement.classList.contains("hidden")) this.toggleToolbar();
		})

		hotkeys('command+v', () => {
			this.toggleToolbar();
			document.dispatchEvent(closeMenusEvent);
			return false;
		});

		hotkeys('command+d', () => {
			window.location = window.craftAuthorToolbar.dashboardUrl;
			return false;
		});
	}
}

window.customElements.define("author-toolbar", AuthorToolbar);
