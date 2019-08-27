import Clock from 'react-live-clock';
import Dropdown from 'react-dropdown'
import cookie from 'react-cookies'
import Popup from "reactjs-popup";

import { slide as Menu } from 'react-burger-menu'
import ThemeSwitcher from "react-theme-switcher";
import React from 'react';
import { connect } from 'react-redux'
import { changeLanguage } from '../actions'
import Login from '../components/Login'

import * as actions from './../actions/index';
import { ChatList } from 'react-chat-elements'

import myConnection from "../atmosphere/atmosphere2"
import CustomersList from "../components/CustomerList"


const responseGoogle = (response) => {
    console.log(response);
}
class Header extends React.Component {
    constructor(props) {
        super(props);
        if (typeof cookie.load("customersList") === "undefined") {
            this.state = {
                language: 'vn',
                customersList: [],

            }
        } else {
            this.state = {
                language: 'vn',
                customersList: cookie.load("customersList"),

            }
        }


        let a = new myConnection(this.onMessage.bind(this));
        this.a = a
        this.a.open()








    }

    onMessage(data) {
        if (data.action === "login from another device") {

        }
        if (data.action === "login") {


            this.state.customersList.push(data)
            this.setState({
                customersList: this.state.customersList
            })
           



            cookie.save('customersList', this.state.customersList, { path: '/' })

        } if (data.action === "logout") {
            for (let i = 0; i < this.state.customersList.length; i++) {
                if (data.username === this.state.customersList[i].username) {
                    this.state.customersList.splice(i, 1)
                }
            }
            this.setState({
                customersList: this.state.customersList
            })
            cookie.save('customersList', this.state.customersList, { path: '/' })
        }

    }

    render() {
        const { dispatch } = this.props;
        const _onSelect = (res) => {

            if (res.value === this.state.language) {

            } else {
                if (this.state.language === "vn") {
                    dispatch(changeLanguage('en'))
                    this.setState({
                        language: "en"
                    })
                    cookie.save('language', res.value, { path: '/' })
                } else {
                    dispatch(changeLanguage('vn'))
                    this.setState({
                        language: "vn"
                    })
                    cookie.save('language', res.value, { path: '/' })
                }
            }


        }

        const _Logout = (res) => {

            let data = {
                username: "",
                message: ""
            }
            let message = {
                "username": this.props.responeMessage.username,
                "action": "logout",
            }
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            })


            dispatch(actions.logout(data))
            cookie.remove('username', { path: '/' });
            cookie.remove('customerStatus', { path: '/' });

