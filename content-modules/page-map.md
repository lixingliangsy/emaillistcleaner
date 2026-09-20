# ListClean — Page Map

Routes wired from `content-modules/`:

- `/` — landing (hero extended by hero.md, ROI band from roi-proof.md, social-proof placeholder)
- `/use-cases` ← use-cases.md (3 personas)
- `/integrations` ← integrations.md (export / API / connector honesty note)
- `/security` ← security.md (MANDATORY — email data, full depth)
- `/how-it-works` ← how-it-works.md (3 steps)
- `/pricing` ← pricing.md (from lib/product.ts)
- `/faq` ← faq.md
- `/blog` ← geo-blog-plan.md (5 GEO posts)

Footer / nav map: Security · Use cases · Integrations · How it works · Blog. All self-contained Pages-Router pages (`bg-slate-50`, inline header/footer) so they build without `components/Layout`.
