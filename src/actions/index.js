import * as types from './../constants/ActionTypes';


export const changeLanguage = (language) => {
    return {
        type: types.CHANGE_LANGUAGE,
        language:language
    }
}
export const login = (responseMessage) => {
    return {
        type: types.LOGIN,
        payload:responseMessage
    }
}
export const logout = (responseMessage) => {
    return {
        type: types.LOGOUT,
        payload:responseMessage
    }
}