export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }

  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  const VOICE_ID           = process.env.ELEVENLABS_VOICE_ID;

  if (!ELEVENLABS_API_KEY || !VOICE_ID) {
    return res.status(500).json({ error: 'ElevenLabs credentials not configured' });
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Accept':       'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key':   ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text.slice(0, 500), // safety limit
          model_id: 'eleven_flash_v2_5', // 75ms latency, Arabic supported
          voice_settings: {
            stability:        0.50,
            similarity_boost: 0.75,
            style:            0.10,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const audioBuffer = await response.arrayBuffer();

    res.setHeader('Content-Type',  'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Length', audioBuffer.byteLength);
    return res.send(Buffer.from(audioBuffer));

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
