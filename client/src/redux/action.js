import axios from "axios"
import * as actionTypes from "./actions-type"

export const getDogs = () => {
    return async (dispatch) => {
        dispatch(
            {
                type: actionTypes.GET_ALLDOGS_START
            }
        );
        try {
            const { data:{data} } = await axios.get("http://localhost:3001/dogs/");
            dispatch(
                {
                    type: actionTypes.GET_ALLDOGS_FULL,
                    payload: data.dbData.length ? { db: data.dbData, api: data.apiData } : { api: data.apiData },
                }
            )
        } catch (error) {
            dispatch({
                type: actionTypes.GET_ALLDOGS_ERROR,
                error: error.message
            });
        }
    }
}
export const getSearchDogs = (input) => {
    return async (dispatch) => {
        dispatch(
            {
                type: actionTypes.SEARCH_DOGS_START
            }
        );
        try {
            const { data:{data} } = await axios.get(`http://localhost:3001/dogs/search/?name=${input}`);
            dispatch(
                {
                    type: actionTypes.SEARCH_DOGS_FULL,
                    payload: data.dbData === null ? { api: data.apiData, db: [] } : { api: data.apiData, db: data.dbData},
                }
            )
        } catch (error) {
            dispatch({
                type: actionTypes.SEARCH_DOGS_ERROR,
                error: error.message
            });
        }
    }
}
export const getDetailDog = (input) => {
    return async (dispatch) => {
        dispatch(
            {
                type: actionTypes.DETAIL_DOGS_START,
            }
        );
        try {
            const { data:{data} } = await axios.get(`http://localhost:3001/dogs/search/${input}`);
            dispatch(
                {
                    type: actionTypes.DETAIL_DOGS_FULL,
                    payload: data
                }
            )
        } catch (error) {
            dispatch({
                type: actionTypes.DETAIL_DOGS_ERROR,
                error: error.message
            });
        }
    }
}

export const getTemperaments = () => {
    return async (dispatch) => {

        try {
            const { data:{data} } = await axios.get('http://localhost:3001/dogs/temperaments');
            dispatch(
                {
                    type: actionTypes.GET_ALLTEMPS,
                    payload: data
                }
            )
        } catch (error) {
            dispatch({
                type: actionTypes.GET_ALLTEMPS_ERROR,
                error: error.message
            });
        }
    }
}