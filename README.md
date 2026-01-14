# Safaricom Assistant

## Overview
**Safaricom Assistant** is an intelligent recommendation system that helps users choose the best mobile data bundles based on their usage, budget, and preferences. It progressively collects user information, builds a usage profile, matches it against available bundles, and provides clear, explainable recommendations. 
---

## Features

1. **Session Management**
   - Detects if a user session exists and resumes context automatically.
   - Supports starting fresh conversations for new users.
   - Stores session and profile state in **Redis** for fast access.

2. **Progressive Information Gathering**
   - Collects only missing information from the user to avoid repetitive questions.
   - Validates input type and format for accuracy.
   - Required context includes:
     - Primary usage (e.g., video, social, browsing)
     - Budget range
     - Duration preference (number of days)
     - Usage frequency (low / medium / high)

3. **User Profile Construction**
   - Builds a personalized usage profile once all required fields are captured:
     - Usage type
     - Budget
     - Duration
     - Frequency
   - Profile stored in **PostgreSQL** for analytics and recommendations.

4. **Bundle Matching Logic**
   - Filters available bundles based on:
     - Budget constraints
     - Suitability for primary usage
     - Duration preference
   - Ranks remaining bundles:
     - Closest match to usage type
     - Alignment with duration preference
     - Minimization of tradeoffs (e.g., fast expiry, cost)

5. **Real-Time Recommendations**
   - Uses **Socket.IO** to push bundle suggestions to the user instantly.
   - Allows live updates if usage context changes or new bundles are available.

6. **Recommendation Explanation**
   - Provides reasoning for each recommended bundle, including:
     - Why it fits the user's profile
     - Potential tradeoffs
     - Price and duration
   - Example:  
     *"Bundle X is recommended for video users, within your budget, lasts Y days. Note: heavy video use may exhaust it quickly."*

7. **User Options & Next Actions**
   - Accept / Redeem bundle
   - Explore alternative bundles
   - Connect with human support
   - Logic:
     - Accept → hand off to purchase or mark as accepted
     - Explore → show next-best options
     - Support → connect to an agent

8. **Edge Case Handling**
   - Missing or unclear information → prompts for clarification or selectable options
   - No suitable bundle → suggests adjusting budget/duration or presents alternatives
   - Conflicting answers → detects contradictions and requests user adjustments

---

## Key Principles

1. **Progressive Questioning** – ask only what's missing.  
2. **Deterministic Reasoning** – recommendations are explainable.  
3. **Fit-First Matching** – prioritize usage → budget → duration → tradeoffs.  
4. **Explanation Layer** – every recommendation is justified.  
5. **Edge-Case Handling** – validate input, clarify ambiguities, and provide fallback options.

---

## Technology Stack
- **Frontend:** React (Vite)  
- **Backend:** Node.js + Express + Socket.IO  
- **Database:** PostgreSQL  
- **Caching / Session Management:** Redis  
- **Real-Time Communication:** Socket.IO  

---

## Getting Started

### Clone the Repository
```bash
git clone <repo-url>
cd Safaricom-Assistant
```

### Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Run Locally
```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

---

## Future Improvements
- Enhance recommendation ranking algorithm using analytics from PostgreSQL
- Implement authentication for persistent user profiles
- Add multilingual support
- Optimize Redis caching strategies for large-scale deployment
```
