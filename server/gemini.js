import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkUrgentRisk } from "./safety.js";

const SYSTEM_INSTRUCTION = `
You are "Saathi" (साथी) - a warm, compassionate, and knowledgeable elder sister ("दीदी") and private health companion for teenage girls in India (ages 12-19).
You answer sensitive, personal questions about puberty, periods, menstrual hygiene, bodily changes, nutrition (e.g. iron deficiency, healthy foods), and emotional mood swings.

CORE PRINCIPLES & BOUNDARIES:
1. Warm, Reassuring Sisterly Tone: Speak with gentle warmth, validation, and clarity. Demystify fears without being clinical or preachy.
2. ABSOLUTE MEDICAL SAFETY:
   - NEVER diagnose any condition (do not say "You have PCOS" or "You have endometriosis"). Say things like "sometimes irregular periods happen because our hormones are still balancing out, but checking with a doctor can give you clarity."
   - NEVER recommend prescription medicines, pharmaceuticals, or dosages (e.g., NEVER say "take 500mg paracetamol" or "take mefenamic acid"). Recommend natural comfort care (warm water bottle, rest, hydration, soothing herbal sips like ginger or ajwain water) and advise asking a parent or doctor if medication is needed.
3. VAGUE QUESTION HANDLING:
   - If the user's question is vague or lacks detail (e.g., "my tummy hurts", "I feel weird", "is this normal?"), provide a brief comforting note and ask 1 to 2 gentle follow-up questions to understand better in the "followUpQuestions" array.
   - If the question is specific enough to answer directly, keep "followUpQuestions" as an empty array [].
4. CRISIS & URGENT SAFETY:
   - If there are red flags (soaking through a pad in an hour, fainting, extreme agonizing pain, thoughts of suicide/self-harm, sexual abuse or physical violence):
     Set "actionLevel" strictly to "Urgent help".
     Provide compassionate, urgent guidance to contact a trusted adult immediately or call Childline (1098) or Tele-MANAS (14416).
5. 4 ACTION LEVELS:
   Every response must choose exactly one of the 4 action levels:
   - "Self-care": Safe home remedies, rest, warm compress, balanced diet, hydration, gentle movement.
   - "Talk to a trusted adult": Discuss with mother, aunt, elder sister, teacher, or school nurse for support.
   - "See a doctor": Recommended when symptoms are persistent, unusual, or need a doctor's examination.
   - "Urgent help": For acute emergency signs, unbearable pain, severe bleeding, self-harm, or abuse.
6. CONVERSATION SCRIPTS:
   Always generate a 2-3 sentence natural script in "script" that the teen can use or copy to tell her mom, elder sister, or a doctor without feeling awkward.
7. CLINICAL SUMMARY:
   Provide a concise 1-2 sentence shareable summary in "summary" noting symptoms and timeline, ready for a doctor visit.
8. MYTH-BUSTER:
   If the teen mentions or asks about a common Indian cultural myth or restriction (e.g. cannot wash hair during periods, cannot touch pickles, must sit separately, cannot exercise, eating sour foods causes cramps), set "mythOrFact" with friendly, scientific debunking. Otherwise set "mythOrFact" to null.
9. LANGUAGE:
   The user may specify a preferred language ("English", "Hindi", "Punjabi", or "Hinglish").
   Reply entirely in the requested language (if Hinglish, use natural Hindi written in Roman script with English words, as commonly texted by Indian youth).

OUTPUT FORMAT:
You MUST respond with valid, strictly parseable JSON only. Do not include markdown code blocks, backticks, or preamble. The response must match this schema:
{
  "reply": "Warm and helpful response",
  "followUpQuestions": ["Question 1", "Question 2"],
  "actionLevel": "Self-care" | "Talk to a trusted adult" | "See a doctor" | "Urgent help",
  "actionExplanation": "Short 1-2 sentence explanation for why this action level is chosen",
  "script": "2-3 sentence script to tell mom or a doctor",
  "summary": "1-2 sentence symptom & timeline summary",
  "mythOrFact": {
    "isMyth": true,
    "topic": "Brief topic title",
    "fact": "Gentle, reassuring factual truth"
  } // or null
}
`;

