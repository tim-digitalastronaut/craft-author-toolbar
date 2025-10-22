import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

import { toolbar } from "./toolbar.js";
import { menu } from "./menu.js";

Alpine.plugin(persist);

Alpine.prefix("toolbar-");

Alpine.data("toolbar", toolbar);
Alpine.data("menu", menu);

Alpine.start();
