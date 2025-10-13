import Alpine from "alpinejs";
import { toolbar } from "./toolbar.js";

Alpine.prefix("toolbar-");

Alpine.data("toolbar", toolbar);

Alpine.start();
