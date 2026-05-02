// Maps country display names to ISO 3166-1 alpha-3 codes for the flag/label components.
// Ideally this mapping would live in population-data.json as an "iso3" field on each
// entry so adding a new country only requires one edit in one place.
const ISO3: Record<string, string> = {
  Bangladesh:     'BGD',
  Brazil:         'BRA',
  China:          'CHN',
  Egypt:          'EGY',
  Ethiopia:       'ETH',
  India:          'IND',
  Indonesia:      'IDN',
  Japan:          'JPN',
  Mexico:         'MEX',
  Nigeria:        'NGA',
  Pakistan:       'PAK',
  Philippines:    'PHL',
  Russia:         'RUS',
  'United States':'USA',
  Vietnam:        'VNM',
}

export function iso3(name: string): string {
  // Fallback truncates the name — good enough for unlisted countries but not reliable
  return ISO3[name] ?? name.slice(0, 3).toUpperCase()
}
