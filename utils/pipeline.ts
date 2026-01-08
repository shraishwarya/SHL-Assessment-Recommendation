import { Assessment } from "../types";

// Explicit Data Processing Logic
// This replicates the behavior of a backend scraper/cleaner using TypeScript.

/**
 * Stage 1: Raw Data Cleaning
 * Takes messy OCR string and returns a clean list of candidate URLs.
 */
export const cleanRawData = (rawText: string): string[] => {
  return rawText
    .split('\n')                                    // Split by newline
    .map(line => line.trim())                       // Remove whitespace
    .filter(line => line.length > 0)                // Remove empty lines
    .filter(line => line.startsWith('http'))        // Filter only valid URLs
    // Deduplicate URLs
    .filter((value, index, self) => self.indexOf(value) === index);
};

/**
 * Stage 2: Transformation & Extraction
 * Parses the URL structure to extract metadata like Name, Slug, etc.
 */
export const transformUrlToAssessment = (url: string): Assessment => {
  // Extract the slug (last part of the URL)
  // e.g. .../view/java-8-new/ -> "java-8-new"
  const parts = url.split('/').filter(p => p.length > 0);
  const slug = parts[parts.length - 1];

  // Convert slug to readable title
  // "java-8-new" -> "Java 8 New"
  const rawName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Clean up common suffixes
  const cleanName = rawName.replace('New', '').trim();

  // Keyword analysis for categorization (Simulated AI Tagging)
  let types: string[] = ["Knowledge & Skills"]; // Default
  const lowerSlug = slug.toLowerCase();

  if (lowerSlug.includes('verify') || lowerSlug.includes('aptitude') || lowerSlug.includes('reasoning')) {
    types = ["Ability & Aptitude"];
  } else if (lowerSlug.includes('personality') || lowerSlug.includes('opq') || lowerSlug.includes('behavior') || lowerSlug.includes('sales')) {
    types = ["Personality & Behavior"];
  } else if (lowerSlug.includes('simulation') || lowerSlug.includes('automata')) {
    types = ["Simulations", "Knowledge & Skills"];
  }

  // Simulated duration inference based on keywords
  let duration = 30; // Default
  if (lowerSlug.includes('short')) duration = 15;
  if (lowerSlug.includes('advanced')) duration = 60;
  if (lowerSlug.includes('entry')) duration = 25;

  return {
    url: url,
    name: cleanName || slug,
    description: `Generated from scraping pipeline. Auto-categorized as ${types.join(', ')}.`,
    adaptive_support: "No", // Default assumption until verified
    remote_support: "Yes",
    duration: duration,
    test_type: types
  };
};

/**
 * Stage 3: Load/Compile
 * Runs the full pipeline on a raw string.
 */
export const runDataPipeline = (rawInput: string): Assessment[] => {
  const cleanUrls = cleanRawData(rawInput);
  const structuredData = cleanUrls.map(transformUrlToAssessment);
  return structuredData;
};
