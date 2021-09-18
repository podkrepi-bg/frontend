import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { teamPieData, teamPieOptions, TeamPieItem } from 'components/index/helpers/chart/pieData'
import { useTranslation } from 'next-i18next'
import handleViewport from 'react-in-viewport'

export type TeamPieProps = {
  inViewport: boolean
  forwardedRef: React.RefObject<HTMLDivElement>
  enterCount: number
}

const TeamPie = ({ inViewport, forwardedRef, enterCount }: TeamPieProps) => {
  const { t } = useTranslation()
  teamPieData.forEach((item: TeamPieItem): void => {
    item.name = t(`index:team-chart-section.data.${item.id}`)
  })

  const [runAnimation, setRunAnimation] = useState(inViewport || enterCount > 0)

  useEffect(() => {
    setRunAnimation(inViewport || enterCount > 0)

    function handleResize(): void {
      setRunAnimation(false)
      setRunAnimation(inViewport || enterCount > 0)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <div ref={forwardedRef}>
      {runAnimation && <HighchartsReact highcharts={Highcharts} options={teamPieOptions} />}
    </div>
  )
}

export default handleViewport(TeamPie, {}, { disconnectOnLeave: true })
