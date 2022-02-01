import { enableStaticRendering } from 'mobx-react'
import { action, computed, makeObservable, observable } from 'mobx'

enableStaticRendering(typeof window === 'undefined')

interface Dialog {
    ids: any[]
    show: boolean
}

export class DialogStoreImpl {
    dialogs: Dialog[] = []

    constructor() {
        makeObservable(this, {
            dialogs: observable,
            show: action,
            hide: action,
            clear: action,
            getDialogs: computed,
        })
    }

    show(ids: any[]) {
        this.clear()
        const dialog: Dialog = {
            ids,
            show: true,
        }
        this.dialogs.push(dialog)
    }

    hide() {
        if (this.dialogs.length > 0) this.dialogs[0].show = false
    }

    clear() {
        this.dialogs = []
    }

    get getDialogs() {
        return this.dialogs
    }
}

export const DeleteManyModalStore = new DialogStoreImpl()
