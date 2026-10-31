# Utkarsh Bhaskar | Personal Portfolio

Responsive portfolio with project search, light/dark mode and an API-powered chatbot.

**Live website:** https://YOUR-VERCEL-URL.vercel.app

## Technologies
HTML, CSS, JavaScript, Vercel Serverless Functions, Gemini API

## Features
- Sections: Home, About Me, Skills, Projects, Contact, AI Chatbot
- Five project cards with tech tags, GitHub and live links
- Search/filter by project name or technology
- Light/dark mode (remembered between visits)
- Chatbot answering from portfolio info; shows an error message if the API fails
- API key stored in Vercel environment variables, not in the code

## Setup
1. Clone the repo and add your photo as `assets/profile.jpg`.
2. Edit the project links in `script.js` and your email in `index.html`.
3. Push to GitHub, import the repo in Vercel.
4. In Vercel, Settings > Environment Variables, add `GEMINI_API_KEY`, then redeploy.
5. Local testing: `npm i -g vercel` then `vercel dev`.
