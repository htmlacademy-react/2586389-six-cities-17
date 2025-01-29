import {describe} from 'vitest';
import {
  makeFakeCity,
  makeFakeOfferExtended,
  makeFakeOffers,
  makeFakeReviews
} from '../../../utils/mocks/mocks.ts';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import OfferWrapper from './offer-wrapper.tsx';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../components/history-router/history-router.tsx';
import {browserHistory} from '../../../browser-history/browser-history.ts';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../../store/root-reducer.ts';

describe('Component: OfferWrapper', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({
      reducer: rootReducer,
    });

    const offerWrapperTestId = 'offer-wrapper';

    const mockOfferWrapperData = makeFakeOfferExtended();
    const mockOfferReviewsWrapperData = Array.from({ length: 3 }, makeFakeReviews);
    const mockOffersWrapperData = Array.from({ length: 5 }, makeFakeOffers);
    const mockOfferCityWrapperData = makeFakeCity();

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={browserHistory}>
          <OfferWrapper
            offer={mockOfferWrapperData}
            reviews={mockOfferReviewsWrapperData}
            city={mockOfferCityWrapperData}
            selectedOffer={mockOfferWrapperData}
            nearPlaces={mockOffersWrapperData}
          />
        </HistoryRouter>
      </Provider>
    );

    const offerWrapper = screen.getByTestId(offerWrapperTestId);
    expect(offerWrapper).toBeInTheDocument();
  });
});
