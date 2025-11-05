import { computePosition, shift, autoUpdate } from "@floating-ui/dom";
import hotkeys from "hotkeys-js";

export class BaseMenu extends HTMLElement {
    constructor() {
        super();

        this.toggleElement = null;
        this.menuElement = null;
        this.anchorElement = null;
        this.contentElement = null;
    }

    connectedCallback() {
        if (!this.toggleElement || !this.menuElement || !this.anchorElement || !this.contentElement) {
            throw new Error("Subclasses must set toggleElement, menuElement, contentElement, and anchorElement before calling super.connectedCallback()");
        }

        const updatePosition = () => {
            computePosition(this.anchorElement, this.contentElement, {
                placement: "top-start",
                middleware: [shift()],
            }).then(({ x, y }) => {
                Object.assign(this.contentElement.style, {
                    left: `${x - 1}px`,
                    top: `0px`,
                });
            });
        };

        autoUpdate(this.anchorElement, this.contentElement, updatePosition);

        this.registerEventListeners();
    }

    registerEventListeners() {
        document.addEventListener("click", (event) => {
            if (!this.menuElement.contains(event.target) && !this.toggleElement.contains(event.target)) {
                this.menuElement.classList.remove("open");
            }
        });

        document.addEventListener("close-menus", (event) => {
            this.menuElement.classList.remove("open");
        })

        hotkeys("esc", () => {
            this.menuElement.classList.remove("open");
            return false;
        })

        if (this.toggleElement.tagName.toLowerCase() === "button") {
            this.toggleElement.addEventListener("click", () => {
                this.menuElement.classList.toggle("open");
            });
        }

        if (this.toggleElement.tagName.toLowerCase() === "input") {
            this.toggleElement.addEventListener("focus", (event) => {
                this.menuElement.classList.toggle("open");
            })
        }
    }
}
