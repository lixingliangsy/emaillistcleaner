# ListClean — How It Works

## Step 1 — Paste your list
Drop emails one per line (or paste a column). No upload limits on format; Free covers up to 200 emails.

## Step 2 — Get a cleaning report
ListClean classifies each address as valid, invalid (bad syntax), role-based, or disposable/temporary and computes a deliverability score. Live mode (with `OPENAI_API_KEY`) also flags typo and spam-trap risk.

## Step 3 — Copy the clean list
Copy the keep-list and the remove-list. Re-import the clean version into your ESP before the next send.

> Demo mode returns a rule-based scan. Add `OPENAI_API_KEY` for typo and spam-trap detection.
