import {SORT_TYPE} from '../../../variables/variables.tsx';
import {useDispatch} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {useAppSelector} from '../../../components/hooks';

function SortingPlaces(): JSX.Element {
  const dispatch = useDispatch();
  const sortSpanRef = useRef<HTMLElement>(null);
  const [sortingIsOpened, setSortingIsOpened] = useState(false);
  const currentSort = useAppSelector((state) => state.currentSort);

  useEffect(() => {
    const hideSortList = (evt: MouseEvent) => {
      if (evt.target instanceof HTMLElement && sortSpanRef.current && !sortSpanRef.current.contains((evt.target)){
        setSortingIsOpened(false);
      });

      document.addEventListener('click', hideSortList);

      return () => {
        document.removeEventListener('click', hideSortList);
      }
    }
  })

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
              Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.values(SORT_TYPE).map((SORT_TYPE) => {
          <li key={SORT_TYPE}
              className={`places__option${SORT_TYPE === changeSorting ? 'places__option--active' : ''} `}
              tabIndex={0}>Price: low to high</li>;
        })}
        <li className="places__option places__option--active" tabIndex={0}>Popular</li>
      </ul>
    </form>
  )
}

export default SortingPlaces;
