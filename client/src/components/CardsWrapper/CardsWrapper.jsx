import { useEffect, useState } from 'react';
import style from './CardsWrapper.module.css'
import Pagination from '../Pagination/Pagination';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';
import useFilter from '../../hooks/useFilter';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/action';


const ITEMS_PER_PAGE = 8
const CardsWrapper = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ dogsToShow, setDogsToShow ] = useState([])

  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);
  const temperaments = useSelector(state => state.temperaments);
  const loading = useSelector(state => state.loading)

  const { filteredDogs, showAllData, showDbData, showApiData, setAlphaFilter, setTempFilter } = useFilter(dogs, setCurrentPage)

  useEffect(() => {
    dispatch(getDogs())
  }, [ dispatch ]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const items = filteredDogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setDogsToShow(items)
  }, [ filteredDogs, currentPage ]);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={ style.cards_wrapper }>
      { loading
        ?
        "cargando"
        :
        (
          <>
            <Filters temperaments={ temperaments } setCurrentPage={ setCurrentPage } showAllData={ showAllData } showDbData={ showDbData } showApiData={ showApiData } setAlphaFilter={ setAlphaFilter } setTempFilter={ setTempFilter } />
            <div className={ style.cards_grid }>
              { dogsToShow?.map((dog) => (
                <Card dog={ dog } key={ dog.id } />
              )) }
            </div>
            <Pagination handlePageChange={ handlePageChange } itemsPerPage={ ITEMS_PER_PAGE } currentPage={ currentPage } dogs={ filteredDogs } />
          </>
        ) }
    </div>
  )
}

export default CardsWrapper