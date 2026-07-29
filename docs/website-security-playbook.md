# Website Security & Brand Protection Playbook

**Owned Domains • HTTPS • HSTS Preload • Mixed Content Auditing**

A practical guide for marketing, web development & brand teams.

*July 2026 • Internal Best Practices*

---

## Why It Matters

Brand trust starts with the domain.

| Pillar | Benefit |
|--------|---------|
| **Trust & Conversion** | Fans and partners immediately recognize a legitimate presence. Clear ownership signals reduce bounce rates and increase form completion. |
| **Anti-Phishing Defense** | Impersonation pages (fake management Linktrees, “VIP banks”) become far easier to detect and report when the real domain is strongly signaled. |
| **SEO & Discoverability** | Search engines reward verified, secure domains. Ownership signals feed Knowledge Graph results and rich snippets. |

---

## 01 — Owned Domains + HTTPS

### Requirements

- Register domain under the legal entity
- Control DNS (nameservers + records)
- Valid TLS certificate (org-validated preferred)
- Force HTTP → HTTPS 301 redirect
- Enable HSTS header
- Publish JSON-LD Organization schema
- Verify in Search Console via DNS TXT

### Key Principle

> **Never route high-value flows** (VIP experiences, ticketing, financial claims, personal data) through free third-party bio-link tools.
>
> Owned HTTPS domains are the only acceptable destination for brand-critical interactions.

---

## 02 — HSTS Preload

Browser-enforced HTTPS — forever.

### Required Header

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Prerequisites
- Valid cert on apex + all subdomains
- HTTP → HTTPS redirect on the same host
- Header present on HTTPS responses
- No mixed content

### Submission
1. Verify at [hstspreload.org](https://hstspreload.org)
2. Submit via the official form
3. Wait for Chrome inclusion (other browsers follow)

### Warnings
- Removal is slow and hard
- All future subdomains must support HTTPS
- Do **not** preload staging domains
- Commit permanently

---

## 03 — Mixed Content Audit

Find and eliminate HTTP resources on HTTPS pages.

### Active Mixed Content (blocked by browsers)
- JavaScript files
- Stylesheets (CSS)
- iframes
- XHR / fetch requests
- WebSockets

### Passive Mixed Content (warnings / usually allowed)
- Images
- Video & audio
- Fonts
- Object / embed tags

### How to Audit

1. **Browser DevTools** – Console warnings • Security tab • Network filter for `http://`
2. **Lighthouse / CI** – Best Practices audit flags mixed content automatically
3. **Online Scanners** – ssllabs.com • whynohttps.com • securityheaders.com
4. **JS Helper Script** – Client-side detection using `performance.getEntriesByType`

```js
/**
 * Mixed Content Auditor – Client-side helper
 * Documented for security reviews – July 2026
 */
function auditMixedContent() {
  if (location.protocol !== 'https:') {
    console.warn('Page is not served over HTTPS – mixed content check skipped.');
    return [];
  }

  const mixed = [];
  const resources = performance.getEntriesByType('resource');

  resources.forEach(entry => {
    if (entry.name.startsWith('http://')) {
      mixed.push({
        url: entry.name,
        type: entry.initiatorType || 'unknown',
        size: entry.transferSize
      });
    }
  });

  document.querySelectorAll('script[src], link[href], img[src], iframe[src], source[src]').forEach(el => {
    const src = el.src || el.href;
    if (src && src.startsWith('http://')) {
      mixed.push({ url: src, type: el.tagName.toLowerCase() });
    }
  });

  if (mixed.length > 0) {
    console.group('%cMixed Content Detected', 'color: red; font-weight: bold');
    console.table(mixed);
    console.groupEnd();
  } else {
    console.log('%cNo mixed content detected on this page.', 'color: green');
  }

  return mixed;
}
```

---

## 04 — JavaScript Documentation Best Practices

Make security maintainable for both engineering and marketing teams.

### Example: `config/security.js`

```js
/**
 * Domain Ownership & HTTPS Enforcement
 * ------------------------------------
 * Primary domain owned by the organization
 * Certificate: Organization-validated
 * HSTS: max-age=31536000; includeSubDomains; preload
 * Never hard-code third-party bio-link domains for high-value flows
 *
 * Reviewed: July 2026
 */

const SITE_CONFIG = {
  primaryDomain: 'https://example.com',
  allowedOrigins: ['https://example.com', 'https://www.example.com'],
  enforceHttps: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
};

// Client-side reinforcement (defense-in-depth)
if (typeof window !== 'undefined' && location.protocol !== 'https:' && SITE_CONFIG.enforceHttps) {
  location.replace(`https://${location.host}${location.pathname}${location.search}`);
}
```

Document this configuration in a living `docs/security.md` so every team member knows the current policy.

---

## Action Checklist

### Domain & DNS
- [ ] Confirm legal ownership
- [ ] Set correct nameservers
- [ ] Add verification TXT records

### HTTPS & Headers
- [ ] Valid certificate live
- [ ] Force HTTPS redirect
- [ ] Emit full HSTS header

### Content Audit
- [ ] Run Lighthouse / DevTools
- [ ] Fix every `http://` resource
- [ ] Test key user journeys

### Documentation
- [ ] Write `security.md`
- [ ] Document JS config
- [ ] Schedule quarterly review

---

## Key Takeaway

> An owned HTTPS domain with HSTS preload and zero mixed content is the strongest ownership signal a brand can send.

**Protect the brand. Protect the fans. Document everything.**

---

*This playbook was created as a companion to the Email Domain Validator project – professional tools for business, marketing, and website development teams who value clean, documented JavaScript.*
