# shortennn

A full-stack URL shortener with user authentication and click analytics, built with Express, MongoDB, and EJS.

## Features

- 🔗 Shorten long URLs into compact, shareable links
- 🔐 User authentication — only logged-in users can create and manage short URLs
- 📊 Click analytics — tracks visitor city, state, country, date, and time for every click
- 🗂️ Personal dashboard to view and manage your shortened URLs
- ⚡ Built on Express + MongoDB (Mongoose) with server-rendered EJS views

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Templating:** EJS
- **Auth:** Session/cookie-based authentication middleware
- **Geolocation:** IP-based city/state/country lookup for click tracking

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB Atlas cluster (or local MongoDB instance)

### Installation

```bash
git clone https://github.com/<your-username>/shortennn.git
cd shortennn
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shortennn?retryWrites=true&w=majority
PORT=3000
```

### Run Locally

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Usage

1. Sign up / log in to your account.
2. Paste a long URL to generate a short link.
3. Share the short link — every visit is logged with location and timestamp.
4. View your dashboard to see all your shortened URLs and their click history.

## Project Structure

```
shortennn/
├── models/          # Mongoose schemas (User, URL)
├── routes/          # Express route handlers
├── views/           # EJS templates
├── middlewares/     # Auth middleware
├── public/          # Static assets (CSS, JS)
├── app.js           # App entry point
└── .env             # Environment variables (not committed)
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). Make sure your `MONGODB_URI` environment variable is set in your Vercel project settings (Production/Preview/Development as needed), and that your MongoDB Atlas cluster's network access allows connections from anywhere (`0.0.0.0/0`) or Vercel's IP ranges.

## License

This project is open source and available under the [MIT License](LICENSE).
