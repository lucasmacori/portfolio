# Lucas Macori — Portfolio

Personal portfolio built with Next.js 15, Tailwind CSS v4, and Framer Motion.

Accessible at [lucasmacori.fr](https://lucasmacori.fr).

![Screenshot of the portfolio website](https://github.com/lucasmacori/portfolio/blob/main/screenshot.png)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file at the root of the project:

```bash
cp .env.local.example .env.local
```

Then fill in the required values:

| Variable | Description |
|---|---|
| `N8N_PORTFOLIO_AUTH` | Base64-encoded Basic Auth credentials for the n8n contact form webhook (`user:password` encoded in base64) |

> `.env.local` is git-ignored and must never be committed.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
