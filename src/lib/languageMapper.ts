/**
 * Sarvam AI Speech-to-Text language_code mapper (BCP-47).
 * Used for the language dropdown and when sending language_code to /api/speech/transcribe.
 */
export const SARVAM_LANGUAGE_LIST = [
  { code: "unknown", label: "Auto-detect" },
  { code: "hi-IN", label: "Hindi" },
  { code: "en-IN", label: "English" },
  { code: "kn-IN", label: "Kannada" },
  { code: "ml-IN", label: "Malayalam" },
  { code: "bn-IN", label: "Bengali" },
  { code: "mr-IN", label: "Marathi" },
  { code: "od-IN", label: "Odia" },
  { code: "pa-IN", label: "Punjabi" },
  { code: "ta-IN", label: "Tamil" },
  { code: "te-IN", label: "Telugu" },
  { code: "gu-IN", label: "Gujarati" },
];

export const SARVAM_LANGUAGE_DROPDOWN_OPTIONS = [
  { code: "hi-IN", label: "Hindi" },
  { code: "en-IN", label: "English" },
  { code: "kn-IN", label: "Kannada" },
  { code: "ml-IN", label: "Malayalam" },
  { code: "ta-IN", label: "Tamil" },
  { code: "te-IN", label: "Telugu" },
];

export function getLanguageCodeByLabel(label: string): string {
  const entry = SARVAM_LANGUAGE_LIST.find((e) => e.label === label);
  return entry ? entry.code : "unknown";
}

export function getLanguageLabelByCode(code: string): string {
  const entry = SARVAM_LANGUAGE_LIST.find((e) => e.code === code);
  return entry ? entry.label : "Auto-detect";
}
