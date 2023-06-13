import DOMPurify from "dompurify";

export function sanitizeHTML(htmlContent: string) : string {
    return DOMPurify.sanitize(htmlContent)
}