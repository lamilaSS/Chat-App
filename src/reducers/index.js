import { combineReducers } from 'redux';

import changeLanguage from './changeLanguge'
import Login from './Login'
const myReducers = combineReducers({
    
    changeLanguage:changeLanguage,
   
    Login:Login,
});

export default myReducers;