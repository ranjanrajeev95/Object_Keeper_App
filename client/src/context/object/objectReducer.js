import {
    GET_OBJECTS,
    ADD_OBJECT,
    DELETE_OBJECT,
    CLEAR_OBJECTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_OBJECT,
    FILTER_OBJECTS,
    CLEAR_FILTER,
    OBJECT_ERROR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_OBJECTS:
            return {
                ...state,
                objects: action.payload,
                loading: false
            };
        case ADD_OBJECT:
            return {
                ...state,
                objects: [action.payload, ...state.objects],
                loading: false
            };
        case UPDATE_OBJECT:
            return {
                ...state,
                objects: state.objects.map(obj => obj._id === action.payload._id ? action.payload : obj),
                loading: false
            }
        case DELETE_OBJECT:
            return {
                ...state,
                objects: state.objects.filter(obj => obj._id !== action.payload),
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_OBJECTS:
            return {
                ...state,
                filtered: state.objects.filter(obj => {
                    // we want to just match the text passed in payload, so regex
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return obj.name.match(regex) || obj.location.match(regex) || obj.extras.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case CLEAR_OBJECTS:
            return {
                ...state,
                objects: null,
                filtered: null,
                error: null
            }
        case OBJECT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}