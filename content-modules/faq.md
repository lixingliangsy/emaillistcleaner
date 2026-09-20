# ListClean — FAQ

**Q: Is my email list stored or trained on?**
A: Input is used only to generate your cleaning report. We do not train public models on your submissions without explicit consent.

**Q: What does the deliverability score mean?**
A: A 0–100 signal computed from the share of valid vs. flagged (role/disposable/invalid) addresses in your sample. It is an estimate, not a guarantee of inbox placement.

**Q: Do you detect spam traps?**
A: Live mode (with `OPENAI_API_KEY`) flags typo and spam-trap risk patterns. Demo mode is a rule-based scan (syntax + known disposable domains) and does not claim trap detection.

**Q: Can I clean a list via API?**
A: Yes — the Pro tier includes a bulk API that returns a structured cleaning report.

**Q: Which ESPs can I export to?**
A: Any. The keep-list and remove-list are plain text/CSV-ready, importable to Mailchimp, ConvertKit, Brevo, Beehiiv, and others.

**Q: Will cleaning guarantee my emails get delivered?**
A: No. ListClean reduces obvious bad addresses but cannot guarantee deliverability. Sending reputation also depends on content, authentication (SPF/DKIM/DMARC), and history.
