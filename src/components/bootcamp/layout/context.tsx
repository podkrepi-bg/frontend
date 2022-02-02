import { action, autorun, configure, observable } from 'mobx'
import React, { createContext } from 'react'

configure({ enforceActions: 'always' })

export class ConfigStore {
    @observable isOpen: boolean = true
    @observable isSearchOpen: boolean = true

    constructor() {
        this.load()
        autorun(this.save)
    }

    private save = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem(
                'isOpenedDrawer',
                JSON.stringify({
                    isOpen: this.isOpen,
                    isSearchOpen: this.isSearchOpen
                })
            )
        }
    }

    @action
    private load = () => {
        if (typeof window !== "undefined") {
            Object.assign(this, JSON.parse(localStorage.getItem('isOpenedDrawer') || '{}'))
        }
    }

    @action
    changeIsOpen = (isOpen: boolean) => {
        this.isOpen = isOpen
        this.save()
        this.load()
    }

    @action
    changeIsSearchOpen = (isOpen: boolean) => {
        this.isSearchOpen = isOpen
        this.save()
        this.load()
    }
}


export const context = createContext(new ConfigStore())

export default function DrawerContext({ children }: React.PropsWithChildren<any>) {
    return <context.Provider value={new ConfigStore()}>
        {children}
    </context.Provider>
}