import * as types from '../constants/ActionTypes';
import cookie from 'react-cookies'
let initialState = {
    responseMessage: cookie.load("username")
}
const Login = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            
            
            if (typeof cookie.load("username")!=="undefined") {
                console.log(cookie.load("username"))
                return Object.assign({}, state, {
                    responseMessage: cookie.load("username")
                })
            } else {
                return Object.assign({}, state, {
                    responseMessage: action.payload,

                })
            }
            case types.LOGOUT:
            
            
           
                return Object.assign({}, state, {
                    responseMessage: {
                        username: "",
                        message: ""
                    }

                })
        default:
            return state
    }
}

export default Login