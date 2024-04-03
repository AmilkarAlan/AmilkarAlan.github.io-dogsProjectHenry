import * as actionsType from './actions-type'

const initialState = {
    dogs: [],
    detailsDog: [],
    searchResults: [],
    temperaments: [],
    searching:true,
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
                dogs: action.payload.db ? ([{api:action.payload.api},{db:action.payload.db}]) : [{api:action.payload.api}, {db:[]}], 
            }
        case actionsType.GET_ALLDOGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionsType.SEARCH_DOGS_FULL:
            return {
                ...state,
                searchResults: action.payload.db ? ([{api:action.payload.api},{db:action.payload.db}]) : [{api:action.payload.api}], 
            }
        case actionsType.SEARCH_DOGS_ERROR:
            return {
                ...state,
                error: action.error
            }
        case actionsType.DETAIL_DOGS_START:
            return {
                ...state,
                searching: true,
            }
        case actionsType.DETAIL_DOGS_FULL:
            return {
                ...state,
                searching: false,
                detailsDog: action.payload
            }
        case actionsType.DETAIL_DOGS_ERROR:
            return {
                ...state,
                searching: false,
                error: action.error
            }
        case actionsType.POST_BREED_START:
            return {
                ...state,
                loading: true,
            }
        case actionsType.POST_BREED_FULL:
            return {
                ...state,
                loading: false,
                created: action.payload
            }
        case actionsType.POST_BREED_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionsType.GET_ALLTEMPS:
            return {
                ...state,
                temperaments: action.payload
            }
        default:
            return state
    }
}

export default reducer