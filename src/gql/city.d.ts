export type CityType = {
    id: string;
    name: string;
    postalCode: number;
    countryId: string;
}

export type CityResponse = {
    id: string;
    name: string;
    postalCode: number;
    countryId: string;
}

export type CityInput = {
    name: string;
    postalCode: number;
    countryId: string;
}

export type CityFormData = {
    name: string;
    postalCode: number;
    countryId: string;
}
