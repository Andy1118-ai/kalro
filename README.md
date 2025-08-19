# Kalro knowledge hub

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/gats-projects-e787eeb0/v0-kalro-knowledge-hub)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/102PePRq8gb)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/gats-projects-e787eeb0/v0-kalro-knowledge-hub](https://vercel.com/gats-projects-e787eeb0/v0-kalro-knowledge-hub)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/102PePRq8gb](https://v0.dev/chat/projects/102PePRq8gb)**

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Environment variables

Create a `.env.local` at the project root:

```bash
# Database (used when NODE_ENV !== development)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=kalro_knowledge_hub

# Auth
JWT_SECRET=change-me

# Optional: set if API runs on a different origin
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run the development server

```bash
npm run dev
```

## Notes
- In development, API routes return mock data from `data/mock-data.ts`.
- Admin routes are protected by `middleware.ts` which checks for `auth_token` cookie.
- Use the Admin login page to obtain a token; in development, any password is accepted for an existing mock user email.

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository