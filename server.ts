import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely and lazily
let aiInstance: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (aiInstance) return aiInstance;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("Warning: GEMINI_API_KEY is not defined. Using offline backup horoscope generator.");
    return null;
  }
  aiInstance = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
  return aiInstance;
}

// Circuit breaker state for rate-limiting (429 Quota Exceeded)
let isQuotaExceededFlag = false;
let quotaResetTime = 0;

function checkQuotaStatus(): boolean {
  if (isQuotaExceededFlag) {
    if (Date.now() < quotaResetTime) {
      return false; // currently blocked
    }
    // Time expired, reset the breaker to try again
    isQuotaExceededFlag = false;
  }
  return true; // OK to call
}

function activateQuotaBreaker() {
  isQuotaExceededFlag = true;
  quotaResetTime = Date.now() + 5 * 60 * 1000; // block API for 5 minutes
}

// Backup custom readings in case the API key is missing or rate limited
const BACKUP_HOROSCOPES: Record<string, { reading: string; mantra: string; advice: string }> = {
  celestial: {
    reading: "आज ब्रह्मांड आपके पक्ष में संरेखित है। कर्क राशि (Karka Rashi) और पुष्य नक्षत्र के प्रभाव से आपके मन में असीम शांति और सकारात्मक ऊर्जा का संचार होगा। चंद्र देव की कृपा आप पर बनी हुई है, जिससे आपके आध्यात्मिक और मानसिक बल में अभूतपूर्व वृद्धि होगी।",
    mantra: "ॐ सोम सोमाय नमः",
    advice: "चंद्र देव को अर्घ्य दें और अपने संकल्पों पर अडिग रहें। आज आपके 30वें वर्ष की इस नई यात्रा की शुरुआत अद्भुत होगी।"
  },
  love: {
    reading: "प्रेम और संबंधों के क्षेत्र में आज एक नई गहराई देखने को मिलेगी। पुष्य नक्षत्र की पोषण करने वाली ऊर्जा आपके संबंधों को और अधिक सुदृढ़ और स्नेहमयी बनाएगी। मित्रों और परिजनों का भरपूर सहयोग मिलेगा और वे आपके जन्मदिन के उत्सव को यादगार बना देंगे।",
    mantra: "ॐ क्लीं कृष्णाय नमः",
    advice: "उन लोगों के प्रति आभार व्यक्त करें जो चुपचाप आपकी परवाह करते हैं। आज का दिन उनके प्रति प्रेम जताने का है।"
  },
  career: {
    reading: "करियर और जीवन के उद्देश्यों में सफलता के प्रबल योग हैं। पुष्य नक्षत्र को सभी कार्यों में सर्वोत्तम माना जाता है। आज के दिन लिया गया कोई नया संकल्प या विचार आपके भविष्य को एक गौरवशाली दिशा प्रदान कर सकता है।",
    mantra: "ॐ शनैश्चराय नमः",
    advice: "अपने विचारों को डायरी में लिखें। जन्म नक्षत्र पुष्य आज आपकी संगठनात्मक और नेतृत्व क्षमताओं को जागृत कर रहा है।"
  },
  growth: {
    reading: "30वें वर्ष में प्रवेश करते हुए, यह आत्म-साक्षात्कार और असीम व्यक्तिगत विकास का समय है। आपकी भावुकता अब आपकी सबसे बड़ी शक्ति (Intuition) बनकर उभरेगी। अपनी आंतरिक आवाज को सुनें, वह आपको जीवन के सर्वश्रेष्ठ मार्ग पर ले जाएगी।",
    mantra: "ॐ विद्या प्रदाने नमः",
    advice: "ध्यान और स्वाध्याय (self-study) के लिए थोड़ा समय निकालें। नया साल आपके लिए ज्ञान और परिपक्वता का वरदान लाया है।"
  },
  health: {
    reading: "स्वास्थ्य के दृष्टिकोण से आज का दिन अनुकूल है। चंद्र की ठंडी और सौम्य किरणें आपके स्वास्थ्य और मानसिक शांति को बनाए रखेंगी। मन शांत होने से शरीर भी ऊर्जावान और फुर्तीला महसूस करेगा।",
    mantra: "ॐ धन्वन्तरये नमः",
    advice: "आज संतुलित आहार लें, पर्याप्त जल पीएं और प्रकृति के करीब समय बिताएं। रात्रि में चंद्रमा को देखना कल्याणकारी होगा।"
  }
};

