import style from './Layout.module.css'
import SearchBar from '../../components/Search/searchBar/SearchBar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';


export const Layout = () => {
  const [ currentPageName, setCurrentPageName ] = useState("")
  const { pathname } = useLocation();
  
  useEffect(() => {
    const formattedPathname = pathname.split('/')[1];
    const capitalizedPathname = formattedPathname.charAt(0).toUpperCase() + formattedPathname.slice(1);
    const links = document.querySelectorAll(`.${style.link}`)
    links.forEach((link) => {
      if (link.getAttribute('href') === pathname) {
        link.classList.add(style.active);
      } else {
        link.classList.remove(style.active);
      }
    });
    setCurrentPageName(capitalizedPathname)
  }, [ pathname ]);
  return (
    <div className={ style.home_grid }>

      <div className={ style.home_header }>
        <h1 className={ style.page_name }>{ currentPageName }</h1>
        <nav className={style.home_header_nav}>
          <Link to='home' className={ style.link }>Home</Link>
          <SearchBar setSearchInput="" searchInput="" />
          <Link to='create' className={ style.link }>Add new dog</Link>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}
