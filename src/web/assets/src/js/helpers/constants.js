export const defaultJsonRequestHeaders = {
    "Content-Type": "application/json",
    "X-CSRF-Token": window.craftAuthorToolbar?.csrfTokenValue,
    "X-Craft-Site": window.craftAuthorToolbar?.siteId,
}