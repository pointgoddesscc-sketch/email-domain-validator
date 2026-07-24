/**
 * =====================================================
 * Email Domain Validator
 * Business • Marketing • Website Development Tool
 * =====================================================
 *
 * Clean, fully documented JavaScript module for:
 *  - Email format validation (RFC 5322 simplified)
 *  - Detection of common placeholder / template domains
 *  - Marketing risk assessment for lead lists & CRM
 *  - Reusable validation logic for forms and apps
 *
 * Author: Built for professional use
 * License: MIT
 * Version: 1.0.0
 * =====================================================
 */

/**
 * List of known placeholder / sample domains frequently
 * found in educational materials, Microsoft templates,
 * résumés, invoices, and training documents.
 *
 * These domains should never be treated as real contacts
 * in marketing campaigns or CRM databases.
 */
const PLACEHOLDER_DOMAINS = [
  "interestingsite.com",
  "example.com",
  "example.org",
  "example.net",
  "contoso.com",
  "fourthcoffee.com",
  "fabrikam.com",
  "northwindtraders.com",
  "adventure-works.com",
  "test.com",
  "sample.com",
  "domain.com",
  "email.com",
  "mail.com",          // sometimes used in samples
  "placeholder.com",
  "yourdomain.com",
  "company.com"
];

/**
 * Core validation function.
 *
 * @param {string} email - The email address to validate and research
 * @returns {Object} Result object with the following properties:
 *   - valid {boolean}          : Whether the email has a valid format
 *   - isPlaceholder {boolean}  : Whether the domain is a known placeholder
 *   - domain {string|null}     : Extracted domain (lowercase)
 *   - riskLevel {"low"|"medium"|"high"} : Marketing risk assessment
 *   - reason {string}          : Human-readable explanation
 *   - insight {string}         : Business/marketing recommendation
 *
 * @example
 * const result = validateEmail("caneiro@interestingsite.com");
 * // {
 * //   valid: true,
 * //   isPlaceholder: true,
 * //   domain: "interestingsite.com",
 * //   riskLevel: "high",
 * //   reason: "Placeholder domain detected – not a real contact",
 * //   insight: "..."
 * // }
 */
function validateEmail(email) {
  // Normalize input
  const normalized = (email || "").trim().toLowerCase();

  // Empty check
  if (!normalized) {
    return {
      valid: false,
      isPlaceholder: false,
      domain: null,
      riskLevel: "high",
      reason: "No email provided",
      insight: "Please enter an email address to begin research."
    };
  }

  // Standard email format regex (practical subset of RFC 5322)
  // Covers the vast majority of real-world addresses used in business
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalized)) {
    return {
      valid: false,
      isPlaceholder: false,
      domain: null,
      riskLevel: "high",
      reason: "Invalid email format",
      insight: "This address does not follow standard email structure. Reject it in forms and lead capture systems."
    };
  }

  // Extract domain
  const domain = normalized.split("@")[1];

  // Check against known placeholder list
  const isPlaceholder = PLACEHOLDER_DOMAINS.includes(domain);

  if (isPlaceholder) {
    return {
      valid: true,
      isPlaceholder: true,
      domain: domain,
      riskLevel: "high",
      reason: "Placeholder domain detected – not a real contact",
      insight: `"${domain}" is a known sample/placeholder domain used in educational templates, invoices, and Microsoft-style documents. Do not add this address to marketing lists, CRM systems, or outreach campaigns. Treat it as test data only.`
    };
  }

  // Valid format + real-looking domain
  return {
    valid: true,
    isPlaceholder: false,
    domain: domain,
    riskLevel: "low",
    reason: "Valid format and no known placeholder domain",
    insight: "This email passes basic format and placeholder checks. For production marketing use, consider additional verification (MX records, disposable-email detection, or double opt-in)."
  };
}

/**
 * Renders the validation result into the UI.
 * Separated from pure logic so the core function remains reusable
 * in Node.js, React, Vue, or any other environment.
 *
 * @param {Object} result - Output from validateEmail()
 * @param {string} originalEmail - The original user input (for display)
 */
function displayResults(result, originalEmail) {
  const resultsEl = document.getElementById("results");
  const badgeEl = document.getElementById("statusBadge");
  const formatEl = document.getElementById("formatResult");
  const placeholderEl = document.getElementById("placeholderResult");
  const domainEl = document.getElementById("domainResult");
  const riskEl = document.getElementById("riskResult");
  const insightEl = document.getElementById("insightText");
  const snippetEl = document.getElementById("jsSnippet");

  // Show the results panel
  resultsEl.classList.remove("hidden");

  // Badge
  badgeEl.textContent = result.riskLevel === "low" ? "Clean" : 
                        result.riskLevel === "medium" ? "Caution" : "High Risk";
  badgeEl.className = "badge " + (
    result.riskLevel === "low" ? "success" :
    result.riskLevel === "medium" ? "warning" : "danger"
  );

  // Values
  formatEl.textContent = result.valid ? "Yes ✓" : "No ✗";
  formatEl.style.color = result.valid ? "var(--success)" : "var(--danger)";

  placeholderEl.textContent = result.isPlaceholder ? "Yes – Detected" : "No";
  placeholderEl.style.color = result.isPlaceholder ? "var(--danger)" : "var(--success)";

  domainEl.textContent = result.domain || "—";
  riskEl.textContent = result.riskLevel.toUpperCase();
  riskEl.style.color = result.riskLevel === "low" ? "var(--success)" :
                       result.riskLevel === "medium" ? "var(--warning)" : "var(--danger)";

  // Insight
  insightEl.textContent = result.insight;

  // Show the actual reusable code snippet for developers
  snippetEl.textContent = `// Reusable validation call
const result = validateEmail("${originalEmail}");
console.log(result);

// Expected output for this email:
${JSON.stringify(result, null, 2)}`;
}

/**
 * Main event handler – keeps UI logic thin
 */
function handleValidate() {
  const input = document.getElementById("emailInput");
  const email = input.value;
  const result = validateEmail(email);
  displayResults(result, email);
}

/**
 * Initialize the application
 * - Bind button click
 * - Allow Enter key to trigger validation
 * - Pre-fill example for demonstration (optional)
 */
function init() {
  const btn = document.getElementById("validateBtn");
  const input = document.getElementById("emailInput");

  btn.addEventListener("click", handleValidate);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleValidate();
    }
  });

  // Optional: pre-load the original research email as example
  // input.value = "caneiro@interestingsite.com";
}

// Start the app when DOM is ready
document.addEventListener("DOMContentLoaded", init);

/**
 * =====================================================
 * EXPORT FOR MODULE SYSTEMS (optional)
 * Uncomment if using in Node.js / bundlers
 * =====================================================
 *
 * if (typeof module !== "undefined" && module.exports) {
 *   module.exports = { validateEmail, PLACEHOLDER_DOMAINS };
 * }
 *
 * // Or ES module:
 * // export { validateEmail, PLACEHOLDER_DOMAINS };
 */
