import { computePosition, shift, autoUpdate } from "@floating-ui/dom";

export function menu() {
	return {
		init() {
			const anchor = this.$el;
			const menu = this.$el.querySelector(".menu");

			const updatePosition = () => {
				computePosition(anchor, menu, {
					placement: "top-start",
					middleware: [shift({ padding: 12 })],
				}).then(({ x, y }) => {
					Object.assign(menu.style, {
						left: `${x - 1}px`,
						top: `0px`,
					});
				});
			};

			autoUpdate(anchor, menu, updatePosition);
		},
	};
}