            if (this.props.responeMessage.message === "customers") {

                this.a.sendMessage(JSON.stringify(message))

            }

        }



        const style = { height: "30px" }
        const options = ["vn", "en"];

        if (this.props.responeMessage.message === "customers") {

            return (
                <header>

                    <div style={{ width: "60px", float: "left", display: "inline-block", }}>Logo

                    </div>

                    <div style={{ display: "inline-block", float: "right", width: "370px" }} className="header-config">

                        <div className="language-change" style={{ width: "60px", float: "left", display: "inline-block", }}>
                            <Dropdown
                                style={style}
                                options={options}
                                onChange={_onSelect}
                                value={(this.state.language !== 'vn' && this.state.language !== 'en') ? (this.setState({ language: "vn" })) : (this.state.language)}

                            />
                        </div>
                        <div style={{ width: "300px", float: "right", display: "inline-block", }} className="date-time">
                            <Clock
                                ticking={true}
                                format={' MMMM/Mo/YYYY, h:mm:ss A'} />

                            <ThemeSwitcher
                                cssSelector="body"
                                darkColor="#282c34"
                                lightColor="#E9E5E5"
                                buttonColor="#ffffff"
                                switchColor="#2775cc"
                                lightTextColor="#272b33"
                                darkTextColor="#ffffff"
                            />

                        </div>

                        <div style={{ color: "black" }}> <a  >{this.props.responeMessage.username}</a> <button onClick={_Logout}>Logout</button></div>



                    </div>
                </header>
            );
        } else if (this.props.responeMessage.message === "customersSupport") {
            if (typeof this.state.customersList !== 'undefined' || this.state.customersList.length === 0) {
               
                const listItems = this.state.customersList.map((data) =>
                    (data.status === "inChat") ? (
                        <CustomersList data={data} responeMessage={this.props.responeMessage} />) : (
                            <CustomersList data={data} responeMessage={this.props.responeMessage} />




                        ));
                return (




                    <header>






                        <div style={{ display: "inline-block", float: "right", width: "100%" }} className="header-config">
                            <div style={{ width: "60px", float: "left", display: "inline-block", }}>Logo
    
                        </div>
                            <div className="language-change" style={{ width: "60px", float: "left", display: "inline-block", }}>
                                <Dropdown
                                    style={style}
                                    options={options}
                                    onChange={_onSelect}
                                    value={(this.state.language !== 'vn' && this.state.language !== 'en') ? (this.setState({ language: "vn" })) : (this.state.language)}

                                />
                            </div>
                            <div style={{ width: "300px", float: "right", display: "inline-block", }} className="date-time">
                                <Clock
                                    ticking={true}
                                    format={' MMMM/Mo/YYYY, h:mm:ss A'} />

                                <ThemeSwitcher
                                    cssSelector="body"
                                    darkColor="#282c34"
                                    lightColor="#E9E5E5"
                                    buttonColor="#ffffff"
                                    switchColor="#2775cc"
                                    lightTextColor="#272b33"
                                    darkTextColor="#ffffff"
                                />

                            </div>
                            <div style={{ color: "black" }}> <a  >{this.props.responeMessage.username}</a> <button onClick={_Logout}>Logout</button></div>




                        </div>
                        <div style={{ backgroundColor: "green", color: "black", width: "15%", height: "100vh", float: "left" }}>
                            {listItems}

                        </div>
                    </header>




                );
            } else {
                return (




                    <header>

                        <div style={{ width: "60px", float: "left", display: "inline-block", }}>Logo

                        </div>

                        <div style={{ display: "inline-block", float: "right", width: "370px" }} className="header-config">

                            <div className="language-change" style={{ width: "60px", float: "left", display: "inline-block", }}>
                                <Dropdown
                                    style={style}
                                    options={options}
                                    onChange={_onSelect}
                                    value={(this.state.language !== 'vn' && this.state.language !== 'en') ? (this.setState({ language: "vn" })) : (this.state.language)}

                                />
                            </div>
                            <div style={{ width: "300px", float: "right", display: "inline-block", }} className="date-time">
                                <Clock
                                    ticking={true}
                                    format={' MMMM/Mo/YYYY, h:mm:ss A'} />

                                <ThemeSwitcher
                                    cssSelector="body"
                                    darkColor="#282c34"
                                    lightColor="#E9E5E5"
                                    buttonColor="#ffffff"
                                    switchColor="#2775cc"
                                    lightTextColor="#272b33"
                                    darkTextColor="#ffffff"
                                />

                            </div>
                            <div style={{ color: "black" }}> <a  >{this.props.responeMessage.username}</a> <button onClick={_Logout}>Logout</button></div>




                        </div>
                    </header>




                );
            }


        } else {
            return (
                <header>

                    <div style={{ width: "60px", float: "left", display: "inline-block", }}>Logo

                    </div>

                    <div style={{ display: "inline-block", float: "right", width: "370px" }} className="header-config">

                        <div className="language-change" style={{ width: "60px", float: "left", display: "inline-block", }}>
                            <Dropdown
                                style={style}
                                options={options}
                                onChange={_onSelect}
                                value={(this.state.language !== 'vn' && this.state.language !== 'en') ? (this.setState({ language: "vn" })) : (this.state.language)}

                            />
                        </div>
                        <div style={{ width: "300px", float: "right", display: "inline-block", }} className="date-time">
                            <Clock
                                ticking={true}
                                format={' MMMM/Mo/YYYY, h:mm:ss A'} />

                            <ThemeSwitcher
                                cssSelector="body"
                                darkColor="#282c34"
                                lightColor="#E9E5E5"
                                buttonColor="#ffffff"
                                switchColor="#2775cc"
                                lightTextColor="#272b33"
                                darkTextColor="#ffffff"
                            />

                        </div>
                        <Popup trigger={<button style={{ color: "black" }}> Login</button>} modal>
                            <Login />
                        </Popup>
                    </div>
                </header>
            );
        }

    }
}

const mapStateToProps = (state) => {

    if (typeof state.Login.responseMessage === "undefined") {
        return {
            responeMessage: {
                username: "",
                message: ""
            },

        }
    } else {
        return {
            responeMessage: state.Login.responseMessage,

        }
    }


};

export default connect(mapStateToProps)(Header)



