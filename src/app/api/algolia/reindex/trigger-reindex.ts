#!/usr/bin/env node
/**
 * This script triggers the reindexing API endpoint
 * Run with: npx tsx src/app/api/algolia/reindex/trigger-reindex.ts
 */

import dotenv from "dotenv";

// Load environment variables
try {
  dotenv.config();
} catch (err) {
  console.warn("Failed to load .env file:", err);
}

// Get the API key from environment or use default
const API_KEY = process.env.ALGOLIA_REINDEX_API_KEY || "osday-secret-key";

// Set the base URL (use localhost for development, production URL otherwise)
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

async function triggerReindex() {
  console.log("🔄 Triggering Algolia reindexing via API endpoint...");

  try {
    const response = await fetch(`${BASE_URL}/api/algolia/reindex`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `API responded with ${response.status}: ${error.message || error.error || JSON.stringify(error)}`,
      );
    }

    const result = await response.json();

    console.log("✅ Reindexing successful:");
    console.log(`- ${result.count} items indexed`);
    console.log(`- ${result.message}`);
  } catch (error) {
    console.error("❌ Reindexing failed:", error);
    process.exit(1);
  }
}

// Run the function
triggerReindex();
