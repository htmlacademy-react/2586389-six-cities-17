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
  FavoritesApi = '/favorite',
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
  OffersSpace = 'offers',
  Offer = 'offer',
  NearPlaces = 'nearPlaces',
  Reviews = 'reviews',
  Favorite = 'favorite',
}

export enum BookmarkStatus {
  Offer = 'offer',
  PlacesCard = 'place-card',
}