function getOfflineFallbackResponse(message, language = "English", isUrgent = false) {
  const isHindi = language.toLowerCase().includes("hind");
  const isHinglish = language.toLowerCase().includes("hing");
  const isPunjabi = language.toLowerCase().includes("punj");

  if (isUrgent) {
    return {
      reply: isHindi
        ? "मेरी प्यारी बहन, कृपया घबराएं नहीं, लेकिन ये लक्षण दिखाते हैं कि आपको तुरंत मदद की ज़रूरत है। कृपया अपने माता-पिता या किसी बड़े को तुरंत बताएं या हेल्पलाइन 1098 या 14416 पर संपर्क करें।"
        : isHinglish
        ? "Sweet sister, please panic mat karo, but ye serious symptoms hain aur aapko abhi turant help ki zaroorat hai. Please apne parents ya kisi trusted adult ko abhi batao, ya emergency helpline 1098 / 14416 par call karo."
        : isPunjabi
        ? "ਪਿਆਰੀ ਭੈਣ, ਕਿਰਪਾ ਕਰਕੇ ਘਬਰਾਓ ਨਾ, ਪਰ ਇਹ ਲੱਛਣ ਦੱਸਦੇ ਹਨ ਕਿ ਤੁਹਾਨੂੰ ਤੁਰੰਤ ਮਦਦ ਦੀ ਲੋੜ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਮਾਤਾ-ਪਿਤਾ ਨੂੰ ਤੁਰੰਤ ਦੱਸੋ ਜਾਂ 1098 / 14416 'ਤੇ ਸੰਪਰਕ ਕਰੋ।"
        : "Sweet friend, please take a deep breath. What you are describing needs immediate attention from a doctor or a trusted adult. Please let a parent or guardian know right away, or call the free helplines Childline (1098) or Tele-MANAS (14416).",
      followUpQuestions: [],
      actionLevel: "Urgent help",
      actionExplanation: "Severe pain, very heavy bleeding, fainting, or distress requires immediate evaluation by a healthcare professional or trusted adult.",
      script: isHindi
        ? "मम्मी, मुझे बहुत ज़्यादा दर्द और परेशानी हो रही है। कृपया मुझे अभी डॉक्टर के पास ले चलिए।"
        : isHinglish
        ? "Mummy, mujhe bohot zyada pain aur weakness ho rahi hai. Please mujhe abhi doctor ke paas le chalo."
        : "Mom, I am experiencing very intense pain and heavy bleeding, and I really need to see a doctor right now.",
      summary: "Severe acute symptoms reported requiring immediate medical evaluation.",
      mythOrFact: null
    };
  }

  // Check if message is vague
  const isVague = message.trim().length < 25 && !message.toLowerCase().includes("cramp");
  if (isVague) {
    return {
      reply: isHindi
        ? "नमस्ते मेरी प्यारी दोस्त! मैं आपकी पूरी बात समझना चाहती हूँ ताकि सही सलाह दे सकूँ।"
        : isHinglish
        ? "Hi sweet friend! Main aapki baat ache se samajhna chahti hoon taaki aapko best guidance de sakun."
        : isPunjabi
        ? "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਪਿਆਰੀ ਦੋਸਤ! ਮੈਂ ਤੁਹਾਡੀ ਗੱਲ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸਮਝਣਾ ਚਾਹੁੰਦੀ ਹਾਂ ਤਾਂ ਜੋ ਸਹੀ ਸਲਾਹ ਦੇ ਸਕਾਂ।"
        : "Hi sweet friend! I am right here with you. To give you the most caring and helpful advice, could you tell me just a little more?",
      followUpQuestions: [
        isHindi ? "यह दर्द या परेशानी कब से शुरू हुई?" : "When did this feeling or symptom first start?",
        isHindi ? "क्या यह आपके पीरियड्स के आसपास हो रहा है?" : "Is it happening near your period days, or throughout the month?"
      ],
      actionLevel: "Self-care",
      actionExplanation: "Sharing a few more details will help us decide the best gentle steps for you.",
      script: "Mom, I'm feeling a bit uncomfortable in my tummy today and wanted to rest with a warm bottle.",
      summary: "Preliminary inquiry regarding general bodily discomfort.",
      mythOrFact: null
    };
  }

  // Default caring fallback
  return {
    reply: isHindi
      ? "यह पूछने के लिए बहुत धन्यवाद! पीरियड्स के दौरान हल्का दर्द और ऐंठन होना बहुत सामान्य है। गर्म पानी की बोतल से पेट की सिकाई करें और गुनगुना पानी पिएं। आपको बहुत राहत मिलेगी।"
      : isHinglish
      ? "Thank you for sharing this! Periods ke dauran thoda cramp hona bohot normal hai. Aap lower belly par warm heating pad rakh sakti hain aur warm ginger paani sip kar sakti hain."
      : isPunjabi
      ? "ਇਹ ਪੁੱਛਣ ਲਈ ਧੰਨਵਾਦ! ਮਾਹਵਾਰੀ ਦੌਰਾਨ ਹਲਕਾ ਦਰਦ ਹੋਣਾ ਬਹੁਤ ਆਮ ਹੈ। ਗਰਮ ਪਾਣੀ ਦੀ ਬੋਤਲ ਨਾਲ ਸੇਕ ਕਰੋ ਅਤੇ ਆਰਾਮ ਕਰੋ।"
      : "Thank you for asking! What you are describing is very common as your body goes through natural hormonal changes. For gentle relief right now, try placing a warm water bottle or heating pad on your lower tummy, sip warm water, and rest in a comfortable curled position.",
    followUpQuestions: [],
    actionLevel: "Self-care",
    actionExplanation: "Mild cramps and regular cycle changes respond well to rest, warmth, and hydration.",
    script: "Mom, I'm having some cramps today with my period. Could you help me with a warm water bottle?",
    summary: "Reports mild lower abdominal menstrual cramping on day 1-2.",
    mythOrFact: {
      isMyth: true,
      topic: "Resting during periods",
      fact: "Gentle walking or stretching is completely safe and can actually help release natural endorphins to reduce cramps!"
    }
  };
}

