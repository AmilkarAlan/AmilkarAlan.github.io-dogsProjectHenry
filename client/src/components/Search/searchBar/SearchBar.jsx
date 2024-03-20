import style from './SearchBar.module.css'
import SearchIcon from '../../../assets/icons/SearchIcon/SearchIcon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { SearchResults } from '../searchResults/SearchResults';
import { getSearchDogs } from '../../../redux/action';

const SearchBar = () => {
    const [ open, setOpen ] = useState(false);
    const [ input, setInput ] = useState("");
    const [ resultsOpen, setResultsOpen ] = useState(false);
    const [ results, setResults ] = useState([]);
    const dispatch = useDispatch()
    const searchDogs = useSelector(state => state.searchResults)

    const handleChange = (e) => {
        setInput(e.target.value)
        setResultsOpen(true)
    }
    useEffect(() => {
        if (input === "") return setResultsOpen(false) 
        dispatch(getSearchDogs(input))
    }, [ input]);
    useEffect(() => {
        if (searchDogs.length) setResults(searchDogs)
    }, [ searchDogs ])


    return (
        <div className={ style.search_container } >
            <form
                className={ open ? (style.search_nav + " " + style.open) : style.search_nav } onSubmit={(e)=> e.preventDefault()}>
                <input
                    className={ style.search_input }
                    type="search"
                    value={ input }
                    onChange={ (e) => handleChange(e) }
                    name="search" />
                <div
                    onClick={ () =>
                        setOpen(!open) }

                    className={ style.search_icon }>
                    <SearchIcon />
                </div>
            </form>
            { resultsOpen ? <SearchResults results={ results } setResults={setInput} /> : null }

        </div>
    )
}

export default SearchBar