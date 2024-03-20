import style from "./Filters.module.css"
import { useSelector } from 'react-redux'

const Filters = ({ setAlphaFilter, setTempFilter, setCurrentPage, temperaments, showAllData, showDbData, showApiData }) => {


    const handleAlphaFilterChange = (e) => {
        const newValue = e.target.value
        setAlphaFilter(newValue);
    };

    const handleTempsFilterChange = (e) => {
        const newValue = e.target.value;
        setTempFilter(newValue);
        setCurrentPage(1)
    };

    const alphaFilter = [
        { title: "A-Z", value: "asc" },
        { title: "Z-A", value: "desc" },
    ]

    let temperamentFilter = temperaments.map(temp => (
        { title: temp.name, value: temp.name }
    ))
    temperamentFilter.unshift({ title: "None", value: "all" })
    return (

        <div className={ style.filter_wrapped }>

            <div className={ style.filterContainer }>
                <p>Order: </p>
                <div className={ style.buttonsContainer }>
                    { alphaFilter.map((alpha, index) => {
                        return (
                            <div className={ style.buttonsPad } key={ index }>
                                <button key={ index } value={ alpha.value } onClick={ handleAlphaFilterChange }>

                                    { alpha.title }

                                </button>
                            </div>
                        )
                    }) }
                </div>
            </div>
            <div className={ style.filterContainer }>
            <p>From: </p>
                <div className={ style.buttonsContainer }>
                    <div className={ style.buttonsPad } >
                        <button value="all" onClick={ showAllData }>
                            All
                        </button>
                        <button value="apiData" onClick={ showApiData }>
                            Api
                        </button>
                        <button value="dbData" onClick={ showDbData }>
                            db
                        </button>
                    </div>



                </div>
            </div>
            <div className={ style.filterContainer + " " + style.scroll }>
                <label>Choose temperament:</label>
                <select className={ style.buttonsContainer } onChange={ (e) => handleTempsFilterChange(e) }>
                    {/* <option value="none">None</option> */ }
                    { temperamentFilter.map((temp, index) => {
                        return (


                            <option key={ index } value={ temp.value }>

                                { temp.title }

                            </option>


                        )
                    }) }

                </select>

            </div>
        </div>




    );
};

export default Filters