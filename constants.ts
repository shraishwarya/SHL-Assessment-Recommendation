
import { Assessment } from './types';

export const RAW_OCR_DATA = `
Assessment_url
https://www.shl.com/solutions/products/product-catalog/view/automata-fix-new/
https://www.shl.com/solutions/products/product-catalog/view/core-java-entry-level-new/
https://www.shl.com/solutions/products/product-catalog/view/java-8-new/
https://www.shl.com/solutions/products/product-catalog/view/core-java-advanced-level-new/
https://www.shl.com/products/product-catalog/view/interpersonal-communications/
https://www.shl.com/solutions/products/product-catalog/view/entry-level-sales-7-1/
https://www.shl.com/solutions/products/product-catalog/view/entry-level-sales-sift-out-7-1/
https://www.shl.com/solutions/products/product-catalog/view/entry-level-sales-solution/
https://www.shl.com/solutions/products/product-catalog/view/sales-representative-solution/
https://www.shl.com/products/product-catalog/view/business-communication-adaptive/
https://www.shl.com/solutions/products/product-catalog/view/technical-sales-associate-solution/
https://www.shl.com/solutions/products/product-catalog/view/svar-spoken-english-indian-accent-new/
https://www.shl.com/products/product-catalog/view/interpersonal-communications/
https://www.shl.com/solutions/products/product-catalog/view/english-comprehension-new/
https://www.shl.com/products/product-catalog/view/enterprise-leadership-report/
https://www.shl.com/products/product-catalog/view/occupational-personality-questionnaire-opq32r/
https://www.shl.com/solutions/products/product-catalog/view/opq-leadership-report/
https://www.shl.com/solutions/products/product-catalog/view/opq-team-types-and-leadership-styles-report
https://www.shl.com/products/product-catalog/view/enterprise-leadership-report-2-0/
https://www.shl.com/solutions/products/product-catalog/view/global-skills-assessment/
https://www.shl.com/solutions/products/product-catalog/view/verify-verbal-ability-next-generation/
https://www.shl.com/solutions/products/product-catalog/view/shl-verify-interactive-inductive-reasoning/
https://www.shl.com/solutions/products/product-catalog/view/marketing-new/
https://www.shl.com/solutions/products/product-catalog/view/english-comprehension-new/
https://www.shl.com/solutions/products/product-catalog/view/drupal-new/
https://www.shl.com/solutions/products/product-catalog/view/written-english-v1/
https://www.shl.com/solutions/products/product-catalog/view/occupational-personality-questionnaire-opq32r/
https://www.shl.com/solutions/products/product-catalog/view/search-engine-optimization-new/
https://www.shl.com/solutions/products/product-catalog/view/automata-selenium/
https://www.shl.com/products/product-catalog/view/professional-7-1-solution/
https://www.shl.com/solutions/products/product-catalog/view/javascript-new/
https://www.shl.com/solutions/products/product-catalog/view/htmlcss-new/
https://www.shl.com/solutions/products/product-catalog/view/css3-new/
https://www.shl.com/solutions/products/product-catalog/view/selenium-new/
https://www.shl.com/solutions/products/product-catalog/view/sql-server-new/
https://www.shl.com/solutions/products/product-catalog/view/automata-sql-new/
https://www.shl.com/solutions/products/product-catalog/view/manual-testing-new/
https://www.shl.com/solutions/products/product-catalog/view/administrative-professional-short-form/
https://www.shl.com/solutions/products/product-catalog/view/verify-numerical-ability/
https://www.shl.com/solutions/products/product-catalog/view/financial-professional-short-form/
https://www.shl.com/solutions/products/product-catalog/view/bank-administrative-assistant-short-form/
https://www.shl.com/solutions/products/product-catalog/view/general-entry-level-data-entry-7-0-solution/
https://www.shl.com/solutions/products/product-catalog/view/basic-computer-literacy-windows-10-new/
https://www.shl.com/solutions/products/product-catalog/view/manager-8-0-jfa-4310/
https://www.shl.com/solutions/products/product-catalog/view/microsoft-excel-365-essentials-new/
https://www.shl.com/solutions/products/product-catalog/view/digital-advertising-new/
`;