const BACKUP_QUOTES = [
  "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nअपने 30वें वर्ष में कर्म की नई ऊंचाइयों को छुएं, अंकित सिंह!",
  "चन्द्रमा मनसो जातः।\nमन के स्वामी चंद्र और नक्षत्र पुष्य के छत्रछाया में पलने वाले अंकित, आपकी हर मनोकामना पूर्ण हो।",
  "पुष्य नक्षत्रस्य शुभाशीर्वादः सदा भवेत्।\nकल्याणमयी पुष्य की किरणें आपके जीवन को सुख, समृद्धि और संतोष से आलोकित करें।",
  "ब्रह्मांड की सब सुखद ऊर्जाएं आपके इस विशेष दिन को असाधारण बना दें। जन्मदिन की अनंत शुभकामनाएं, अंकित भाई!",
  "सफलता का सफर सितारों से होकर गुजरता है, और आपके सितारे आज बहुत बुलंद हैं। हैप्पी बर्थडे!"
];

// Endpoint: Astrological traits and Panchang details
app.get("/api/panchang-details", (req, res) => {
  res.json({
    name: "Ankit Singh",
    dob: "1996-05-23",
    age: 30,
    rashi: "कर्क (Cancer)",
    nakshatra: "पुष्य (Pushya) - The Monarch of Stars",
    tithi: "षष्ठी / सप्तमी (Shukla Paksha)",
    yoga: "हर्षण (Harshana - Giver of Joy)",
    karan: "तैतिल (Taitila) & गर (Gara)",
    rashiLord: "चंद्र (Moon - Chandra Dev)",
    element: "जल (Water)",
    luckyColor: "मोती जैसा सफेद, चांदी (Pearl White, Silver, Cream)",
    luckyNumber: "2 और 7",
    mantra: "ॐ चन्द्राय नमः | ॐ पुष्याय नमः",
    traits: [
      {
        title: "गहन अंतर्ज्ञान (Deep Intuition)",
        desc: "अंकित के पास एक प्राकृतिक अंतर्ज्ञान (Intuition) है। वह बिना कहे लोगों की भावनाओं को समझ सकते हैं।"
      },
      {
        title: "अटूट निष्ठा (Resolute Loyalty)",
        desc: "कर्क राशि के जातक अपने प्रियजनों के प्रति अत्यंत वफादार और सुरक्षात्मक होते हैं। वे अपने मित्रों के लिए ढाल बन खड़े होते हैं।"
      },
      {
        title: "पोषणकर्ता स्वभाव (Nurturer Mindset)",
        desc: "पुष्य नक्षत्र के प्रभाव से वे स्वभाव से दयालु, सहयोगी और दूसरों की परवाह करने वाले होते हैं। उनके साथ रहकर लोग सुरक्षित महसूस करते हैं।"
      },
      {
        title: "रचनात्मक और कल्पनाशील (Creative Muse)",
        desc: "चंद्र प्रभुत्व के कारण उनका मन कलात्मक, कल्पनाशील और नई योजनाओं से समृद्ध रहता है।"
      },
      {
        title: "शांत पर दृढ़ निश्चयी (Calm but Resolute)",
        desc: "बाहर से शांत और सौम्य दिखने वाले अंकित भीतर से अत्यंत दृढ़ और अपने लक्ष्यों के प्रति गंभीर हैं।"
      }
    ]
  });
});

