import { Options } from 'highcharts'

export type TeamPieItem = {
  id: string
  y: number
  color: string
  name?: string
}

export const teamPieData: Array<TeamPieItem> = [
  { id: 'others', y: 2.2, color: '#bb8bbc' },
  { id: 'law', y: 2.2, color: '#3acbb0' },
  { id: 'accounting', y: 2.2, color: '#b9c6cc' },
  { id: 'design', y: 4.7, color: '#ffe149' },
  { id: 'ngo', y: 5.0, color: '#58c7ff' },
  { id: 'qa', y: 8.3, color: '#fe97dc' },
  { id: 'marketing', y: 9.8, color: '#fdc781' },
  { id: 'dev-ops', y: 10.6, color: '#9897ff' },
  { id: 'full-stack', y: 11.1, color: '#7fffc0' },
  { id: 'management', y: 12.0, color: '#d4caff' },
  { id: 'frontend', y: 12.1, color: '#7ef4f4' },
  { id: 'back-end', y: 19.8, color: '#ffa9a8' },
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
        style: {
          fontFamily: 'Montserrat',
          color: '#444444',
          fontSize: '12px',
        },
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
