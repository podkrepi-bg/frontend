import React from 'react'
import { AnchoredAlert, AnchoredAlertProps } from './AnchoredAlert'

export type SectionAlertProps = {
  sectionRef: React.MutableRefObject<HTMLDivElement | null>
  alertProps: Omit<AnchoredAlertProps, 'sectionRef'>
}

function AlertsColumn({ refAlertArray }: { refAlertArray: SectionAlertProps[] }) {
  return (
    <>
      {refAlertArray.map((refAlertSet, index) => {
        return (
          <AnchoredAlert
            key={index}
            sectionRef={refAlertSet.sectionRef}
            {...refAlertSet.alertProps}
          />
        )
      })}
    </>
  )
}

export default AlertsColumn
