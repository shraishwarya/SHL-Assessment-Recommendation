
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MOCK_CATALOG, TRAIN_DATA } from "../constants";
import { RecommendationResponse } from "../types";
import { calculateRecallAtK } from "../utils/evaluation";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recommended_assessments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          url: { type: Type.STRING },
          name: { type: Type.STRING },
          adaptive_support: { type: Type.STRING, enum: ["Yes", "No"] },
          description: { type: Type.STRING },
          duration: { type: Type.INTEGER },
          remote_support: { type: Type.STRING, enum: ["Yes", "No"] },
          test_type: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          ranking_label: { type: Type.STRING, enum: ["Primary", "Secondary", "Tertiary"] }
        },
        required: ["url", "name", "adaptive_support", "description", "duration", "remote_support", "test_type", "ranking_label"]
      }
    }
  }
};

export const getRecommendations = async (query: string): Promise<RecommendationResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const model = "gemini-3-flash-preview";
  const context = JSON.stringify(MOCK_CATALOG);

  const prompt = `
    You are an intelligent SHL Assessment Recommendation System.
    
    *** RANKING LOGIC ***
    Categorize your recommendations into:
    1. Primary: Critical matches for the core role requirements.
    2. Secondary: Strong supplementary assessments.
    3. Tertiary: Useful context or optional depth.

    *** THE "BALANCED SET" MANDATE ***
    If a query mentions both a hard skill (e.g. Java, Python, SQL) and a soft skill or role intent (e.g. collaboration, leadership, teamwork, stakeholder management), you MUST provide a balanced mix of:
    - "Knowledge & Skills" (Test Type K)
    - "Personality & Behavior" (Test Type P)

    *** TEST TYPE ORDERING ***
    For each assessment returned, order the items in the "test_type" array by relevance to the specific User Query. 
    The most relevant category for that specific query should come first.

    *** CATALOG DATA ***
    ${context}

    *** TEST TYPE MAPPING ***
    - A: Ability & Aptitude
    - B: Biodata & Situational Judgement
    - C: Competencies
    - D: Development & 360
    - E: Assessment Exercises
    - K: Knowledge & Skills
    - P: Personality & Behavior
    - S: Simulations

    Select 5-8 total assessments. Return them in the specified JSON format.
    *** USER QUERY ***
    "${query}"
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini.");

    return JSON.parse(text) as RecommendationResponse;
  } catch (error) {
    console.error("Recommendation Error:", error);
    throw error;
  }
};

export const evaluateSystemAccuracy = async (): Promise<{ meanRecall: number, results: any[] }> => {
  const scores: number[] = [];
  const details: any[] = [];

  for (const testCase of TRAIN_DATA) {
    try {
      const response = await getRecommendations(testCase.query);
      const predictedUrls = response.recommended_assessments.map(a => a.url);
      
      const recall = calculateRecallAtK(testCase.ground_truth_urls, predictedUrls, 10);
      scores.push(recall);
      
      details.push({
        query: testCase.query,
        expected: testCase.ground_truth_urls.length,
        found: testCase.ground_truth_urls.filter(url => predictedUrls.includes(url)).length,
        recall
      });
    } catch (e) {
      console.error("Eval failed for query:", testCase.query);
    }
  }

  const meanRecall = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  return { meanRecall, results: details };
};
