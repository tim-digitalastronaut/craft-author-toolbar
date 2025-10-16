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
			{ text: "Guide", link: "/guide/getting-started" },
			{ text: "Maintained by Digitalastronaut", link: "https://digitalastronaut.be/" },
		],

		sidebar: [
			{
				text: "Introduction",
				link: "/guide/motivation",
				items: [
					{ text: "About", link: "/guide/motivation" },
					{ text: "Installation guide", link: "/guide/installation" },
					{ text: "Gettings started", link: "/guide/getting-started" },
				],
			},
			{
				text: "Toolbar chunks",
				link: "/chunks/",
				items: [
					{ text: "Start menu", link: "/chunks/start-menu" },
					{ text: "Quick actions", link: "/chunks/quick-actions" },
					{ text: "Global search", link: "/chunks/global-page-search" },
					{
						text: "SEO menu",
						link: "/chunks/seo-menu",
						items: [
							{ text: "Base checklist", link: "/chunks/seo-menu/base-checklist" },
							{ text: "Share previews", link: "/chunks/seo-menu/share-previews" },
							{ text: "Image analytics", link: "/chunks/seo-menu/image-analytics" },
							{ text: "Headings", link: "/chunks/seo-menu/headings" },
							// { text: "Structured data", link: "/chunks/seo-menu/structured-data" },
						],
					},
					{ text: "Help menu", link: "/chunks/help-menu" },
				],
			},
			{
				text: "Extending the toolbar",
				items: [
					// { text: "Extra start menu links", link: "/extending/extra-start-menu-links" },
					{ text: "Custom chunks", link: "/extending/custom-chunks" },
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/tim-digitalastronaut/craft-author-toolbar" }],
	},
});
