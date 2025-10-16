import { defineConfig } from "vitepress";

export default defineConfig({
	title: "Author toolbar",
	description: "Documentation",
	themeConfig: {
		logo: "/public/icons/logo.svg",
		search: {
			provider: "local",
		},
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Guide", link: "/guide/installation" },
			{ text: "Maintained by Digitalastronaut", link: "https://digitalastronaut.be/" },
		],

		sidebar: [
			{
				text: "Introduction",
				items: [
					{ text: "Why this toolbar?", link: "/guide/why" },
					{ text: "Installation guide", link: "/guide/installation" },
					{ text: "Gettings started", link: "/guide/getting-started" },
				],
			},
			{
				text: "Features",
				items: [
					{ text: "Start menu", link: "/features/start-menu" },
					{ text: "Quick actions", link: "/features/quick-actions" },
					{ text: "Global search", link: "/features/global-search" },
					{
						text: "SEO menu",
						link: "/features/seo-menu",
						items: [
							{ text: "Base checklist", link: "/features/seo-base-checklist" },
							{ text: "Share previews", link: "/features/seo-base-checklist" },
							{ text: "Image analytics", link: "/features/seo-base-checklist" },
							{ text: "Headings hierarchy", link: "/features/seo-base-checklist" },
							{ text: "Structured data", link: "/features/seo-base-checklist" },
							{ text: "Base checklist", link: "/features/seo-base-checklist" },
						],
					},
				],
			},
			{
				text: "Extending the toolbar",
				items: [
					{ text: "Extra start menu links", link: "/extending/extra-start-menu-links" },
					{ text: "Custom widgets", link: "/extending/custom-widgets" },
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/tim-digitalastronaut/craft-author-toolbar" }],
	},
});
