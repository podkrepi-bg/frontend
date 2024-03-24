import React, { ComponentProps, ComponentType, LazyExoticComponent } from 'react'

export type PreloadableComponent<T extends ComponentType<ComponentProps<T>>> =
  LazyExoticComponent<T> & {
    preload(): Promise<T>
  }

function lazyWithPreload<T extends ComponentType<ComponentProps<T>>>(
  factory: () => Promise<{ default: T }>,
): PreloadableComponent<T> {
  const Component: Partial<PreloadableComponent<T>> = React.lazy(factory)

  Component.preload = async () => {
    const LoadableComponent = await factory()
    return LoadableComponent.default
  }

  return Component as PreloadableComponent<T>
}

export default lazyWithPreload
