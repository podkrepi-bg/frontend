import { DefaultRawDatum } from '@nivo/pie'

export type TeamPieData = DefaultRawDatum & { label?: string }

export const teamPieData: TeamPieData[] = [
  { id: 'back-end', value: 19.8 },
  { id: 'frontend', value: 12.1 },
  { id: 'full-stack', value: 11.1 },
  { id: 'dev-ops', value: 10.6 },
  { id: 'qa', value: 8.3 },
  { id: 'ngo', value: 5.0 },
  { id: 'design', value: 4.7 },
  { id: 'law', value: 2.2 },
  { id: 'management', value: 12.0 },
  { id: 'accounting', value: 2.2 },
  { id: 'marketing', value: 9.8 },
  { id: 'others', value: 2.2 },
]
