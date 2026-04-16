/**
 * Indian airport IATA codes — keep in sync with backend/constants/indian_airports.py
 * for domestic vs international behaviour (booking UI uses this; search pricing uses backend).
 */
export const INDIAN_AIRPORTS = new Set([
  "DEL", "BOM", "BLR", "MAA", "CCU", "HYD", "COK", "GOI", "AMD", "TRV", "IXC",
  "LKO", "PNQ", "ATQ", "BBI", "GAU", "SXR", "JAI", "VNS", "IXB", "BHO", "IDR",
  "PAT", "IXR", "RPR", "NAG", "STV", "UDR", "DIB", "IXJ", "IXU", "DED", "IXA",
  "IXS", "IXZ", "IXE", "IXL", "GOP", "VTZ", "IXD", "DMU", "IXG", "CNN", "CJB",
  "TIR", "IXV", "IXY", "JLR", "GWL", "AGR", "KNU", "IXW", "RJA", "TCR",
]);

export function isDomesticIndiaRoute(from: string, to: string): boolean {
  return INDIAN_AIRPORTS.has((from || "").toUpperCase()) && INDIAN_AIRPORTS.has((to || "").toUpperCase());
}
