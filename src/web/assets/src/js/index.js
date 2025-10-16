import Alpine from "alpinejs";
import { toolbar } from "./toolbar.js";
import { menu } from "./menu.js";

Alpine.prefix("toolbar-");

Alpine.data("toolbar", toolbar);
Alpine.data("menu", menu);

Alpine.start();
