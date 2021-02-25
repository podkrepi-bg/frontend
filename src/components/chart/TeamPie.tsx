import React from 'react'
import { useTranslation } from 'react-i18next'
import { ResponsivePie } from '@nivo/pie'
import { teamPieData, TeamPieData } from 'components/chart/pieData'

const styles = {
  height: '380px',
  width: '100%',
  'padding-top': '20px',
}

const TeamPie = () => {
  const { t } = useTranslation()
  teamPieData.forEach((item: TeamPieData): void => {
    item.label = t(`index:team-chart-section.data.${item.id}`)
  })

  return (
    <div style={styles}>
      <ResponsivePie
        data={teamPieData}
        margin={{
          top: 30,
          right: 0,
          bottom: 30,
          left: 0,
        }}
        innerRadius={0.4}
        padAngle={0.7}
        radialLabelsLinkDiagonalLength={20}
        radialLabelsLinkHorizontalLength={20}
        sliceLabelsRadiusOffset={0.65}
        colors={{ scheme: 'set3' }}
        radialLabel="label"
        isInteractive={false}
      />
    </div>
  )
}

export default TeamPie
