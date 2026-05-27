# BuildForms

BuildForms is a Typeform-inspired SaaS form builder platform that allows users to create, manage, publish, and analyze forms with a modern dashboard experience.

Built with a scalable monorepo architecture using **Next.js, tRPC, Node.js, PostgreSQL, Drizzle ORM, and Tailwind CSS**.

---

## Live Demo

Frontend: https://www.buildforms.in/ 
API Docs: https://build-forms.onrender.com/docs

---

## Demo Credentials

### Demo User
Email: ravi8555@gmail.com 
Password: Ravindra@123456

---

## Features

## Authentication & User Management

- User Signup
- Login / Logout
- Email Verification
- Resend Verification Email
- Forgot Password
- Reset Password
- Secure cookie-based authentication
- Protected dashboard routes

---

## Form Builder

Create fully customizable forms with:

- Text Input
- Email Input
- Number Input
- Password Input
- Date Fields
- Required / Optional fields
- Labels
- Placeholder text
- Field descriptions
- Drag-and-drop ready architecture

Users can:

- Create forms
- Edit forms
- Delete forms
- Add fields
- Edit fields
- Delete fields

---

## Form Visibility Modes

### PUBLIC
Forms are publicly listed.

Anyone can:

- discover them
- open them
- submit responses

Perfect for:

- public surveys
- event registrations
- feedback forms

---

### UNLISTED
Forms are hidden from public listings.

Only users with the direct link can:

- access the form
- submit responses

Perfect for:

- private invites
- internal surveys
- client forms

---

### DRAFT
Work-in-progress forms.

- not publicly accessible
- cannot accept submissions

Perfect for editing before publishing.

---

## Public Form Filling

Respondents can:

- open forms without logging in
- fill forms
- submit responses

Submission access rules:

| Visibility | Access |
|----------|--------|
| PUBLIC | Yes |
| UNLISTED | Yes |
| DRAFT | No |

---

## Form Sharing

Users can:

- copy public form links
- share forms with respondents
- publish / unpublish forms
- switch between PUBLIC / UNLISTED / DRAFT

---

## Dashboard

Modern SaaS dashboard includes:

### Overview
- total forms
- published forms
- draft forms
- unlisted forms
- total responses
- response analytics chart

### Forms Management
- search forms
- filter by visibility
- edit builder
- view form
- copy link
- view submissions
- delete forms
- update visibility

### Analytics
Dedicated analytics page with:

- KPI cards
- responses over time chart
- visibility breakdown
- recent forms snapshot

---

## Form Responses

Users can:

- view all submissions
- inspect individual response data
- export submissions to CSV

---

## Explore Public Forms

Public gallery page includes:

- discoverable public forms
- public template/demo listing
- anonymous response access

Only PUBLIC forms appear here.

---

## Email Flows

Transactional email support via Brevo SMTP:

- Verify email after signup
- Resend verification email
- Forgot password email
- Reset password email

Configured using:

- custom domain sender
- professional email branding
- SMTP relay

Example sender:

support@buildforms.in

---

## API Documentation

Swagger / OpenAPI documentation available:

```bash
http://localhost:8000/docs
```

Includes:

- auth APIs
- form APIs
- submission APIs
- analytics APIs

---

## Sample Seed Data

Demo seed includes:

- demo users
- sample forms
- public forms
- draft forms
- unlisted forms
- sample submissions

Examples:

- Job Application
- Event Registration
- Customer Survey
- Contact Form
- Support Request
- Donation Form

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React
- Recharts
- React Hook Form
- next-themes
- Sonner

---

### Backend
- Node.js
- Express
- tRPC
- Zod
- JWT
- Cookie Authentication

---

### Database
- PostgreSQL
- Drizzle ORM

---

### Email
- Nodemailer
- Brevo SMTP

---

### API Docs
- OpenAPI
- Swagger UI

---

## Monorepo Structure

```bash
chaiForms-saas/
│
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # API server
│
├── packages/
│   ├── database/     # Drizzle ORM + schema
│   ├── services/     # business logic
│   ├── trpc/         # tRPC shared layer
│   ├── logger/
│   └── configs/
```

---

## Installation

### Clone

```bash
git clone https://github.com/yourusername/buildforms.git
cd buildforms
```

---

### Install dependencies

```bash
pnpm install
```

---

## Environment Variables

### API

Create:

```bash
apps/api/.env
```

Example:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/buildforms

JWT_SECRET=superman123

BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your-user
BREVO_SMTP_PASSWORD=your-password

BREVO_FROM_EMAIL=support@buildforms.in
BREVO_FROM_NAME=BuildForms

APP_URL=http://localhost:3030
```

---

### Frontend

Create:

```bash
apps/web/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/trpc
```

---

## Database Setup

Generate migrations:

```bash
pnpm db:generate
```

Run migrations:

```bash
pnpm db:migrate
```

Seed demo data:

```bash
pnpm db:seed
```

---

## Run Development

Frontend:

```bash
pnpm --filter web dev
```

Backend:

```bash
pnpm --filter api dev
```

---

## Build

```bash
pnpm build
```

---

## Production Deployment

Frontend:

- Vercel

Backend:

- Railway
- Render
- VPS
- Docker

Database:

- Neon
- Supabase Postgres
- Railway Postgres

---

## Product Vision

BuildForms is designed as a modern SaaS alternative to:

- Typeform
- Google Forms
- Tally
- Jotform

With focus on:

- developer-friendly architecture
- SaaS dashboard UX
- secure auth flows
- public form sharing
- analytics
- scalable APIs

---

## Future Enhancements

Planned:

- drag-and-drop builder
- custom themes
- response notifications
- webhook support
- form templates
- embeddable forms
- team collaboration
- payment forms
- file uploads
- response limits
- CAPTCHA protection
- custom domains

---

## Author

Built by Ravindra Dhadave

Frontend Engineer | Full Stack Developer

Email: ravi8555@gmail.com

---

## License

MIT