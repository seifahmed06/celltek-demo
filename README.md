# CellTek — AI Patient Support Assistant

A fully functional, offline‑capable AI assistant for patient inquiries (branch hours, exam prep, insurance, pricing). Includes **chat** and **voice call** modes with high‑quality **ElevenLabs TTS** (optional fallback to browser TTS).

## Features

- Bilingual (Arabic/English) – automatically detects language.
- **Chat** mode – instant answers from a built‑in knowledge base.
- **Voice mode** – speak naturally, the assistant listens and responds.
- **Barge‑in** – interrupt the assistant while it's speaking.
- **Secure ElevenLabs integration** – API key never exposed to the client.
- **Fallback TTS** – works even without ElevenLabs (lower quality).

## Deployment on Vercel

1. Push this repository to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Add the environment variable:
   - `ELEVENLABS_API_KEY` = your ElevenLabs API key (starts with `sk_`).
4. Deploy – Vercel automatically detects the `api/` folder and creates the serverless function.

## Environment Variables

| Name | Description |
|------|-------------|
| `ELEVENLABS_API_KEY` | Your ElevenLabs API key (required for premium TTS). |

## Local Development

- The frontend works completely offline (chat mode, fallback TTS).
- For ElevenLabs TTS locally, you need a backend proxy (the `api/tts.js` file is designed for Vercel – for local testing use `vercel dev` or a custom Node server).

## Customisation

- **Change voices** – edit `VOICE_EN` and `VOICE_AR` in `index.html` with ElevenLabs voice IDs.
- **Modify knowledge base** – edit the `KB` array in `index.html`.

## Browser Support

- **Voice mode** requires Chrome, Edge, or Safari (Web Speech API).
- **ElevenLabs TTS** works in any modern browser (plays MP3).

## License

MIT – free for personal and commercial use.
