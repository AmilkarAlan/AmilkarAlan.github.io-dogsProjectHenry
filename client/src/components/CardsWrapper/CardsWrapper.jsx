import { useState } from 'react';
import style from './CardsWrapper.module.css'
import Pagination from '../Pagination/Pagination';

const ITEMS_PER_PAGE = 10
const CardsWrapper = ({ dogs }) => {
  const [ currentPage, setCurrentPage ] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = dogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={ style.cards_wrapper }>
      <div className={ style.cards_grid }>
        { selectedItems.map((dog) => (
          <div>{ dog.name }</div>
        )) }
      </div>
      <Pagination handlePageChange={ handlePageChange } itemsPerPage={ ITEMS_PER_PAGE } currentPage={ currentPage } dogs={ dogs } />
    </div>
  )
}

export default CardsWrapper