export async function generateChatResponse({ message, history = [], language = "English" }) {
  const isUrgent = checkUrgentRisk(message);
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  // If no API key configured, return high-quality contextual fallback
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("[Saathi Backend] GEMINI_API_KEY not set in .env. Using fallback response mode.");
    return getOfflineFallbackResponse(message, language, isUrgent);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const userPrompt = `
Selected Language: ${language}
Teen's Message: "${message}"

${isUrgent ? "CRITICAL ALERT: The user's query contains words indicating acute distress, severe bleeding, fainting, self-harm, or abuse. You MUST prioritize urgent safety and set actionLevel to 'Urgent help'." : ""}

Previous context (if any):
${history.slice(-4).map(h => `${h.sender === "user" ? "Teen" : "Saathi"}: ${h.text}`).join("\n")}

Respond strictly in JSON format matching the schema.
`;

    const result = await model.generateContent(userPrompt);
    const text = result.response.text();
    
    // Parse JSON
    let parsed;
    try {
      // Remove any potential surrounding backticks if present
      const cleanJson = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
      parsed = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error("[Saathi Backend] Failed to parse Gemini response as JSON:", text, parseErr);
      return getOfflineFallbackResponse(message, language, isUrgent);
    }

    // Safety override: if heuristic triggered urgent risk, ensure actionLevel is Urgent help
    if (isUrgent) {
      parsed.actionLevel = "Urgent help";
    }

    return parsed;
  } catch (apiErr) {
    console.error("[Saathi Backend] Gemini API error:", apiErr.message);
    // Fallback gracefully so app NEVER crashes or gives a blank screen
    return getOfflineFallbackResponse(message, language, isUrgent);
  }
}
