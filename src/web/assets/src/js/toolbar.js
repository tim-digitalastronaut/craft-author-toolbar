import { timeStorage } from "./timeStorage.js";
import { seoChecklist } from "./seoChecklist.js";
import { getSeoMeta } from "./seoPreviews.js";

// import Validator from "@adobe/structured-data-validator";
// import WebAutoExtractor from "@marbec/web-auto-extractor";

import {
	buildQueryString,
	templateRequest,
	formatFileSize,
	getUrlPath,
	mimeToExtension,
	getFileSizeClass,
	jsonToHtml,
	translate,
} from "./utils.js";

export function toolbar() {
	return {
		showEnvironmentMessage: this.$persist(true).using(timeStorage(24 * 60 * 60 * 1000)),
		toolbarHidden: false,
		startMenuOpen: false,
		createPageMenuOpen: false,
		seoMenuOpen: false,
		seoMenuActiveTab: "checklist",
		seoPreview: "facebook",
		seoChecklistResults: [],
		passedSeoChecks: 0,
		headings: [],
		images: [],
		structuredData: [],
		activeStructuredDataType: null,
		overallSeoStatus: "",
		searchResultsOpen: false,
		searchQuery: "",
		helpMenuOpen: false,
		translate,

		init() {
			this.getHeadingsOverview();
			this.getSeoPreviews();
			this.getImagesOverview();
			this.getSeoChecklist();
			this.renderSearchResults();
			// this.getStructuredData();

			const menus = ["startMenuOpen", "createPageMenuOpen", "seoMenuOpen", "searchResultsOpen", "helpMenuOpen"];

			menus.forEach((menu) => {
				this.$watch(menu, (value) => {
					if (value) menus.filter((menu) => menu !== menu).forEach((menu) => (this[menu] = false));
				});
			});

			if (!this.toolbarHidden) {
				const toolbarElement = this.$el;

				document.body.style.marginBottom = `${toolbarElement.offsetHeight}px`;

				const resizeObserver = new ResizeObserver((entries) => {
					document.body.style.marginBottom = `${entries[0].target.offsetHeight}px`;
				});

				resizeObserver.observe(toolbarElement);
			}
		},

		getSeoChecklist() {
			this.seoChecklistResults = seoChecklist
				.map((checkFunction) => checkFunction())
				.sort((a, b) => {
					const statusOrder = { failed: 0, warning: 1, passed: 2 };
					return statusOrder[a.status] - statusOrder[b.status];
				});

			this.passedSeoChecks = this.seoChecklistResults.filter((check) => check.status == "passed").length;

			this.overallSeoStatus = "passed";

			if (this.seoChecklistResults.some((check) => check.status === "warning")) this.overallSeoStatus = "warning";
			if (this.seoChecklistResults.some((check) => check.status === "failed")) this.overallSeoStatus = "failed";
		},

		async getSeoPreviews() {
			const seoMeta = getSeoMeta();

			const { content } = await templateRequest("/author-toolbar/seo/previews", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": window.craftAuthorToolbar.csrfTokenValue,
					"X-Craft-Site": window.craftAuthorToolbar.siteId,
				},
				body: JSON.stringify(seoMeta),
			});

			document.querySelector("#cat-seo-previews").innerHTML = content;
		},

		async getImagesOverview() {
			const images = [...document.querySelectorAll("img:not(#cat-toolbar img)")];
			const imagesData = [];

			for (const [index, image] of images.entries()) {
				let fileSizeClass = null;
				let fileSize = null;
				let fileType = null;

				try {
					const response = await fetch(image.src, { method: "HEAD" });
					const contentLength = response.headers.get("content-length");
					const contentType = response.headers.get("content-type");

					if (contentType) fileType = mimeToExtension(contentType);
					if (contentLength) {
						fileSize = formatFileSize(parseInt(contentLength));
						fileSizeClass = getFileSizeClass(parseInt(contentLength));
					}
				} catch (error) {
					console.warn(`Could not fetch size for ${image.src}`, error.message);
				}

				imagesData.push({
					src: image.src,
					path: getUrlPath(image.src),
					fileSize: fileSize,
					fileSizeClass: fileSizeClass,
					fileType: fileType,
					width: image.naturalWidth,
					height: image.naturalHeight,
					alt: image.alt,
					element: image,
					loading: image.getAttribute("loading") || "eager",
				});
			}

			this.images = imagesData;
		},

		getHeadingsOverview() {
			const elements = document.body.querySelectorAll(`
				h1:not(#cat-toolbar *), 
				h2:not(#cat-toolbar *), 
				h3:not(#cat-toolbar *), 
				h4:not(#cat-toolbar *), 
				h5:not(#cat-toolbar *), 
				h6:not(#cat-toolbar *)
			`);

			const rawHeadings = Array.from(elements).map((heading) => {
				const level = parseInt(heading.tagName.substring(1), 10);
				return {
					element: heading,
					tag: heading.tagName.toLowerCase(),
					text: heading.textContent.trim(),
					level: level,
					missing: false,
				};
			});

			const filledHeadings = [];
			let lastLevel = 0;

			if (rawHeadings.length === 0) {
				filledHeadings.push({
					element: null,
					tag: "h1",
					text: "Missing heading 1",
					level: 1,
					missing: true,
				});
			}

			rawHeadings.forEach((heading, index) => {
				if (index === 0 && heading.level > 1) {
					for (let level = 1; level < heading.level; level++) {
						filledHeadings.push({
							element: null,
							tag: `h${level}`,
							text: `Missing heading ${level}`,
							level: level,
							missing: true,
						});
					}
				}

				if (lastLevel > 0 && heading.level > lastLevel + 1) {
					for (let level = lastLevel + 1; level < heading.level; level++) {
						filledHeadings.push({
							element: null,
							tag: `h${level}`,
							text: `Missing heading ${level}`,
							level: level,
							missing: true,
						});
					}
				}

				filledHeadings.push(heading);
				lastLevel = heading.level;
			});

			this.headings = filledHeadings.map((heading) => ({
				...heading,
				level: heading.level - 1,
			}));
		},

		// async getStructuredData() {
		// 	const extractor = new WebAutoExtractor({ addLocation: true, embedSource: ["rdfa", "microdata"] });
		// 	const extractedData = extractor.parse(document.body.outerHTML);

		// 	const schemaOrgJson = await (
		// 		await fetch("https://schema.org/version/latest/schemaorg-all-https.jsonld")
		// 	).json();

		// 	const validator = new Validator(schemaOrgJson);

		// 	const results = await validator.validate(extractedData);

		// 	console.log(extractedData.jsonld);
		// 	console.log(results);

		// 	const jsonLinkedDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
		// 	const parsedJsonLinkedDataScripts = Array.from(jsonLinkedDataScripts)
		// 		.map((linkedDataScript) => {
		// 			try {
		// 				return JSON.parse(linkedDataScript.textContent);
		// 			} catch (error) {
		// 				return null;
		// 			}
		// 		})
		// 		.filter(Boolean)
		// 		.reduce((acc, item) => {
		// 			const type = item["@type"] || "Unknown";
		// 			if (!acc[type]) acc[type] = [];
		// 			acc[type].push(item);
		// 			return acc;
		// 		}, {});

		// 	console.log(parsedJsonLinkedDataScripts);

		// 	if (jsonLinkedDataScripts.length) {
		// 		this.structuredData = parsedJsonLinkedDataScripts;
		// 		this.activeStructuredDataType = Object.entries(parsedJsonLinkedDataScripts)[0][0];
		// 	}
		// },

		jsonToHtml(data) {
			return jsonToHtml(data);
		},

		async renderSearchResults() {
			const queryString = buildQueryString([{ key: "query", value: this.searchQuery }]);

			const { html } = await templateRequest(`/author-toolbar/search?${queryString}`, {
				headers: {
					"X-Craft-Site": window.craftAuthorToolbar.siteId,
				},
			});

			const entryTitles = html.querySelectorAll(".entry-title");

			entryTitles.forEach((title) => {
				const regex = new RegExp(`(${this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
				title.innerHTML = title.textContent.replace(regex, '<span class="query-match">$1</span>');
			});

			document.querySelector("#cat-search-results").innerHTML = html.body.innerHTML;
		},

		async copyToPageURLToClipboard() {
			await navigator.clipboard.writeText(window.location.href);
			alert(`${window.location.href} copied to clipboard`);
		},

		focusSearch() {
			this.toolbarHidden = false;
			document.querySelector("#cat-search").focus();
		},

		showElementOnPage(element) {
			if (!element) return;

			element.classList.add("cat-show-on-page");
			setTimeout(() => element.classList.remove("cat-show-on-page"), 1000);

			element.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			});
		},
	};
}
