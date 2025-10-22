export const templateRequest = async (url, config) => {
	const response = await fetch(url, config);
	const text = await response.text();

	const parser = new DOMParser();
	const html = parser.parseFromString(text, "text/html");
	const content = html.body.innerHTML;

	return { html, content };
};

export const buildQueryString = (params) => {
	return params
		.filter(({ value }) => value !== null && value !== "" && value !== undefined)
		.map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join("&");
};

export const formatFileSize = (bytes) => {
	if (bytes === 0) return "0 Bytes";
	if (!bytes) return "Unknown";

	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getUrlPath = (url) => {
	const urlObj = new URL(url);
	return urlObj.pathname;
};

export const mimeToExtension = (mime) => {
	const map = {
		"image/jpeg": "jpg",
		"image/png": "png",
		"image/gif": "gif",
		"image/webp": "webp",
		"image/svg+xml": "svg",
		"image/avif": "avif",
	};

	return map[mime] || mime;
};

export const getFileSizeClass = (rawFileSize) => {
	if (rawFileSize < 300000) return "small"; // < 300KB
	if (rawFileSize < 500000) return "medium"; // 300KB - 500KB
	return "large"; // > 1MB
};

export function jsonToHtml(data) {
	let html = '<table class="cat-json-table">';

	if (Array.isArray(data)) {
		data.forEach((item, index) => {
			html += "<tr>";
			html += '<td class="cat-json-value">';

			if (typeof item === "object" && item !== null) {
				html += jsonToHtml(item);
			} else {
				html += item;
			}

			html += "</td>";
			html += "</tr>";
		});
	} else if (typeof data === "object" && data !== null) {
		for (const key in data) {
			const value = data[key];

			html += "<tr>";
			html += `<td class="cat-json-key">${key
				.replace(/@/g, "")
				.replace(/([a-z])([A-Z])/g, "$1 $2")
				.replace(/\b[a-z]/g, (c) => c.toUpperCase())}</td>`;
			html += '<td class="cat-json-value">';

			if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
				html += jsonToHtml(value);
			} else {
				html += value;
			}

			html += "</td>";
			html += "</tr>";
		}
	}

	html += "</table>";
	return html;
}

export const translate = window.craftAuthorToolbar?.translations;
