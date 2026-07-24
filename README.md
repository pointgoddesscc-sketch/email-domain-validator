# Email Domain Validator

**Professional Email & Domain Research Tool for Business, Marketing & Website Development**

A clean, documented JavaScript tool that validates email addresses, detects common placeholder/template domains, and provides marketing-ready insights.

---

## Live Demo

Deployed and published for immediate use.

---

## Why This Tool?

In business and marketing workflows you constantly deal with:

- Lead lists from forms
- CRM imports
- Sample invoices and educational documents
- Website form testing data

Placeholder emails such as `caneiro@interestingsite.com` appear frequently in templates, Microsoft sample files, résumés, and training materials. Sending campaigns to these addresses wastes budget and damages deliverability.

This tool solves that problem with one clean, reusable JavaScript function.

---

## Features

- **Format Validation** – Practical RFC 5322 style check
- **Placeholder Detection** – Recognizes known sample domains including `interestingsite.com`
- **Marketing Risk Score** – Low / Medium / High risk classification
- **Business Insights** – Clear recommendations for marketers and developers
- **Fully Documented JavaScript** – Copy-paste ready for any project
- **Responsive UI** – Works on desktop and mobile
- **Zero Dependencies** – Pure vanilla JavaScript

---

## Quick Start (Website)

1. Open `index.html` in any modern browser, or
2. Deploy to any static host (Vercel, Netlify, GitHub Pages, etc.)

No build step required.

---

## JavaScript Documentation

### Core Function: `validateEmail(email)`

```js
/**
 * @param {string} email - The email address to validate and research
 * @returns {Object}
 *   - valid {boolean}
 *   - isPlaceholder {boolean}
 *   - domain {string|null}
 *   - riskLevel {"low"|"medium"|"high"}
 *   - reason {string}
 *   - insight {string}
 */
function validateEmail(email) { ... }
```

#### Example Usage

```js
const result = validateEmail("caneiro@interestingsite.com");

console.log(result);
/*
{
  valid: true,
  isPlaceholder: true,
  domain: "interestingsite.com",
  riskLevel: "high",
  reason: "Placeholder domain detected – not a real contact",
  insight: "\"interestingsite.com\" is a known sample/placeholder domain..."
}
*/
```

### Using in Your Own Projects

#### Browser Form

```html
<input type="email" id="email">
<button onclick="checkEmail()">Validate</button>

<script src="script.js"></script>
<script>
  function checkEmail() {
    const email = document.getElementById("email").value;
    const result = validateEmail(email);
    
    if (result.isPlaceholder) {
      alert("This is a placeholder email – do not add to marketing lists.");
    } else if (!result.valid) {
      alert("Invalid email format.");
    } else {
      alert("Email looks clean.");
    }
  }
</script>
```

#### Node.js / Backend

```js
// After copying the function or importing
const { validateEmail } = require("./script.js"); // or ES import

const leads = ["user@realcompany.com", "test@interestingsite.com"];
const cleanLeads = leads.filter(email => {
  const r = validateEmail(email);
  return r.valid && !r.isPlaceholder;
});
```

#### React Example

```jsx
import { validateEmail } from "./validateEmail";

function EmailChecker() {
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    setResult(validateEmail(e.target.value));
  };

  return (
    <div>
      <input onChange={handleCheck} />
      {result && (
        <p>Risk: {result.riskLevel} – {result.reason}</p>
      )}
    </div>
  );
}
```

---

## Known Placeholder Domains

The tool currently detects:

- interestingsite.com
- example.com / example.org / example.net
- contoso.com
- fourthcoffee.com
- fabrikam.com
- northwindtraders.com
- adventure-works.com
- test.com, sample.com, domain.com, and other common template domains

You can easily extend the `PLACEHOLDER_DOMAINS` array in `script.js`.

---

## Project Structure

```
email-domain-validator/
├── index.html          # Main UI
├── styles.css          # Professional business styling
├── script.js           # Fully documented validation logic
└── README.md           # This documentation
```

---

## Research Background

This project was created after researching the email `caneiro@interestingsite.com`.

Findings:
- The domain `interestingsite.com` is a parked domain currently listed for sale.
- The address appears in educational commercial-law notes, sample invoices, résumés, and Microsoft-style templates.
- It is not associated with any real business or individual.

This tool turns that research into a practical, reusable asset for marketing and development teams.

---

## License

MIT – Free for commercial and personal use.

---

## Contributing

Pull requests welcome. Especially useful additions:
- More placeholder domains
- Disposable email detection
- MX record lookup (server-side)
- CSV bulk validation

---

Built with clean JavaScript for business, marketing, and website development professionals.
