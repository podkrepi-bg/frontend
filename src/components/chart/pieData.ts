import { Options } from 'highcharts'

export type TeamPieItem = { id: string; y: number; color: string; name?: string }

export const teamPieData: Array<TeamPieItem> = [
  { id: 'back-end', y: 19.8, color: 'rgb(243, 88, 115)' },
  { id: 'frontend', y: 12.1, color: 'rgb(155, 110, 160)' },
  { id: 'full-stack', y: 11.1, color: 'rgb(112, 131, 173)' },
  { id: 'dev-ops', y: 10.6, color: 'rgb(155, 108, 229)' },
  { id: 'qa', y: 8.3, color: 'rgb(192, 152, 130)' },
  { id: 'management', y: 12.0, color: 'rgb(13, 228, 97)' },
  { id: 'marketing', y: 9.8, color: 'rgb(190, 216, 24)' },
  { id: 'ngo', y: 5.0, color: 'rgb(109, 173, 41)' },
  { id: 'design', y: 4.7, color: 'rgb(255, 164, 230)' },
  { id: 'law', y: 2.2, color: 'rgb(242, 222, 208)' },
  { id: 'accounting', y: 2.2, color: 'rgb(209, 200, 185)' },
  { id: 'others', y: 2.2, color: 'rgb(243, 186, 181)' },
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
