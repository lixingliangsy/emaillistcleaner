export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "ListClean",
  slug: "emaillistcleaner",
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
  const remove = []
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
