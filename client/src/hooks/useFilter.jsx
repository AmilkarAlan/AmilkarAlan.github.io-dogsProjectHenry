import { useEffect, useState } from "react"

const useFilter = (dogs, setCurrentPage) => {
    const [ alphaFilter, setAlphaFilter ] = useState('none');
    const [ tempFilter, setTempFilter ] = useState('all');
    const [ apiData, setApiData ] = useState([]);
    const [ dbData, setDbData ] = useState([]);
    const[dogsShow, setDogsShow] = useState([])
    const [ filteredDogs, setFilteredDogs ] = useState([]);

    useEffect(() => {

        const compareName = (a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0
        };

        const filterTemps = (dogs) => {
            if (tempFilter === "all") return dogs;
            return dogs.filter((item) => item.temperaments?.some((temp)=>temp.name === tempFilter))
        }


        let newDogs = [ ...dogsShow ];
        newDogs = filterTemps(newDogs)
        if (alphaFilter === "asc") {
            newDogs.sort(compareName);
        } else if (alphaFilter === "desc") {
            newDogs.sort(compareName).reverse();
        }
        setFilteredDogs(newDogs);

    }, [ alphaFilter, tempFilter, dogsShow ])

    useEffect(() => {
        if (!dogs.length) {
            setFilteredDogs([]);
        } else {
            setApiData(dogs[ 0 ]?.api);
            if (dogs[ 1 ]?.db === null) return setDbData([{status:"No hay nada aqui"}])
            setDbData(dogs[ 1 ]?.db);
        }
    }, [ dogs ]);

    useEffect(() => {
        setDogsShow(apiData.concat(dbData));
    }, [ apiData, dbData ])

    const showApiData = () => {
        setDogsShow(apiData);
        setCurrentPage(1);
    };

    const showDbData = () => {
        setDogsShow(dbData);
        setCurrentPage(1);

    };

    const showAllData = () => {
        setDogsShow(apiData.concat(dbData));
        setCurrentPage(1);
    };
    return {
        filteredDogs,
        setAlphaFilter,
        setFilteredDogs,
        setTempFilter,
        showAllData,
        showDbData,
        showApiData
    }
}

export default useFilter