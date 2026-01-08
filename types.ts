
export interface Assessment {
  url: string;
  name: string;
  adaptive_support: "Yes" | "No";
  description: string;
  duration: number; // in minutes
  remote_support: "Yes" | "No";
  test_type: string[];
  ranking_label?: "Primary" | "Secondary" | "Tertiary";
}

export interface RecommendationResponse {
  recommended_assessments: Assessment[];
}

export enum QueryStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
