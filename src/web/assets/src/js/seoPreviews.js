export const getFavicon = () => {
	const selectors = [
		'link[rel="icon"][type="image/svg+xml"]',
		'link[rel="icon"][sizes="32x32"]',
		'link[rel="icon"][sizes="16x16"]',
		'link[rel="shortcut icon"]',
		'link[rel="icon"]',
		'link[rel="apple-touch-icon"]',
	];

	for (const selector of selectors) {
		const link = document.querySelector(selector);
		if (link?.href) return link.href;
	}

	return `${window.location.origin}/favicon.ico`;
};

export const getMeta = (selector) => {
	const meta = document.querySelector(selector);
	return meta ? meta.getAttribute("content") : "";
};

export const getSeoMeta = () => {
	const title = document.title || "";
	const description = getMeta('meta[name="description"]') || "";
	const canonical = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
	const favicon = getFavicon();
	const language = navigator.language;

	const ogTitle = getMeta('meta[property="og:title"]') || title;
	const ogDescription = getMeta('meta[property="og:description"]') || description;
	const ogImage = getMeta('meta[property="og:image"]') || "";
	const ogUrl = getMeta('meta[property="og:url"]') || canonical;
	const ogType = getMeta('meta[property="og:type"]') || "website";
	const ogSiteName = getMeta('meta[property="og:site_name"]') || "";

	const twitterCard = getMeta('meta[name="twitter:card"]') || "summary";
	const twitterTitle = getMeta('meta[name="twitter:title"]') || ogTitle;
	const twitterDescription = getMeta('meta[name="twitter:description"]') || ogDescription || description;
	const twitterImage = getMeta('meta[name="twitter:image"]') || ogImage;
	const twitterUrl = getMeta('meta[name="twitter:url"]') || canonical;
	const twitterSite = getMeta('meta[name="twitter:site"]') || "";
	const twitterCreator = getMeta('meta[name="twitter:creator"]') || "";

	return {
		language: language,
		favicon: favicon,

		og: {
			title: ogTitle,
			description: ogDescription,
			image: ogImage,
			url: ogUrl,
			type: ogType,
			siteName: ogSiteName,
		},

		twitter: {
			card: twitterCard,
			title: twitterTitle,
			description: twitterDescription,
			image: twitterImage,
			site: twitterSite,
			url: twitterUrl,
			creator: twitterCreator,
		},
	};
};
