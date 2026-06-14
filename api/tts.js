// api/tts.js
module.exports = async function handler(req, res) {
  // Enable CORS for all origins (required for browser calls)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the text to speak
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }

  // Get API key from environment variables (must be set in Vercel)
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error('Missing ELEVENLABS_API_KEY environment variable');
    return res.status(500).json({ error: 'Server configuration error: missing API key' });
  }

  // Hardcoded voice ID (your custom voice)
  const voiceId = 'wxweiHvoC2r2jFM7mS8b';

  // Prepare the request to ElevenLabs
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text.slice(0, 500), // Limit to 500 chars (safe for free tier)
        model_id: 'eleven_flash_v2_5', // Fast, low‑cost model (uses fewer characters)
        voice_settings: {
          stability: 0.50,
          similarity_boost: 0.75,
          style: 0.10,
          use_speaker_boost: true,
        },
      }),
    });

    // Handle non‑2xx responses from ElevenLabs
    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs error:', errorText);
      // Return the error as JSON so the frontend can fallback gracefully
      return res.status(response.status).json({ 
        error: `ElevenLabs error: ${response.status} ${errorText.substring(0, 200)}` 
      });
    }

    // Stream the audio back to the client
    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Length', audioBuffer.byteLength);
    res.send(Buffer.from(audioBuffer));

  } catch (err) {
    console.error('TTS proxy error:', err);
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
};
