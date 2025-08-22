# Getting Started

## Prerequisites
- Node.js 20+
- pnpm
- Firebase CLI (`npm i -g firebase-tools`)
- A Firebase project (web app created)

## Setup
```bash
pnpm i
cp .env.example .env.local
# Fill Firebase + provider keys
pnpm dev
```

## Firebase Console
- Enable **Authentication** (Email/Password and/or Google)
- Create **Cloud Firestore** (in production mode)
- Enable **Storage** (for audio uploads)

## Local URLs
- App: http://localhost:3000
