# Frontend AI Internship — Week 3A / FE-04

## Capstone skeleton, deployed

This iteration moves the project to Next.js App Router and establishes the Week 3 production foundation: routed placeholder screens, a shared root layout, Tailwind CSS design tokens, environment-variable structure, and a server-rendered health check.

### Routes

- / — capstone overview
- /dashboard — dashboard placeholder
- /tasks — tasks placeholder
- /calendar — calendar placeholder
- /insights — insights placeholder
- /settings — settings placeholder
- /health-check — fetched-data health check
- /api/health — JSON health endpoint

### Run locally

npm install
npm run dev
npm run build

### Deployment

The repository is configured for Vercel/Next.js. Git-connected deployments can generate a preview for each push or pull request once the repository is connected to the Vercel project.

### Environment variables

.env.example documents the structure. Real secrets belong in Vercel Environment Variables and must never be committed. .env files are ignored by Git.

### Architecture

The App Router uses Server Components by default. No Client Components are needed for this skeleton because navigation and placeholder screens are server-rendered. Interactive components can be introduced later with an explicit client boundary.

### Responsive acceptance targets

The shared shell and pages use responsive Tailwind utilities and are designed for the assignment's 375px mobile and 1280px desktop targets.
