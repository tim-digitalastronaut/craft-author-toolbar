import { translate } from "./utils.js";

export const checkPageTitle = () => {
	const titleElement = document.querySelector("title");

	if (!titleElement || !titleElement.innerText) {
		return {
			status: "failed",
			message: translate["The page is missing a title"],
		};
	}

	const titleLength = titleElement.innerText.length;

	if (titleLength > 60) {
		return {
			status: "warning",
			message: `${translate["The page title is too long"]} (${titleLength} ${translate["characters"]}). ${translate["Recommended to be under 60 characters"]}`,
		};
	}

	return {
		status: "passed",
		message: translate["The page has a title and is (under 60 characters)"],
	};
};

export const checkMetaDescription = () => {
	const descriptionMetaElement = document.querySelector("meta[name='description']");

	if (!descriptionMetaElement) {
		return {
			status: "failed",
			message: translate["The page is missing a meta description"],
		};
	}

	const descriptionLength = descriptionMetaElement.getAttribute("content").length;

	if (descriptionLength === 0) {
		return {
			status: "failed",
			message: translate["The page is missing a meta description"],
		};
	}

	if (descriptionLength < 120) {
		return {
			status: "warning",
			message: `${translate["Meta description is too short"]} (${descriptionLength} ${translate["characters"]}). ${translate["Should be 120-160 characters"]}`,
		};
	}

	if (descriptionLength > 160) {
		return {
			status: "warning",
			message: `${translate["Meta description is too long"]} (${descriptionLength} ${translate["characters"]}). ${translate["Should be 120-160 characters"]}`,
		};
	}

	return {
		status: "passed",
		message: translate["The page has a meta description (120 - 160 characters)"],
	};
};

export const checkH1Heading = () => {
	const h1Elements = [...document.querySelectorAll("h1")];

	if (h1Elements.length === 0) {
		return {
			status: "failed",
			message: translate["The page is missing an h1 heading tag"],
		};
	}

	if (h1Elements.length > 1) {
		return {
			status: "failed",
			message: `${translate["The page has"]} ${h1Elements.length} ${translate["h1 headings. It should have exactly one h1 tag"]}`,
		};
	}

	const h1Length = h1Elements[0].innerText.length;

	if (h1Length > 70) {
		return {
			status: "warning",
			message: `${translate["The h1 heading exceeds the 70 characters recommendation"]} (${h1Length} ${translate["characters"]})`,
		};
	}

	return {
		status: "passed",
		message: translate["The page has an h1 heading tag"],
	};
};

export const checkContentLength = () => {
	const mainElement = document.querySelector("main");

	if (!mainElement) {
		return {
			status: "failed",
			message: translate["The page is missing a main element tag"],
		};
	}

	const wordCount = mainElement.textContent
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;

	if (wordCount === 0) {
		return {
			status: "failed",
			message: translate["This page has no main content"],
		};
	}

	if (wordCount < 300) {
		return {
			status: "warning",
			message: `${translate["Main content contains only"]} ${wordCount} ${translate["words. Should have at least 300 words"]}`,
		};
	}

	return {
		status: "passed",
		message: translate["The main content on the page is at least 300+ words"],
	};
};

export const checkSubHeadings = () => {
	const subHeadingsCount = [...document.querySelectorAll("h2:not(#cat-toolbar h2), h3:not(#cat-toolbar h3)")].length;

	if (subHeadingsCount === 0) {
		return {
			status: "warning",
			message: translate["The page is missing subheadings (h2, h3 tags)"],
		};
	}

	return {
		status: "passed",
		message: translate["The page contains subheadings such as h2 and h3 tags"],
	};
};

export const checkImages = () => {
	const images = [...document.querySelectorAll("img:not(#cat-toolbar img):not([role='presentation'])")];

	if (images.length === 0) {
		return {
			status: "warning",
			message: translate["The page has no images"],
		};
	}

	const imagesWithoutAlt = images.filter((image) => !image.alt || image.alt.trim() === "");

	if (imagesWithoutAlt.length > 0) {
		return {
			status: "failed",
			message: `${imagesWithoutAlt.length} ${translate["out of"]} ${images.length} ${translate["images are missing an alt text"]}`,
		};
	}

	return {
		status: "passed",
		message: `${translate["The page contains"]} ${images.length} ${translate["image"]}${
			images.length === 1 ? "" : "s"
		} ${translate["with descriptive alt texts"]}`,
	};
};

export const checkLinks = () => {
	const linksCount = [...document.body.querySelectorAll("a:not(#cat-toolbar a)")].length;

	if (linksCount === 0) {
		return {
			status: "warning",
			message: translate["The page has no links to internal or external pages"],
		};
	}

	return {
		status: "passed",
		message: translate["There are links on this page that point to external or internal pages"],
	};
};

export const checkSocialImages = () => {
	const ogImageMetaElement = document.querySelector("meta[property='og:image']");
	const twitterImageMetaElement = document.querySelector("meta[name='twitter:image']");

	const hasOgImage = ogImageMetaElement && ogImageMetaElement.getAttribute("content");
	const hasTwitterImage = twitterImageMetaElement && twitterImageMetaElement.getAttribute("content");

	if (!hasOgImage && !hasTwitterImage) {
		return {
			status: "warning",
			message: translate["The page is missing both og:image and twitter:image meta tags"],
		};
	}

	if (!hasOgImage) {
		return {
			status: "warning",
			message: translate["The page is missing og:image meta tag"],
		};
	}

	if (!hasTwitterImage) {
		return {
			status: "warning",
			message: translate["The page is missing twitter:image meta tag"],
		};
	}

	return {
		status: "passed",
		message: translate["The page has valid social images"],
	};
};

export const seoChecklist = [
	checkPageTitle,
	checkMetaDescription,
	checkH1Heading,
	checkContentLength,
	checkSubHeadings,
	checkImages,
	checkLinks,
	checkSocialImages,
];
