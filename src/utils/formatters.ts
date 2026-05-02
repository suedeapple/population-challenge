// Shortens large population numbers for axis labels — e.g. 1400000000 → "1.40B", 500000000 → "500M"
export function formatPopulation(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`
  return n.toLocaleString('en-GB')
}
