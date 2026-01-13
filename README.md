# Safaricom-Assistant

## 1️⃣ Entry Point
- User opens the chat.
- System checks:
    - Does a session exist? → Resume context if yes
    - Otherwise → Start fresh conversation

---

## 2️⃣ Determine Missing Information
Required context for recommendation:
1. Primary usage (video, social, browsing)
2. Budget range
3. Duration preference (number of days)
4. Usage frequency (low/medium/high)

Logic:
- Check which fields are missing in the user context.
- Ask only for missing information (progressive disclosure).
- Validate input type and format.

---

## 3️⃣ Build User Profile
Once all fields are captured:
- Construct a usage profile:
    - Usage type: video/social/browsing
    - Budget: X KES
    - Duration: Y days
    - Frequency: low/medium/high
- This profile is used for matching bundles.

---

## 4️⃣ Compare Profile Against Bundles
Input: User profile + bundle knowledge base

Logic:
1. Filter out bundles exceeding user budget.
2. Filter out bundles not suitable for primary usage.
3. Filter out bundles not meeting duration preference.
4. Rank remaining bundles:
    - Closest match to usage type
    - Align duration preference
    - Minimize tradeoffs (fast expiry, cost, etc.)
    
Output: Top recommended bundle(s) + optional alternatives.

---

## 5️⃣ Generate Explanation
- For each recommended bundle:
    - Explain why it fits user needs
    - Highlight tradeoffs
    - Include price and duration
- Example:
    - "Bundle X is recommended for video users, within your budget, lasts Y days. Note: heavy video use may exhaust it quickly."

---

## 6️⃣ Present Recommendation & Next Actions
Options to present:
1. Accept / Redeem bundle
2. Explore alternatives
3. Connect with human support

Logic:
- Accept → hand off to purchase or mark as “accepted”
- Explore → show next-best options
- Support → connect to agent

---

## 7️⃣ Handle Edge Cases / Failures
- Missing info or unclear answer → prompt for clarification or provide selectable options
- No suitable bundle → suggest adjusting budget/duration or show alternatives
- Conflicting answers → detect contradictions and prompt user to adjust

---

## 8️⃣ Session Management
- Store user context until conversation ends
- Optional: allow user to resume later

---

## 9️⃣ Key Principles
1. Progressive questioning: only ask what’s missing
2. Deterministic reasoning: every recommendation is explainable
3. Fit-first matching: usage → budget → duration → tradeoffs
4. Explanation layer: always justify recommendations
5. Edge-case handling: validate, clarify, fallback
