import lazyWithPreload from 'common/util/lazyWithPreload'
import { Suspense, useState } from 'react'

const RenderNotificationModal = lazyWithPreload(
  () => import('components/client/notifications/GeneralSubscribeModal'),
)
export default function withLazyloadSubscribtionModal<T extends object>(
  WrappedComponent: React.ComponentType<T>,
) {
  const [open, setOpen] = useState(false)
  const onClick = () => {
    setOpen((prev) => !prev)
  }
  const onMouseOver = () => {
    RenderNotificationModal.preload()
  }
  return (props: T) => (
    <>
      <WrappedComponent {...props} onMouseOver={onMouseOver} onClick={onClick} />
      <Suspense>{open && <RenderNotificationModal setOpen={setOpen} />}</Suspense>
    </>
  )
}
