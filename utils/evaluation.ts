
/**
 * Evaluation Module for SHL Recommender
 * Implements metrics to measure retrieval and recommendation effectiveness.
 */

/**
 * Recall@K: (Relevant items in top K) / (Total relevant items)
 * Measures the system's ability to find all relevant items in the catalog.
 */
export const calculateRecallAtK = (
  actualUrls: string[],
  predictedUrls: string[],
  k: number = 10
): number => {
  if (actualUrls.length === 0) return 0;
  
  const topKPredicted = new Set(predictedUrls.slice(0, k));
  const relevantFound = actualUrls.filter(url => topKPredicted.has(url)).length;
  
  return relevantFound / actualUrls.length;
};

/**
 * Precision@K: (Relevant items in top K) / K
 * Measures the quality of the top recommendations.
 */
export const calculatePrecisionAtK = (
  actualUrls: string[],
  predictedUrls: string[],
  k: number = 10
): number => {
  const topKPredicted = predictedUrls.slice(0, k);
  const relevantFound = actualUrls.filter(url => topKPredicted.includes(url)).length;
  
  return relevantFound / k;
};

/**
 * Mean Reciprocal Rank (MRR)
 * Measures where the first relevant item appears in the list.
 */
export const calculateMRR = (
  actualUrls: string[],
  predictedUrls: string[]
): number => {
  const actualSet = new Set(actualUrls);
  for (let i = 0; i < predictedUrls.length; i++) {
    if (actualSet.has(predictedUrls[i])) {
      return 1 / (i + 1);
    }
  }
  return 0;
};
