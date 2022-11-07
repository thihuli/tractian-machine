interface Metrics {
  lastUptimeAt: Date
  totalCollectsUptime: number
  totalUptime: number
}

interface Specifications {
  maxTemp: number,
  rpm?: number | undefined,
  power?: number | undefined
}

export interface Assets {
  camponyId: number
  healthscore: number
  id: number
  image: string
  metrics: Metrics
  model: string
  name: string
  sensors: Array<[string]>
  specifications: Specifications
  status: string
  unit: number
}