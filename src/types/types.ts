import {AuthorizationStatus, DataStatus, PostingStatus} from '../const.ts';

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

export interface OfferExtended extends Offers {
    description: string;
    images: string[];
    goods: string[];
    host: User;
    bedrooms: number;
    maxAdults: number;
}

export interface OfferProcess {
  data: null | OfferExtended;
  status: DataStatus;
  isOfferDataLoading: boolean;
  isErrorInOfferDataLoading: boolean;
}

export interface Reviews {
    id?: string;
    comment: string;
    date: string;
    rating: number;
    user: User;
}

export interface ReviewsData {
  offerId: string;
  comment: string;
  rating: number;
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

export interface FormSendingCommentsProps {
  rating: number;
  review: string;
}

export type Ratings = readonly [number, string][];

export interface AuthProcess {
  status: AuthorizationStatus;
  isErrorInAuthRequest: boolean;
  isErrorInCheckAuthRequest: boolean;
  userInfo: UserData | null;
}

export interface UserData extends User {
  email: string;
  token: string;
  offerId: string;
  status: number;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface ErrorMesageType {
  type: string;
  message: string;
}

export interface ReviewsProcess {
  data: Reviews[];
  status: DataStatus;
  posingStatus: PostingStatus;
}

export interface NearPlacesProcess {
  data: Offers[];
  status: DataStatus;
}


