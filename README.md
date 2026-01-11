# APPLIX Suite (No Auth) — Golden Gemini

✅ Next.js App Router + Tailwind  
✅ 6 interfaces (pages) même style  
✅ NFC Studio avec templates + flip seulement via bouton  
✅ Profil public `/u/[slug]`  
✅ Backend Supabase (orders) + Stripe Checkout + Webhook (MVP)

## Run
```bash
npm i
npm run dev
```

## Configure (.env)
1) Copy `.env.example` → `.env.local`
2) Fill Supabase keys + Stripe keys.

## Supabase
- Open Supabase SQL Editor → run `supabase/schema.sql`

## Stripe
- Create a webhook endpoint (test) to: `/api/stripe/webhook`
- Add events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`

## Admin
- Orders list: `/admin/orders?token=YOUR_ADMIN_TOKEN`

## Pages
- `/` Home
- `/studio`
- `/ai-app` (v2)
- `/products`
- `/academy`
- `/hub`
- `/nfc-studio`
- `/u/demo`
- `/dashboard`
- `/admin`
- `/admin/orders`
