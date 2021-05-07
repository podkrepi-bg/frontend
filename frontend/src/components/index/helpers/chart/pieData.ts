import { Options } from 'highcharts'

export type TeamPieItem = {
  id: string
  y: number
  color: string
  name?: string
}

export const teamPieData: Array<TeamPieItem> = [
  { id: 'others', y: 2.2, color: '#F94144' },
  { id: 'law', y: 2.2, color: '#F3722C' },
  { id: 'accounting', y: 2.2, color: '#F8961E' },
  { id: 'design', y: 4.7, color: '#F9844A' },
  { id: 'ngo', y: 5.0, color: '#F9C74F' },
  { id: 'qa', y: 8.3, color: '#90BE6D' },
  { id: 'marketing', y: 9.8, color: '#43AA8B' },
  { id: 'dev-ops', y: 10.6, color: '#4D908E' },
  { id: 'full-stack', y: 11.1, color: '#577590' },
  { id: 'management', y: 12.0, color: '#277DA1' },
  { id: 'frontend', y: 12.1, color: '#219EBC' },
  { id: 'back-end', y: 19.8, color: '#023047' },
]

export const teamPieOptions: Options = {
  chart: {
    type: 'pie',
    backgroundColor: '',
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
      innerSize: '35%',
    },
  },
  series: [
    {
      type: 'pie',
      name: '',
      data: teamPieData,
      animation: {
        duration: 2000,
      },
    },
  ],
}
