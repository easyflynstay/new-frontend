const STT_URL = "/api/speech/transcribe";

export async function transcribeAudio(
  blob: Blob,
  languageCode: string
): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", blob, "recording.webm");
  formData.append("language_code", languageCode);

  const res = await fetch(STT_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Speech-to-text failed (${res.status})`);
  }

  const data = (await res.json()) as { transcript?: string };
  return data.transcript ?? null;
}

