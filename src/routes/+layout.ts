// Prerender the whole app to static HTML by default (GitHub Pages). Individual routes that
// depend on request-time data (e.g. the converter's query string) opt out with `prerender = false`.
export const prerender = true;
