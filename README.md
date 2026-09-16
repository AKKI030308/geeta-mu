# Current HTML + Cashfree + Telegram

CTA click -> Cashfree Checkout -> server-side verification -> Telegram invite.

Vercel Environment Variables:
CASHFREE_APP_ID=YOUR_APP_ID
CASHFREE_SECRET_KEY=YOUR_SECRET_KEY
CASHFREE_ENV=sandbox
CASHFREE_API_VERSION=2025-01-01
SITE_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
EXPECTED_AMOUNT=199
TELEGRAM_INVITE_LINK=https://t.me/+YOUR_PRIVATE_INVITE

Webhook: https://YOUR-VERCEL-DOMAIN.vercel.app/api/webhook

Never commit .env or Cashfree secret keys.
