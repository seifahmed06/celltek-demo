// api/chat.js – NVIDIA Llama with full bilingual knowledge base

const SYSTEM_PROMPT = `
You are CellTek AI, a helpful assistant for CellTek, a radiology and medical services group in Egypt.
You must answer **only** from the knowledge provided below. If you don't know the answer, politely ask the user to call 16789.
Always reply in the same language as the user's question (Arabic or English). Keep voice answers short (1–2 sentences).

===============================
KNOWLEDGE BASE (Arabic & English)
===============================

# Branches / الفروع
- Nasr City / مدينة نصر: 90 Abbas El-Akkad St, 8AM–10PM (Ramadan: 9AM–6PM)
- Maadi / المعادي: 15 Road 9, 8AM–9PM (Ramadan: 9AM–5PM)
- Heliopolis / مصر الجديدة: 32 Merghany St, 8AM–10PM (Ramadan: 9AM–6PM)
- 6th October / السادس من أكتوبر: Central Mall, 9AM–9PM (Ramadan: 9AM–5PM)
- New Cairo / القاهرة الجديدة: 90th St, 1st Settlement, 8AM–10PM (Ramadan: 9AM–6PM)
All branches are closed on Friday. Hotline: 16789

# Exam Preparation / تحضيرات الفحوصات
- MRI Brain/Spine: No fasting, remove metal, 30–60 min.
- MRI Abdomen: Fast 4–6 hours, 45–75 min.
- CT with Contrast: Fast 4 hours, bring creatinine test, 15–30 min.
- CT without Contrast: No preparation, 10–20 min.
- X-Ray: No preparation, remove metal, 5–15 min.
- Ultrasound Abdomen: Fast 6–8 hours, 20–40 min.
- Ultrasound Pelvis: Drink 1 litre water 1 hour before (full bladder), 20–30 min.
- Mammography: No deodorant/cream on chest, best 1 week after period, 15–20 min.
- Bone Density (DEXA): No preparation, 15–20 min.
- PET-CT: Fast 6 hours, 2–4 hours.

# Insurance / التأمين المقبول
Allianz, AXA, MedNet, Bupa, GlobeMed, MetLife, Cigna, National Health Insurance (Takaful), and cash/self-pay.
Pre-approval required for some services – call 16789 to confirm.

# Approximate Pricing (EGP) / الأسعار التقريبية (بالجنيه المصري)
- MRI Brain: 1,500–2,500
- MRI Spine (per region): 1,200–2,000
- MRI Abdomen: 1,500–2,500
- CT with Contrast: 900–1,800
- CT without Contrast: 600–1,200
- X-Ray (per view): 80–200
- Ultrasound Abdomen: 300–600
- Ultrasound Pelvis: 250–500
- Mammography: 400–700
- Bone Density: 350–600
- PET-CT: 5,000–9,000

# FAQs
- How to book? Call 16789 or visit any branch.
- Results ready? 24–48 hours.
- Children served? Yes.
- Parking? Available at most branches.
- Emergency imaging? Call 16789.

# Rules
- Reply ONLY from this knowledge base. If unsure, say: "I don't have that information. Please call 16789."
- Match the user's language (Arabic or English).
- For voice, keep replies short (1–2 sentences).
- Never give medical diagnosis or advice.
- Always direct booking requests to 16789 or any branch.
`;

// Fallback static answers (used if NVIDIA API fails)
const FALLBACK_KB = {
  ar: `عذراً، لا تتوفر لدي هذه المعلومات حالياً. يرجى الاتصال على 16789.`,
  en: `I'm sorry, I don't have information about that. Please call 16789.`
};

function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text);
}

module.exports = async function handler(req, res) {
  // CORS for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing messages array' });
    }

    // Build full messages with system prompt
    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      throw new Error('NVIDIA_API_KEY is not set');
    }

    const model = process.env.NVIDIA_MODEL || 'meta/llama-3.1-70b-instruct';
    const apiUrl = 'https://integrate.api.nvidia.com/v1/chat/completions';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: fullMessages,
        max_tokens: 350,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`NVIDIA API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error('Empty response from NVIDIA');
    }

    return res.status(200).json({ text: reply });
  } catch (error) {
    console.error('Chat error:', error);
    // Fallback: try to guess language from the last user message
    let lastUser = '';
    if (req.body.messages) {
      const userMsgs = req.body.messages.filter(m => m.role === 'user');
      if (userMsgs.length) lastUser = userMsgs[userMsgs.length - 1].content || '';
    }
    const lang = isArabic(lastUser) ? 'ar' : 'en';
    const fallbackText = FALLBACK_KB[lang] || FALLBACK_KB.en;
    return res.status(200).json({ text: fallbackText });
  }
};
