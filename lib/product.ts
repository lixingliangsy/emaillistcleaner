export interface InputField {
  key: string
  label: string
  type: 'input' | 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "ListClean",
  slug: "emaillistcleaner",
  productId: "PROD_6KSfy97MLyJdVhHxrZnvoA",
  priceMonthly: 19,
  yearlyProductId: "PROD_0Df5ryJtrKUHN1i8szUrKp",
  priceYearly: 190,

  checkoutUrl: "https://pancake.waffo.ai/store/lixingliang-ai-tools-6cilbw8v/checkout/cs_befcdd5e-6288-88ea-5088-ed543cce3001",
  tagline: "Clean your email list before you hit send",
  description: "Paste a list of emails and instantly flag invalid, role-based (info@, admin@) and disposable addresses, plus a deliverability score and a copy-paste-ready clean list. Protects your sender reputation before every campaign.",
  toolTitle: "Check your email list",
  resultLabel: "Cleaning report",
  ctaLabel: "Clean my list",
  features: [
  "Invalid syntax detection",
  "Role & disposable flagging",
  "Deliverability score",
  "Copy-paste ready clean list"
],
  inputs: [
  {
    "key": "list",
    "label": "Paste emails (one per line)",
    "type": "textarea",
    "placeholder": "alice@acme.com\ninfo@acme.com\ntemp@mailinator.com"
  }
] as InputField[],
  definitionLead: "ListClean checks a pasted email list and flags invalid, role-based (info@, admin@), and disposable addresses, then gives a deliverability score and a clean list ready to copy.",
  geoFaq: [
    { q: "What is ListClean?", a: "ListClean cleans an email list by flagging invalid, role-based, and disposable addresses, with a deliverability score and a clean list." },
    { q: "What does it flag?", a: "Invalid syntax, role-based addresses (info@, admin@), and disposable domains." },
    { q: "Does it give a score?", a: "Yes. It returns a deliverability score for the list." },
    { q: "Is the clean list ready to use?", a: "It provides a copy-paste-ready clean list of valid addresses." },
    { q: "Who should use it?", a: "Marketers and founders who mail a list and want to protect sender reputation." },
    { q: "Why remove role emails?", a: "Role addresses rarely convert and can hurt deliverability; cleaning them improves campaign results." },
  ],
  systemPrompt: "You are an email deliverability expert. Given a list of emails, classify each as valid, invalid (bad syntax), role-based, or disposable/temporary, give an overall deliverability score, and list the addresses to remove. Be precise and explain why each was flagged.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Up to 200 emails"
  },
  {
    "tier": "Starter",
    "price": "$9/mo",
    "desc": "Unlimited lists"
  },
  {
    "tier": "Pro",
    "price": "$29/mo",
    "desc": "Bulk API, exports"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const raw = (inputs['list'] || '').split(/\n/).map(s => s.trim()).filter(Boolean)
  const disposableDomains = ['mailinator.com','tempmail.com','10minutemail.com','guerrillamail.com','trashmail.com','yopmail.com']
  const rolePrefixes = ['info','admin','support','sales','hello','contact','team','billing']
  let valid = 0, role = 0, disposable = 0, invalid = 0
  const remove: string[] = []
  raw.forEach(e => {
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)
    if (!ok) { invalid++; remove.push(e); return }
    const parts = e.split('@')
    const local = parts[0].toLowerCase()
    const dom = parts[1].toLowerCase()
    if (disposableDomains.indexOf(dom) >= 0) { disposable++; remove.push(e); return }
    if (rolePrefixes.indexOf(local) >= 0) { role++; remove.push(e); return }
    valid++
  })
  const score = raw.length ? Math.round((valid / raw.length) * 100) : 0
  const show = remove.slice(0, 20).join('\n')
  return `EMAIL LIST REPORT
Total: ${raw.length}
Valid: ${valid}  |  Role-based: ${role}  |  Disposable: ${disposable}  |  Invalid: ${invalid}
Deliverability score: ${score}/100

Remove these (${remove.length}):
${show}${remove.length > 20 ? '\n...' : ''}

--- (Mock scan. Add OPENAI_API_KEY for typo and spam-trap detection.)`
}
}
