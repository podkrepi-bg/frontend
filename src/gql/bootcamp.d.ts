export type BootcampersType = {
    id: UUID
    MyName: string
    email: string
    phone: string
    type: string
}
export type BootcampersResponse = {
    id: UUID
    MyName: string
    email: string
    phone: string
}

export type BootcamperInput = {
    MyName: string
    email: string
    phone: string
}

export type BootcamperFormData = {
    MyName: string
    email: string
    phone: string
}