// Endpoint: Generate dynamic daily horoscope with Gemini API
app.post("/api/gemini/horoscope", async (req, res) => {
  const { focus } = req.body;
  const currentFocus = focus || "celestial";
  const ai = getGemini();

  if (!ai || !checkQuotaStatus()) {
    // Return gracefully from backup if offline / no API key or rate-limited
    const data = BACKUP_HOROSCOPES[currentFocus] || BACKUP_HOROSCOPES.celestial;
    return res.json({
      reading: data.reading,
      mantra: data.mantra,
      advice: data.advice,
      isLive: false,
      error: "Gemini under rate limit or quota exceeded. Showing premium offline celestial sync."
    });
  }

  try {
    const prompt = `Write a deeply personalized, beautiful, and authentic Hindu astrologer horoscope and blessing in Hindi (with 1-2 Sanskrit terms) for a person named "Ankit Singh" born on 23 May 1996 (whose Sun/Moon are in Taurus/Cancer, Nakshatra is Pushya, Rashi is Karka, age 30).
Focus on this area of life: "${currentFocus}".
Format the response as a JSON object with three fields:
1. "reading": a beautifully drafted astrological paragraph in rich Hindi focusing on ${currentFocus} and the stars alignment. Mention his Name 'अंकित सिंह' and cosmic alignments.
2. "mantra": a suitable short Vedic mantra/shloka for him to chant today (in Sanskrit/Hindi).
3. "advice": a short practical/celestial advice for his birthday celebration and this phase of life.

Make sure the tone is warm, auspicious, slightly mystical, and inspiring. Keep it completely in Devnagari Hindi for the text fields. Ensure your response is strictly in JSON format. Avoid wrap identifiers other than valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({
      reading: parsedData.reading || BACKUP_HOROSCOPES[currentFocus].reading,
      mantra: parsedData.mantra || BACKUP_HOROSCOPES[currentFocus].mantra,
      advice: parsedData.advice || BACKUP_HOROSCOPES[currentFocus].advice,
      isLive: true
    });
  } catch (error: any) {
    const errorStr = String(error?.message || error);
    if (errorStr.includes("429") || errorStr.includes("QUOTA") || errorStr.includes("RESOURCE_EXHAUSTED") || errorStr.includes("quota")) {
      activateQuotaBreaker();
      console.warn("⚠️ [Gemini API] Quota or Rate Limit reached (429/Resource Exhausted). Activating circuit breaker - falling back to offline mode for 5 mins.");
    } else {
      console.error("Gemini API horoscope error:", error);
    }
    // Fallback to offline values
    const data = BACKUP_HOROSCOPES[currentFocus] || BACKUP_HOROSCOPES.celestial;
    res.json({
      reading: data.reading,
      mantra: data.mantra,
      advice: data.advice,
      isLive: false,
      error: "Error processing live horoscope. Showing offline celestial sync."
    });
  }
});

// Endpoint: Generate specialized custom Hindi quotes using Gemini API
app.post("/api/gemini/quote", async (req, res) => {
  const { style } = req.body;
  const currentStyle = style || "spiritual";
  const ai = getGemini();

  if (!ai || !checkQuotaStatus()) {
    const randomIndex = Math.floor(Math.random() * BACKUP_QUOTES.length);
    return res.json({
      quote: BACKUP_QUOTES[randomIndex],
      isLive: false,
      error: "Gemini under rate limit or quota exceeded. Showing offline backup."
    });
  }

  try {
    const prompt = `Generate a beautiful, original birthday wish, motivational quote, or custom shloka in Hindi style for "Ankit Singh" who is celebrating his milestone 30th birthday (born 23 May 1996, Cancer Rashi, Pushya Nakshatra).
Style requested: "${currentStyle}".
Make it sound premium, literary, and heartfelt. It can be 2 to 4 poetic lines. Mention his name "अंकित सिंह" or "अंकित". Keep it extremely inspiring and visual, mentioning stars, moon (चंद्र), or destiny.
Respond with a simple JSON object containing:
{
  "quote": "The compiled hindi quote/wish"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({
      quote: parsedData.quote || BACKUP_QUOTES[0],
      isLive: true
    });
  } catch (error: any) {
    const errorStr = String(error?.message || error);
    if (errorStr.includes("429") || errorStr.includes("QUOTA") || errorStr.includes("RESOURCE_EXHAUSTED") || errorStr.includes("quota")) {
      activateQuotaBreaker();
      console.warn("⚠️ [Gemini API] Quota or Rate Limit reached (429/Resource Exhausted). Activating circuit breaker - falling back to offline mode for 5 mins.");
    } else {
      console.error("Gemini API quote error:", error);
    }
    const randomIndex = Math.floor(Math.random() * BACKUP_QUOTES.length);
    res.json({
      quote: BACKUP_QUOTES[randomIndex],
      isLive: false
    });
  }
});

// Start dev server middleware or serve production static assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
