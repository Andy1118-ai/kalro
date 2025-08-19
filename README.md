# KALRO Knowledge Hub

*Agricultural Research Knowledge Management System*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://github.com/Andy1118-ai/kalro)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

## Overview

KALRO Knowledge Hub is a comprehensive agricultural research knowledge management system designed to organize, manage, and disseminate agricultural research information and resources.

## Features

- **Document Management**: Upload, categorize, and manage agricultural research documents
- **Advanced Search**: Powerful search functionality across all content
- **Category Management**: Organize content by agricultural domains
- **Admin Dashboard**: Complete administrative interface for content management
- **User Authentication**: Secure login system for administrators
- **Analytics**: Track usage and performance metrics

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

## Deployment

This project is configured for easy deployment on Vercel. See `VERCEL_DEPLOYMENT.md` for detailed deployment instructions.

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: MySQL
- **Authentication**: JWT
- **Deployment**: Vercel

## Notes
- In development, API routes return mock data from `data/mock-data.ts`.
- Admin routes are protected by `middleware.ts` which checks for `auth_token` cookie.
- Use the Admin login page to obtain a token; in development, any password is accepted for an existing mock user email.
