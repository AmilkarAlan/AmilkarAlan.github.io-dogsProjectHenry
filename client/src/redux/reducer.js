import * as actionsType from './actions-type'

const initialState = {
    dogsApi: [],
    dogsDb: [],
    searchResults: [],
    genres: [],
    loading: true,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_ALLDOGS_START:
            return {
                ...state,
                loading: true,
            }
        case actionsType.GET_ALLDOGS_FULL:
            return {
                ...state,
                loading: false,
                dogsApi: [ ...action.payload.api],
                dogsDb: action.payload.db ? [...action.payload.db] : []
               
            }
        case actionsType.GET_ALLDOGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer