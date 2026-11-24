export interface ParsedDaahqaadLink {
    url: string | null;
    handle: string | null;
    error: string | null;
}

const DAAHQAAD_HOST = "daahqaad.com";
const HANDLE_PATTERN = /^@?[a-zA-Z0-9._-]{1,64}$/;
const NON_DAAHQAAD_DOMAIN_PATTERN = /\.(com|net|org|io|co|so|me|dev|app|ai|gg|tv|xyz|info|biz)$/i;

/**
 * Normalizes and validates a Daahqaad profile link or @username handle.
 *
 * Accepts:
 * - Full URLs: https://daahqaad.com/@username, https://daahqaad.com/username, https://www.daahqaad.com/...
 * - Scheme-less URLs: daahqaad.com/@username, www.daahqaad.com/username
 * - Handles: @username, username
 *
 * Rejects non-daahqaad.com domains and non-HTTP(S) schemes.
 */
export function parseDaahqaadLink(raw?: string | null): ParsedDaahqaadLink {
    const trimmed = typeof raw === "string" ? raw.trim() : "";
    if (!trimmed) {
        return { url: null, handle: null, error: null };
    }

    const lower = trimmed.toLowerCase();
    const looksLikeUrl =
        trimmed.includes("://") ||
        trimmed.includes("/") ||
        trimmed.includes(":") ||
        lower === DAAHQAAD_HOST ||
        lower === `www.${DAAHQAAD_HOST}` ||
        lower.endsWith(`.${DAAHQAAD_HOST}`);

    if (looksLikeUrl) {
        const candidate = /^https?:\/\//i.test(trimmed)
            ? trimmed
            : trimmed.includes(":")
              ? trimmed
              : `https://${trimmed}`;

        let parsed: URL;
        try {
            parsed = new URL(candidate);
        } catch {
            return {
                url: null,
                handle: null,
                error: "Please enter a valid daahqaad.com profile link or @username.",
            };
        }

        if (
            (parsed.protocol !== "https:" && parsed.protocol !== "http:") ||
            parsed.username ||
            parsed.password
        ) {
            return {
                url: null,
                handle: null,
                error: "Please enter a valid daahqaad.com profile link or @username.",
            };
        }

        const host = parsed.hostname.toLowerCase();
        if (host !== DAAHQAAD_HOST && !host.endsWith(`.${DAAHQAAD_HOST}`)) {
            return {
                url: null,
                handle: null,
                error: "Link must be a daahqaad.com profile URL (e.g. https://daahqaad.com/@username).",
            };
        }

        parsed.protocol = "https:";

        const segments = parsed.pathname.split("/").filter(Boolean);
        if (
            (host === DAAHQAAD_HOST || host === `www.${DAAHQAAD_HOST}`) &&
            segments.length === 0 &&
            !parsed.search &&
            !parsed.hash
        ) {
            return {
                url: null,
                handle: null,
                error: "Please include your Daahqaad profile path (e.g. https://daahqaad.com/@username).",
            };
        }

        const lastSegment = segments[segments.length - 1];
        const cleanSegment = lastSegment?.replace(/^@+/, "");
        const handle = cleanSegment ? `@${cleanSegment}` : null;

        return {
            url: parsed.toString(),
            handle,
            error: null,
        };
    }

    if (!trimmed.startsWith("@") && NON_DAAHQAAD_DOMAIN_PATTERN.test(trimmed)) {
        return {
            url: null,
            handle: null,
            error: "Link must be a daahqaad.com profile URL (e.g. https://daahqaad.com/@username).",
        };
    }

    if (!HANDLE_PATTERN.test(trimmed)) {
        return {
            url: null,
            handle: null,
            error: "Please enter a valid daahqaad.com profile link or @username.",
        };
    }

    const cleanHandle = trimmed.replace(/^@+/, "");
    if (!cleanHandle) {
        return {
            url: null,
            handle: null,
            error: "Please enter a valid daahqaad.com profile link or @username.",
        };
    }

    return {
        url: `https://${DAAHQAAD_HOST}/@${cleanHandle}`,
        handle: `@${cleanHandle}`,
        error: null,
    };
}
