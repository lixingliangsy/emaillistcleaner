/** Email list hygiene deterministic checks. */
export const RULESET_VERSION = 'list-hygiene@2026-07-20'

export type RuleHit = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  remediation?: string
  ref?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
const DISPOSABLE = /mailinator|guerrillamail|tempmail|10minutemail|trashmail|yopmail/i
const ROLE = /^(info|admin|support|sales|contact|noreply|no-reply|office)@/i

export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const raw = (inputs.list || '').trim()
  const lines = raw.split(/\n|,/).map((s) => s.trim()).filter(Boolean)
  const emails = lines.filter((l) => EMAIL_RE.test(l))
  const badSyntax = lines.length - emails.length
  const disposable = emails.filter((e) => DISPOSABLE.test(e)).length
  const role = emails.filter((e) => ROLE.test(e)).length
  return [
    {
      id: 'EL-01',
      title: 'At least one address provided',
      severity: 'high',
      passed: lines.length >= 1,
      remediation: 'Paste emails one per line.',
      ref: 'https://www.m3aawg.org/sites/default/files/doc_files/M3AAWG_Senders_BCP_Ver3-2015-02.pdf',
    },
    {
      id: 'EL-02',
      title: 'Majority look like email syntax',
      severity: 'high',
      passed: emails.length >= Math.max(1, Math.ceil(lines.length * 0.5)),
      remediation: 'Fix syntax errors before send (local@domain.tld).',
      ref: 'https://www.m3aawg.org/documents/en/m3aawg-sender-best-common-practices-version-30',
    },
    {
      id: 'EL-03',
      title: 'Syntax failures flagged when present',
      severity: 'medium',
      passed: badSyntax === 0 || emails.length > 0,
      remediation: `Remove/repair ${badSyntax} invalid line(s).`,
      ref: 'https://www.m3aawg.org/sites/default/files/doc_files/M3AAWG_Senders_BCP_Ver3-2015-02.pdf',
    },
    {
      id: 'EL-04',
      title: 'Disposable domains detectable',
      severity: 'medium',
      passed: true,
      remediation: disposable
        ? `Flag ${disposable} disposable/temporary address(es) for removal.`
        : 'No common disposable domains detected in sample.',
      ref: 'https://www.m3aawg.org/documents/en/m3aawg-sender-best-common-practices-version-30',
    },
    {
      id: 'EL-05',
      title: 'Role accounts noted (deliverability risk)',
      severity: 'low',
      passed: true,
      remediation: role
        ? `Review ${role} role-based address(es) (info@/admin@…) — often poor engagement.`
        : 'No common role accounts in sample.',
      ref: 'https://www.m3aawg.org/sites/default/files/doc_files/m3aawg-selling-email-lists-2019-06.pdf',
    },
    {
      id: 'EL-06',
      title: 'List not treated as purchased commodity',
      severity: 'high',
      passed: !/purchased.?list|bought.?leads|scraped/i.test(raw),
      remediation: 'Do not mail purchased/scraped lists (M3AAWG / permission basis).',
      ref: 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business',
    },
  ]
}
