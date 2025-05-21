# Job Tracker

Hey there! Welcome to **Job Tracker**, a friendly little React app that helps you keep all your job applications in one place. Whether you’re applying for internships or full-time gigs, this tool makes it easy to add new roles, update their status, and even delete ones you’re no longer interested in.

## Features

- **User authentication** via Supabase (email/password or magic link)  
- **Create, read, update, and delete** your job entries  
- **Status tracking** (e.g., “Applied”, “Interviewing”, “Offer”)  
- **Responsive UI** so it looks great on desktop and mobile  
- **Real-time updates** thanks to Supabase subscriptions  

## Tech Stack

- Bootstrapped with Create React App :contentReference[oaicite:0]{index=0}  
- Built with TypeScript, HTML, CSS, and a bit of JavaScript :contentReference[oaicite:1]{index=1}  
- Styled using Tailwind CSS (with PostCSS)  
- Backend powered by Supabase (Auth + PostgreSQL)  

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or later  
- A Supabase account (free tier works great)  

### Installation

```bash
# 1. Clone this repo
git clone https://github.com/timchen0326/job-tracker.git
cd job-tracker

# 2. Install dependencies
npm install
