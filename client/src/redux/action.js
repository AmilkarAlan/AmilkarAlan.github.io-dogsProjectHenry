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