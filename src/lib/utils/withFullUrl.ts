const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

const CANONICAL_URL = "https://osday.dev";

const INCLUDES_FORWARD_SLASH_AT_START_REGEX = /^\/(.|\n)*$/;
const INCLUDES_FORWARD_SLASH_AT_START = (string: string) =>
  INCLUDES_FORWARD_SLASH_AT_START_REGEX.test(string);

const withFullUrl = (path: string) =>
  `${BASE_URL}${!INCLUDES_FORWARD_SLASH_AT_START(path) ? "/" : ""}${path}`;

const withCanonicalUrl = (path: string) =>
  `${CANONICAL_URL}${!INCLUDES_FORWARD_SLASH_AT_START(path) ? "/" : ""}${path}`;

export default withFullUrl;
export {
  BASE_URL,
  CANONICAL_URL,
  INCLUDES_FORWARD_SLASH_AT_START_REGEX,
  INCLUDES_FORWARD_SLASH_AT_START,
  withCanonicalUrl,
};
