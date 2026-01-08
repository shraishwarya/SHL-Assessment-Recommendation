<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SHL Assessment Recommendation System

## Overview

The **SHL Assessment Recommendation System** is an AI-powered application designed to assist recruiters, HR professionals, and hiring managers in selecting the most appropriate **preliminary SHL assessments** based on a given **job description**.

By analyzing the role requirements, required skills, experience level, and competency expectations described in a job posting, the system intelligently recommends suitable assessment categories such as **cognitive ability**, **behavioral/personality**, **situational judgment**, and **technical or role-specific tests**.

This tool helps streamline early-stage hiring decisions, reduce manual effort, and ensure a more structured and role-aligned candidate screening process.

---

## Problem Statement

In many hiring workflows, selecting the right preliminary assessment is often:

* Time-consuming
* Dependent on subjective judgment
* Inconsistent across roles or recruiters

An incorrect or poorly aligned assessment can lead to:

* Ineffective candidate screening
* Increased hiring time
* Poor candidate experience

The **SHL Assessment Recommendation System** addresses this challenge by automating assessment selection using AI-driven analysis of job descriptions.

---

## Solution

This system uses natural language understanding to:

1. Parse and analyze the job description
2. Identify key role attributes such as:

   * Core skills
   * Cognitive complexity
   * Behavioral traits
   * Technical depth
3. Map these attributes to relevant **SHL assessment categories**
4. Recommend the most suitable **preliminary assessments** for the role

The result is a consistent, scalable, and explainable recommendation that supports data-driven hiring decisions.

---

## Key Features

* **Job Description Analysis** – Understands responsibilities, skills, and role complexity
* **Assessment Recommendation** – Suggests appropriate SHL assessment types
* **Role-Based Evaluation** – Aligns assessments with job level and function
* **Time-Saving** – Reduces manual effort in assessment selection
* **Scalable Design** – Can be extended to multiple job roles and industries

---

<img width="1866" height="843" alt="image" src="https://github.com/user-attachments/assets/7cdd5447-925b-4089-b833-d9fa2c678222" />


---
## Input

The system accepts:

* A **job description** as plain text

Example input:

> "We are looking for a software engineer with strong problem-solving skills, experience in Python, and the ability to work collaboratively in agile teams."

---

## Output

The system generates:

* A list of **recommended SHL preliminary assessments**
* Brief reasoning for each recommendation

Example output:

* Cognitive Ability Test – to assess problem-solving and logical reasoning
* Technical Skills Assessment – to evaluate Python proficiency
* Behavioral Assessment – to understand teamwork and collaboration style

---

## Target Users

* Recruiters
* Talent Acquisition Teams
* HR Professionals
* Hiring Managers
* Organizations using SHL assessments

---

## Use Cases

* Initial screening for technical and non-technical roles
* Standardizing assessment selection across teams
* Reducing bias in early-stage hiring decisions
* Supporting data-driven recruitment workflows

---

## Technology Stack (Conceptual)

* Natural Language Processing (NLP)
* Large Language Models (LLMs)
* Google AI Studio (for app deployment and interaction)

> Note: The system logic can be adapted or integrated into existing ATS or HR platforms.

---

## Limitations

* Recommendations are dependent on the clarity and quality of the job description
* The system suggests assessment categories, not proprietary SHL test names
* Final assessment selection should be validated by HR professionals

---

## Future Enhancements

* Mapping to specific SHL test IDs
* ATS integration
* Multi-language job description support
* Confidence scoring for recommendations
* Analytics dashboard for hiring insights

---

## Disclaimer

This tool provides **recommendations for guidance purposes only**. Final hiring and assessment decisions should be made by qualified HR professionals in alignment with organizational policies and SHL guidelines.

---

## Author

**Shri Aishwarya Nagasundaram**

---

## License

This project is intended for educational and demonstration purposes.


# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/11c8j1vExA4ydM9NM0Rk8ngwE1WitBAjY

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
