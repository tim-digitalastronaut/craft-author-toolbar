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

export const readMetaTag = (selector) => {
	const meta = document.querySelector(selector);
	return meta ? meta.getAttribute("content") : "";
};

export const getSeoMetaData = () => {
	const title = document.title || "";
	const description = readMetaTag('meta[name="description"]') || "";
	const canonical = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
	const favicon = getFavicon();
	const language = navigator.language;

	const ogTitle = readMetaTag('meta[property="og:title"]') || title;
	const ogDescription = readMetaTag('meta[property="og:description"]') || description;
	const ogImage = readMetaTag('meta[property="og:image"]') || "";
	const ogUrl = readMetaTag('meta[property="og:url"]') || canonical;
	const ogType = readMetaTag('meta[property="og:type"]') || "website";
	const ogSiteName = readMetaTag('meta[property="og:site_name"]') || "";

	const twitterCard = readMetaTag('meta[name="twitter:card"]') || "summary";
	const twitterTitle = readMetaTag('meta[name="twitter:title"]') || ogTitle;
	const twitterDescription = readMetaTag('meta[name="twitter:description"]') || ogDescription || description;
	const twitterImage = readMetaTag('meta[name="twitter:image"]') || ogImage;
	const twitterUrl = readMetaTag('meta[name="twitter:url"]') || canonical;
	const twitterSite = readMetaTag('meta[name="twitter:site"]') || "";
	const twitterCreator = readMetaTag('meta[name="twitter:creator"]') || "";

	const seoMetaData = {
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

	return { seoMetaData };
};
