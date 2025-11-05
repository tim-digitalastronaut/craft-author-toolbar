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
    if (rawFileSize < 300000) return "small";
    if (rawFileSize < 500000) return "medium";
    return "large";
};