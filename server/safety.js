// IMPORTANT: Please verify these official national helpline numbers before the demo.
// Childline: 1098 (Toll-free 24/7 national helpline for children and teens in India)
// Tele-MANAS: 14416 (Toll-free 24/7 mental health and crisis helpline by Govt of India)

export const HELPLINES = [
  {
    id: "childline",
    name: "Childline India",
    number: "1098",
    description: "24/7 free emergency phone service for children and teens needing care and protection.",
    type: "Emergency & Child Protection",
    badge: "Free 24/7"
  },
  {
    id: "tele-manas",
    name: "Tele-MANAS",
    number: "14416",
    description: "24/7 toll-free psychological support and mental health crisis guidance across India.",
    type: "Mental Health & Emotional Distress",
    badge: "Govt of India"
  }
];

export const URGENT_TRIGGERS = [
  /soak(?:ing)?\s+(?:a\s+)?pad\s+in\s+(?:an?\s+)?hour/i,
  /bleeding\s+(?:through|heavily|nonstop|too\s+much)/i,
  /faint(?:ed|ing)?|black(?:ed)?\s+out|lost\s+consciousness/i,
  /unbearable\s+pain|excruciating|can'?t\s+stand\s+the\s+pain|screaming\s+in\s+pain/i,
  /suicid(?:e|al)|kill\s+myself|end\s+my\s+life|self[- ]harm|cut\s+myself/i,
  /abus(?:e|ed|ing)|touch(?:ed)?\s+me|forced\s+me|rape|assault|violence\s+at\s+home/i
];

export function checkUrgentRisk(text) {
  if (!text || typeof text !== "string") return false;
  return URGENT_TRIGGERS.some(trigger => trigger.test(text));
}
