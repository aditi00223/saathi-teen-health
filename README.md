# Saathi (साथी) — Your Private Health Companion

> A mobile-first, confidential sanctuary web application for teenage girls in India (ages 12–19) to ask sensitive questions about puberty, menstrual health, hygiene, mood swings, and nutrition without stigma or fear.

Designed with **Google Antigravity**, powered by **Google Gemini API**, and styled with **Stitch Design System**.

---

## Key Features

### 🌸 Core Chat Sanctuary
- **100% Confidential**: Zero accounts, zero database, zero server-side saving. All session data exists ephemerally in client memory.
- **Sisterly Tone ("Saathi Sister / दीदी")**: Empathic, culturally sensitive, non-judgmental guidance tailored to Indian teens.
- **Gentle Clarifying Follow-ups**: If a question is brief or vague, Saathi gently asks 1–2 clarifying questions before giving advice.

### 🛡️ Safety-First Guardrails
- **No Diagnosis or Prescriptions**: Saathi never diagnoses medical conditions or suggests medicine dosages.
- **Triage & Crisis Safety**: Immediate emergency escalation for red flags (severe bleeding, fainting, excruciating pain, self-harm, or abuse).
- **Verified Helplines**: Childline India (`1098`) and Tele-MANAS (`14416`) always accessible in one tap.

### 📋 4-Tier Action Plan
Every answer clearly guides the teen with 4 standardized care levels:
1. **Self-care** (rest, warmth, herbal sips, hydration)
2. **Talk to a trusted adult** (mother, elder sister, school nurse)
3. **See a doctor** (persistent or disruptive symptoms)
4. **Urgent help** (immediate medical care and national helplines)

### 💬 "How to Tell Mom or Doctor" Scripts & Summary
- **Conversation Scripts**: 2–3 sentence AI-generated, natural scripts ready to read or copy into WhatsApp.
- **Doctor Visit Summary**: Structured on-demand summary (symptoms, duration) with one-click copy.

### ⚡ Discreet Privacy Controls
- **Quick Exit**: One-tap button in the header instantly wipes the entire chat from memory and swaps the screen to an unassuming study notes page.
- **Multi-Language Support**: Instant switching between English, Hindi (हिन्दी), Punjabi (ਪੰਜਾਬੀ), and Hinglish.

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Material Symbols Outlined, Plus Jakarta Sans.
- **Backend**: Node.js, Express.js.
- **AI Engine**: Google Gemini API (`@google/generative-ai`), structured JSON output schema.
- **Design Reference**: Google Stitch (`/design`).
- **Development Tooling**: Google Antigravity.

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js (v18 or higher, tested on Node v22)
- npm (v9 or higher)
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 2. Installation
Install all dependencies (root, backend, frontend):
```bash
npm run install:all
```
*(Or install in `server/` and `client/` individually with `npm install`)*

### 3. Configure Environment Variables
Create a `.env` file in the root directory (or in `server/.env`):
```bash
cp .env.example .env
```
Add your Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=5000
```
> *Note: If `GEMINI_API_KEY` is not provided, Saathi automatically activates a built-in caring fallback engine so the application remains fully testable without breaking.*

### 4. Run Development Servers
To run both backend (port 5000) and frontend (port 3000) concurrently:
```bash
npm run dev
```

Alternatively, run each in separate terminals:
- **Backend**: `npm run dev:server` (or `cd server && npm run dev`)
- **Frontend**: `npm run dev:client` (or `cd client && npm run dev`)

Open your browser at [http://localhost:3000](http://localhost:3000).

---

## Verification & Helplines Note

> [!IMPORTANT]
> Always verify the national helpline numbers before live demonstrations:
> - **Childline India**: `1098` (Toll-free 24/7 child & teen helpline)
> - **Tele-MANAS**: `14416` (Toll-free 24/7 mental health helpline by Ministry of Health & Family Welfare, Govt. of India)
