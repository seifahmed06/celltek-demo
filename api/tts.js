// api/tts.js
export default async function handler(req, res) {
  // Only allow POST and set CORS for your domain
  if (req.method !== 'POST') return res.status(405).end();

  const { text, voiceId } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });

  // Use environment variable – never hardcode
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  const VOICE_ID = voiceId || '21m00Tcm4TlvDq8ikWAM'; // Rachel (English) or choose Arabic

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY,
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(response.status).json({ error });
  }

  // Stream the audio back as MP3
  res.setHeader('Content-Type', 'audio/mpeg');
  res.send(Buffer.from(await response.arrayBuffer()));
}
