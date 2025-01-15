export enum AppRoute {
    Main = '/',
    Favorites = '/favorites',
    Offer = '/offer/:id',
    Login = '/login',
    NotFound = '*'
}

export enum APIRoute {
  OffersApi = '/offers',
  LoginApi = '/login',
  LogoutApi = '/logout',
  OfferApi = '/offer',
  ReviewsApi = '/reviews',
  FavoritesApi = '/favorites',
  NearPlacesApi = '/nearPlaces',
  CommentsApi = '/comments',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum DataStatus {
  Unknown = 'unknown',
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

export enum PostingStatus {
  Unknown = 'unknown',
  Posting = 'posting',
  Posted = 'posted',
  Error = 'error',
}

export enum NameSpace {
  Auth = 'auth',
  City = 'city',
  OffersSpace = 'offers',
  Offer = 'offer',
  NearPlaces = 'nearPlaces',
  Reviews = 'reviews',
  FavoriteOffers = 'favorite_offers',
  Sort = 'sort',
}


