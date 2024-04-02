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
    const handleFromFilterChange = (e) => {
        if (e.target.value === "apiData") {
            showApiData();
            return
        } else if (e.target.value === "dbData") {
            showDbData();
            return
        }
        showAllData();
        return
    }
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

            <div className={ style.filter_container }>
                <p>Order: </p>
                <select className={ style.filter_options_container } onChange={ (e) => handleAlphaFilterChange(e) }>
                    { alphaFilter.map((alpha, index) => {
                        return (
                            <option key={ index } value={ alpha.value }>

                                { alpha.title }

                            </option>
                        )
                    }) }
                </select>

            </div>
            <div className={ style.filter_container }>
                <p>From: </p>
                <select className={ style.filter_options_container } onChange={ (e) => handleFromFilterChange(e) }>
                    <option value="all" >
                        All
                    </option>
                    <option value="apiData" >
                        Api
                    </option>
                    <option value="dbData">
                        db
                    </option>
                </select>
            </div>
            <div className={ style.filter_container }>
                <label>Choose temperament:</label>
                <select className={ style.filter_options_container } onChange={ (e) => handleTempsFilterChange(e) }>
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