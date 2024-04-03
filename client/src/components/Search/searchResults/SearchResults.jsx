import { useEffect, useState } from 'react'
import style from './SearchResults.module.css'
import { Link } from 'react-router-dom'

export const SearchResults = ({ results, setResults }) => {
    const [ apiData, setApiData ] = useState([]);
    const [ dbData, setDbData ] = useState([]);
    const [ toShowData, setToShowData ] = useState([]);

    useEffect(() => {
        if (!results.length) {
            setToShowData([]);
        } else {
            setApiData(results[ 0 ].api);
            if (results[ 1 ].db === null) return setDbData([])
            setDbData(results[ 1 ].db);

        }
        return () => {

            setToShowData(apiData.concat(dbData));
        }
    }, [ results, apiData, dbData ]);
    // useEffect(() => {
    // }, [ toShowData ])

    const showApiData = () => {
        setToShowData(apiData);
    };

    const showDbData = () => {
        setToShowData(dbData);

    };

    const showAllData = () => {
        setToShowData(apiData.concat(dbData));
    };

    return (
        <div className={ style.results_container }>
            <div className={ style.results_search }>
                <div className={ style.results_filter }>
                    <button onClick={ showApiData }>api</button>
                    <button onClick={ showDbData }>db</button>
                    <button onClick={ showAllData }>todos</button>
                </div>
                <div className={ style.results_results_wrapper }>
                    { toShowData.length ? toShowData.map(res => {
                        return (
                            <Link onClick={ () => setResults("") } to={ `detail/${res.id}` } key={ res.id } className={ style.results_links }>
                                <img src={ res.image_url } alt={ res.name } />
                                <p>{ res.name }</p>
                            </Link>)
                    }) : (<p>Buscando...</p>) }
                </div>
            </div>
        </div>
    )
}
