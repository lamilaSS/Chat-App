import * as types from '../constants/ActionTypes';
import cookie from 'react-cookies'
let initialState = {
    language: cookie.load('language'),
}
const changeLanguage = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_LANGUAGE:
            if (action.language === null) {
                return Object.assign({}, state, {
                    language: 'vn'
                })
            }
            return Object.assign({}, state, {
                language: action.language
            })
        default:
            return state
    }
}

export default changeLanguage