import { formatFileSize, getFileSizeClass, getUrlPath, mimeToExtension } from "./files.js";

export const getImagesOverview = async () => {
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

    return { imagesData };
}