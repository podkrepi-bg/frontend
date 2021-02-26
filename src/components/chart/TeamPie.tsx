import React from 'react'
import { useTranslation } from 'react-i18next'
import { ResponsivePie } from '@nivo/pie'
import { teamPieData, TeamPieData } from 'components/chart/pieData'

const styles = {
  height: '380px',
  width: '99%',
  paddingTop: '20px',
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
        margin={{ top: 30, right: 100, bottom: 30, left: 100 }}
        innerRadius={0.4}
        padAngle={0.7}
        radialLabelsLinkDiagonalLength={20}
        radialLabelsLinkHorizontalLength={5}
        sliceLabelsRadiusOffset={0.65}
        colors={{ scheme: 'set2' }}
        radialLabel="label"
        isInteractive={false}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          { match: { id: 'back-end' }, id: 'dots' },
          { match: { id: 'frontend' }, id: 'lines' },
          { match: { id: 'full-stack' }, id: 'dots' },
          { match: { id: 'dev-ops' }, id: 'lines' },
          { match: { id: 'qa' }, id: 'dots' },
          { match: { id: 'ngo' }, id: 'lines' },
          { match: { id: 'design' }, id: 'dots' },
          { match: { id: 'law' }, id: 'lines' },
          { match: { id: 'management' }, id: 'dots' },
          { match: { id: 'accounting' }, id: 'lines' },
          { match: { id: 'marketing' }, id: 'dots' },
          { match: { id: 'others' }, id: 'lines' },
        ]}
      />
    </div>
  )
}

export default TeamPie
