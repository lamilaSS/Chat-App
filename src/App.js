import React from 'react';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import myReducer from './reducers/index';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import Header from "../src/components/Header"
import Footer from "./components/Footer"
const store = createStore(myReducer, applyMiddleware(thunk));

class App extends React.Component {

    render() {

        return (
            <Provider store={store}>



                <div>
                    <Header />
                 

                </div>
                <Footer></Footer>
                

            </Provider >
        );
    }
}

export default App;
