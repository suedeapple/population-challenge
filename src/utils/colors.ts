// Fixed color for each country — edit the hex value to change a country's color.
// In a real-world app this mapping would live in population-data.json as a "color"
// field on each entry, so adding a new country only requires one edit in one place.
const COLORS: Record<string, string> = {
  Bangladesh:      '#e63946',
  Brazil:          '#3ddc97',
  China:           '#f72585',
  Egypt:           '#ff9800',
  Ethiopia:        '#ffd166',
  India:           '#ff5722',
  Indonesia:       '#4caf50',
  Japan:           '#00bcd4',
  Mexico:          '#ffc107',
  Nigeria:         '#3f51b5',
  Pakistan:        '#8bc34a',
  Philippines:     '#673ab7',
  Russia:          '#03a9f4',
  'United States': '#009688',
  Vietnam:         '#ff7043',
}

// Returns the color for a given country name, or grey if it isn't in the list
export function countryColor(name: string): string {
  return COLORS[name] ?? '#999999'
}
