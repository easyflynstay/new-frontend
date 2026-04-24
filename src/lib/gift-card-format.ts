/**
 * Physical-style gift card: mask all but last 4, grouped as XXXX  XXXX  XXXX  AB12
 */
export function formatPhysicalCardNumberDisplay(code: string): string {
  const alnum = code.replace(/[^a-zA-Z0-9]/g, "");
  if (alnum.length < 4) {
    return "XXXX  XXXX  XXXX  " + (code || "????").toString().toUpperCase().slice(-4);
  }
  const last4 = alnum.slice(-4).toUpperCase();
  return `XXXX  XXXX  XXXX  ${last4}`;
}

export function dateIsoToMmYy(iso: string | undefined | null): string {
  if (!iso) return "—/—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—/—";
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${yy}`;
}
