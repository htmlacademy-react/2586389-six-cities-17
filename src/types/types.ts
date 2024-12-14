export interface OfferIrregular {
    id: string;
    title: string;
    type: string;
    price: number;
    previewImage?: string;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
}

export interface Location {
    id?: number;
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface City {
    id?: number;
    name: string;
    location: Location;
}

export interface Offers extends OfferIrregular {
    location: Location;
    city: City;
}

export interface OffersExtended extends Offers {
    description: string;
    images: string[];
    goods: string[];
    host: User;
    bedrooms: number;
    maxAdults: number;
}

export interface Reviews {
    id?: string;
    comment: string;
    date: string;
    rating: number;
    user: User;
}


export interface SettingsType {
    [key: string]: {
      width: number;
      height: number;
    };
}

export interface User {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export interface IsFavorite {
  isFavorite: boolean;
}

