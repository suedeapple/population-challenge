export type CountryData = {
  Country: string
  Population: number
}

export type CountryEntry = {
  _id: string
  Country: string
  Population: number
}

export type YearData = {
  Year: number
  Countries: CountryEntry[]
}

export type Tooltip = {
  x: number
  y: number
  text: string
}
