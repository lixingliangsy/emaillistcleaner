# ListClean — Security & Compliance (email data — MANDATORY full depth)

## What we handle
ListClean processes the email addresses you submit (and only those) to produce a cleaning report: validity, role/disposable classification, and a deliverability score. Email lists are personal-data-adjacent and treated as sensitive by default.

## Data handling commitments
- **Minimization (GDPR Art.5):** we process only the addresses needed for the report and avoid retaining lists longer than required to return your result. ref: https://gdpr-info.eu/art-5/
- **Purpose limitation:** input is used only to generate your cleaning report; we do not repurpose it for training without explicit consent.
- **Encryption in transit:** transfers use TLS. ref: OWASP ASVS V9 (Communications).
- **Access control:** hosted on Vercel with least-privilege access. ref: https://owasp.org/Top10/A01_2021-Broken_Access_Control/

## Compliance posture (honesty rule)
> **We do NOT guarantee** compliance, 100% bounce elimination, or that you will "never" hit a spam trap. ListClean is decision-support: it reduces obvious bad addresses but cannot certify a list is deliverable. Treat output as one input to your sending hygiene, not legal or deliverability sign-off.

## Subprocessors
- Hosting: **Vercel**. Payments: **Waffo** (we never store your card data).
- No list data is sold or shared beyond these processors.

## Request handling
- Deletion / access requests: contact support; we action within reasonable GDPR timelines (Art.15–17). ref: https://gdpr-info.eu/art-17/
- No silent mock: if live AI is unavailable, the tool returns a `503 AI_NOT_CONFIGURED` or a labeled rule-based scan — never fake "clean" results under HTTP 200.
