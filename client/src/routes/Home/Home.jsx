import style from './Home.module.css'
import SearchBar from '../../components/Search/searchBar/SearchBar'
import { Link, Outlet } from 'react-router-dom'

export const Home = ({ dogs, loading }) => {
  return (
    <div className={ style.home_grid }>
      <div className={ style.home_header }>
        <Link to='/' >Home</Link>
        <SearchBar setSearchInput="" searchInput="" />
        <Link to='create' >Add new dog</Link>
      </div>
        <Outlet />
    </div>
  )
}
