// Knowledge base (identical to your frontend KB)
const KB = [
  { keys: ['ساعات','ساعه','مواعيد','وقت','يفتح','يقفل','hours','open','close','working','schedule','timing'],
    ar: `فروع CellTek مفتوحة السبت حتى الخميس:\n• مدينة نصر: ٨ ص – ١٠ م\n• المعادي: ٨ ص – ٩ م\n• مصر الجديدة: ٨ ص – ١٠ م\n• السادس من أكتوبر: ٩ ص – ٩ م\n• القاهرة الجديدة: ٨ ص – ١٠ م\nجميع الفروع مغلقة يوم الجمعة.\nفي رمضان: ٩ ص – ٦ م (أكتوبر والمعادي حتى ٥ م).`,
    en: `CellTek branches are open Saturday to Thursday:\n• Nasr City: 8AM–10PM\n• Maadi: 8AM–9PM\n• Heliopolis: 8AM–10PM\n• 6th October: 9AM–9PM\n• New Cairo: 8AM–10PM\nAll branches are closed on Friday.\nRamadan hours: 9AM–6PM (Maadi & October until 5PM).` },
  { keys: ['فرع','فروع','عنوان','مكان','اين','أين','branch','location','address','where','nasr','maadi','heliopolis','october','cairo'],
    ar: `فروع CellTek:\n• مدينة نصر: ٩٠ شارع عباس العقاد\n• المعادي: ١٥ طريق ٩\n• مصر الجديدة: ٣٢ شارع مرغني\n• السادس من أكتوبر: سنترال مول\n• القاهرة الجديدة: شارع التسعين، التجمع الأول\n📞 الخط الموحد: 16789`,
    en: `CellTek branches:\n• Nasr City: 90 Abbas El-Akkad St\n• Maadi: 15 Road 9\n• Heliopolis: 32 Merghany St\n• 6th October: Central Mall\n• New Cairo: 90th Street, 1st Settlement\n📞 Hotline: 16789` },
  { keys: ['رقم','تليفون','هاتف','اتصل','حجز','موعد','phone','number','call','book','appointment','contact','16789'],
    ar: `يمكنك الحجز أو الاستفسار عبر:\n📞 الخط الموحد: 16789\nمتاح السبت حتى الخميس من ٨ ص إلى ٨ م.\nيمكنك أيضاً زيارة أي فرع مباشرةً.`,
    en: `To book or inquire:\n📞 Unified hotline: 16789\nAvailable Saturday–Thursday, 8AM–8PM.\nYou can also walk in to any branch.` },
  { keys: ['mri','رنين','رنين مغناطيسي','ريزونانس','استعد','تحضير mri','prepare mri'],
    ar: `التحضير لفحص الرنين المغناطيسي:\n🧲 رنين المخ/العمود الفقري: لا يلزم صيام. ارتدِ ملابس فضفاضة وأزل جميع المعادن (مجوهرات، ساعات). المدة: ٣٠–٦٠ دقيقة.\n🧲 رنين البطن: صيام ٤–٦ ساعات. المدة: ٤٥–٧٥ دقيقة.\nأبلغ الطاقم إذا كان لديك غرسات معدنية أو ناظم قلب.`,
    en: `MRI preparation:\n🧲 Brain/Spine MRI: No fasting required. Wear loose clothing, remove all metal (jewelry, watches). Duration: 30–60 min.\n🧲 Abdominal MRI: Fast 4–6 hours before. Duration: 45–75 min.\nAlways inform staff of any metal implants or pacemaker.` },
  { keys: ['ct','سكان','مقطعية','computed','tomography','اشعة مقطعية'],
    ar: `التحضير للأشعة المقطعية:\n💉 بالتباين: صيام ٤ ساعات، أحضر تحليل وظائف الكلى (كرياتينين)، أبلغ الطاقم عن حساسية لليود. المدة: ١٥–٣٠ دقيقة.\n✅ بدون تباين: لا يلزم تحضير. المدة: ١٠–٢٠ دقيقة.`,
    en: `CT scan preparation:\n💉 With contrast: Fast 4 hours, bring creatinine test, inform staff of iodine allergy. Duration: 15–30 min.\n✅ Without contrast: No preparation needed. Duration: 10–20 min.` },
  { keys: ['xray','x-ray','اشعة','أشعة سينية','سينية','سنة'],
    ar: `الأشعة السينية لا تحتاج تحضيراً خاصاً.\nأزل الإكسسوارات المعدنية من منطقة الفحص. المدة: ٥–١٥ دقيقة.\n⚠️ أبلغ الطاقم إذا كنتِ حاملاً.`,
    en: `X-Ray requires no special preparation.\nRemove metal accessories from the area being scanned. Duration: 5–15 min.\n⚠️ Inform staff if you are pregnant.` },
  { keys: ['ultrasound','سونار','موجات','echography'],
    ar: `التحضير للسونار:\n🔵 سونار البطن: صيام ٦–٨ ساعات. المدة: ٢٠–٤٠ دقيقة.\n🔵 سونار الحوض: اشربي لتر ماء قبل ساعة ولا تذهبي للحمام (مثانة ممتلئة). المدة: ٢٠–٣٠ دقيقة.`,
    en: `Ultrasound preparation:\n🔵 Abdominal: Fast 6–8 hours. Duration: 20–40 min.\n🔵 Pelvic: Drink 1 litre of water 1 hour before and do not urinate (full bladder required). Duration: 20–30 min.` },
  { keys: ['mammography','ماموغرافي','ثدي','breast'],
    ar: `الماموغرافي لا يحتاج تحضيراً خاصاً.\nلا تضعي مزيل عرق أو كريم على منطقة الصدر يوم الفحص.\nيُفضل إجراؤه بعد أسبوع من انتهاء الدورة الشهرية. المدة: ١٥–٢٠ دقيقة.`,
    en: `Mammography requires no special preparation.\nDo not apply deodorant, powder, or cream to the chest area on the day of the exam.\nBest performed 1 week after the end of your menstrual cycle. Duration: 15–20 min.` },
  { keys: ['تامين','تأمين','بوليصة','insurance','allianz','axa','mednet','bupa','cigna','metlife','globemed','takaful','تكافل','مقبول','يقبل'],
    ar: `شركات التأمين المقبولة في CellTek:\n✅ أليانز — تغطية كاملة وجزئية (موافقة مسبقة للرنين والمقطعية)\n✅ أكسا — تغطية كاملة وجزئية (موافقة مسبقة للرنين)\n✅ ميدنت — تغطية كاملة، لا تحتاج موافقة مسبقة للخدمات الأساسية\n✅ بيوبا — تغطية كاملة وجزئية\n✅ سيغنا — تغطية كاملة، ٠٪ مشاركة للشبكة الداخلية\n✅ ميتلايف، جلوب ميد، التأمين الصحي الشامل\nللتأكيد اتصل بـ 16789.`,
    en: `Insurance accepted at CellTek:\n✅ Allianz — Full & partial (pre-approval for MRI/CT)\n✅ AXA — Full & partial (pre-approval for MRI)\n✅ MedNet — Full, no pre-approval for basic services\n✅ Bupa — Full & partial\n✅ Cigna — Full, 0% co-pay in-network\n✅ MetLife, GlobeMed, National Health (Takaful)\nCall 16789 to confirm your coverage.` },
  { keys: ['سعر','اسعار','أسعار','تكلفة','كم','price','cost','how much','pricing','تمن','ثمن'],
    ar: `الأسعار التقريبية بالجنيه المصري:\n🧲 رنين المخ: ١٥٠٠–٢٥٠٠ جنيه\n🧲 رنين البطن: ١٥٠٠–٢٥٠٠ جنيه\n📡 مقطعية بتباين: ٩٠٠–١٨٠٠ جنيه\n📡 مقطعية بدون تباين: ٦٠٠–١٢٠٠ جنيه\n☢️ أشعة سينية: ٨٠–٢٠٠ جنيه\n🔵 سونار البطن: ٣٠٠–٦٠٠ جنيه\n🔵 سونار الحوض: ٢٥٠–٥٠٠ جنيه\n🩺 ماموغرافي: ٤٠٠–٧٠٠ جنيه\nللأسعار الدقيقة اتصل بـ 16789.`,
    en: `Approximate prices in EGP:\n🧲 MRI Brain: 1,500–2,500\n🧲 MRI Abdomen: 1,500–2,500\n📡 CT with Contrast: 900–1,800\n📡 CT without Contrast: 600–1,200\n☢️ X-Ray: 80–200\n🔵 Ultrasound Abdomen: 300–600\n🔵 Ultrasound Pelvis: 250–500\n🩺 Mammography: 400–700\nFor exact pricing call 16789.` },
  { keys: ['نتيجة','نتائج','result','results','report','تقرير','متى تجهز','when ready'],
    ar: `النتائج تكون جاهزة خلال ٢٤–٤٨ ساعة.\nيمكن استلامها شخصياً من الفرع، أو إرسالها عبر البريد الإلكتروني إذا طلبت ذلك عند الحجز.\nللحالات العاجلة، أبلغ الموظف عند الحجز.`,
    en: `Results are usually ready within 24–48 hours.\nYou can collect them in person at the branch, or have them sent by email if requested at booking.\nFor urgent cases, inform staff when booking.` },
  { keys: ['اطفال','أطفال','طفل','children','child','kids','baby'],
    ar: `نعم، نقدم خدمات الأشعة لجميع الفئات العمرية بما فيها الأطفال.\nيرجى إبلاغ الموظف عند الحجز لترتيب الاستقبال المناسب.`,
    en: `Yes, we provide radiology services for all age groups including children.\nPlease inform staff when booking so we can arrange appropriate care.` },
  { keys: ['حامل','حمل','pregnant','pregnancy'],
    ar: `الرنين المغناطيسي يُعتبر آمناً أثناء الحمل عموماً، خاصةً بعد الشهر الثالث.\nالأشعة السينية والمقطعية تستخدم جرعات منخفضة من الإشعاع — أبلغي الطاقم دائماً إذا كنتِ حاملاً.\nاستشيري طبيبك أولاً في جميع الحالات.`,
    en: `MRI is generally considered safe during pregnancy, especially after the first trimester.\nX-Ray and CT use low radiation — always inform staff if you are pregnant.\nAlways consult your doctor first.` },
  { keys: ['parking','موقف','سيارة','park'],
    ar: `يتوفر موقف سيارات في معظم الفروع.\nاتصل بـ 16789 أو تواصل مع الفرع المحدد للتأكيد.`,
    en: `Parking is available at most branches.\nCall 16789 or contact the specific branch to confirm.` },
  { keys: ['مرحبا','هلا','السلام','صباح','مساء','hello','hi','hey','good morning','good evening','greetings'],
    ar: `مرحباً! أنا المساعد الرقمي لـ CellTek 😊\nيمكنني مساعدتك في:\n• مواعيد وعناوين الفروع\n• التحضير للفحوصات (رنين، مقطعية، أشعة، سونار)\n• التأمين الطبي المقبول\n• الأسعار التقريبية\n• حجز المواعيد\nكيف أستطيع مساعدتك؟`,
    en: `Hello! I'm CellTek's digital assistant 😊\nI can help you with:\n• Branch hours and locations\n• Exam preparation (MRI, CT, X-Ray, Ultrasound)\n• Accepted insurance companies\n• Approximate pricing\n• Appointment booking\nHow can I help you?` }
];

const FALLBACK = {
  ar: `عذراً، لا تتوفر لدي هذه المعلومات حالياً.\nيرجى الاتصال بمركز الاتصال على 📞 16789\nمتاح السبت–الخميس من ٨ ص إلى ٨ م.`,
  en: `I'm sorry, I don't have information about that.\nPlease call our hotline: 📞 16789\nAvailable Saturday–Thursday, 8AM–8PM.`
};

function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text);
}

function getAnswer(text) {
  const t = text.toLowerCase().trim();
  for (const item of KB) {
    if (item.keys.some(k => t.includes(k.toLowerCase()))) {
      return isArabic(text) ? item.ar : item.en;
    }
  }
  return isArabic(text) ? FALLBACK.ar : FALLBACK.en;
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Get the last user message
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  if (!lastUserMessage) {
    return res.status(400).json({ error: 'No user message found' });
  }

  const userText = lastUserMessage.content;
  const reply = getAnswer(userText);

  return res.status(200).json({ text: reply });
};
