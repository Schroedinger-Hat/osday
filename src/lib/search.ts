import algoliasearch from "algoliasearch/lite"
import { env } from "~/env"

// Initialize the Algolia client
export const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ""
)

export const INDEX_NAME = env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? "osday" 