export const MOCK_CATALOG: Assessment[] = [
  {
    url: "https://www.shl.com/solutions/products/product-catalog/view/java-8-new/",
    name: "Java 8 Programming",
    adaptive_support: "No",
    description: "Assesses proficiency in Java 8 features including lambdas, streams, and functional interfaces.",
    duration: 40,
    remote_support: "Yes",
    test_type: ["Knowledge & Skills"]
  },
  {
    url: "https://www.shl.com/solutions/products/product-catalog/view/core-java-advanced-level-new/",
    name: "Core Java (Advanced Level)",
    adaptive_support: "No",
    description: "For senior roles, evaluating complex concurrency, memory management, and JVM internals.",
    duration: 60,
    remote_support: "Yes",
    test_type: ["Knowledge & Skills"]
  },
  {
    url: "https://www.shl.com/products/product-catalog/view/interpersonal-communications/",
    name: "Interpersonal Communications",
    adaptive_support: "No",
    description: "Evaluates ability to build rapport, communicate effectively with diverse teams, and manage stakeholders.",
    duration: 25,
    remote_support: "Yes",
    test_type: ["Personality & Behavior", "Competencies"]
  },
  {
    url: "https://www.shl.com/products/product-catalog/view/business-communication-adaptive/",
    name: "Business Communication (Adaptive)",
    adaptive_support: "Yes",
    description: "Measures proficiency in professional communication, collaboration, and stakeholder management skills.",
    duration: 20,
    remote_support: "Yes",
    test_type: ["Ability & Aptitude", "Competencies"]
  },
  {
    url: "https://www.shl.com/solutions/products/product-catalog/view/automata-fix-new/",
    name: "Automata Fix (Debugging)",
    adaptive_support: "No",
    description: "Language-agnostic debugging test where candidates fix logical errors in existing code.",
    duration: 45,
    remote_support: "Yes",
    test_type: ["Simulations", "Knowledge & Skills"]
  },
  {
    url: "https://www.shl.com/solutions/products/product-catalog/view/verify-interactive-g-plus/",
    name: "Verify Interactive G+",
    adaptive_support: "Yes",
    description: "Measures general cognitive ability (g) using interactive tasks.",
    duration: 24,
    remote_support: "Yes",
    test_type: ["Ability & Aptitude"]
  },
  {
    url: "https://www.shl.com/products/product-catalog/view/occupational-personality-questionnaire-opq32r/",
    name: "OPQ32r (Personality Assessment)",
    adaptive_support: "Yes",
    description: "The gold standard for measuring personality in the workplace, focusing on behavior and team interaction.",
    duration: 30,
    remote_support: "Yes",
    test_type: ["Personality & Behavior"]
  }
];

// Gold Standard Train Data for Evaluation
export const TRAIN_DATA = [
  {
    query: "Need a Java developer who is good in collaborating with external teams and stakeholders.",
    ground_truth_urls: [
      "https://www.shl.com/solutions/products/product-catalog/view/java-8-new/",
      "https://www.shl.com/products/product-catalog/view/interpersonal-communications/",
      "https://www.shl.com/products/product-catalog/view/occupational-personality-questionnaire-opq32r/"
    ]
  },
  {
    query: "Senior Backend Engineer specializing in SQL databases and complex Java concurrency",
    ground_truth_urls: [
      "https://www.shl.com/solutions/products/product-catalog/view/core-java-advanced-level-new/",
      "https://www.shl.com/solutions/products/product-catalog/view/sql-server-new/",
      "https://www.shl.com/solutions/products/product-catalog/view/automata-sql-new/"
    ]
  }
];
