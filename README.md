# বাজার দর (BazarDor)

বাংলাদেশের দৈনন্দিন বাজারের পণ্যের দাম এক জায়গায় দেখার ছোট web app। এখানে বিভিন্ন পণ্যের আজকের দাম, দাম বাড়া-কমা এবং বাজারভিত্তিক দাম দেখা যায়।

## Features

- পণ্য ও category API থেকে দেখায়
- দাম বাড়া ও কমা পণ্যের আলাদা তালিকা
- পণ্যের বিস্তারিত ও বাজারভিত্তিক দাম
- category অনুযায়ী পণ্য সাজানো
- Better Auth দিয়ে sign up ও sign in
- MongoDB Atlas-এ account রাখা
- private product details ও profile page
- profile name ও ছবি update
- বাংলা দাম, date এবং moving price ticker

## Technologies

- Next.js App Router
- React ও TypeScript
- Tailwind CSS
- Better Auth
- MongoDB Atlas
- React Hot Toast

## চালানোর নিয়ম

প্রথমে package install করুন:

```bash
npm install
```

Project-এর root-এ `.env.local` নামে ফাইল বানিয়ে `.env.example`-এর variable-গুলো নিজের তথ্য দিয়ে পূরণ করুন। MongoDB Atlas-এর connection string ও Better Auth secret লাগবে। Google/GitHub sign in চালাতে চাইলে ওই দুই provider-এর key-ও দিতে হবে।

তারপর app চালান:

```bash
npm run dev
```

Browser-এ `http://localhost:3000` খুলুন।

## Product API

পণ্য ও category-এর data এই API থেকে আসে:

```text
https://api.api-store.workers.dev/api/bazardor
```

Alternative API:

```text
https://api.abcz.workers.dev/api/bazardor
```

## Deploy করার আগে

Vercel-এ project deploy করলে Project Settings-এর Environment Variables-এ `.env.example`-এর variable-গুলো যোগ করুন। `BETTER_AUTH_URL`-এ deploy করা site-এর URL দিন। MongoDB ও Google/GitHub-এর secret value নিজের account থেকে নিন; এগুলো GitHub-এ push করবেন না।

Google OAuth-এর redirect URL হবে:

```text
https://আপনার-site-url/api/auth/callback/google
```

GitHub OAuth-এর callback URL হবে:

```text
https://আপনার-site-url/api/auth/callback/github
```
