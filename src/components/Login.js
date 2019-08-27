
import cookie from 'react-cookies'
import Popup from "reactjs-popup";
//import css module
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import React from 'react';
import { connect } from 'react-redux'
import Register from '../components/RegisterForm'
import injectSheet from 'react-jss';
import { styles } from './LoginStyles';
import classnames from 'classnames';
import { login } from '../actions'
import myConnection from "../atmosphere/atmosphere2"
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        }
        let a = new myConnection(this.onMessage.bind(this));
        this.a = a
        this.a.open()
    }
    onMessage (){

    }
    render() {
        const responseGoogle = (response) => {
            console.log(response);
        }
        const responseFacebook = (response) => {
            console.log(response);
        }
        
        const _Login = () => {

            const { dispatch } = this.props;
            var randomstring = require("randomstring");

            let message = {
                "username": document.getElementById("username").value,
                "password": document.getElementById("password").value,
                "roomID" : randomstring.generate(32)
            }
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            }).then(
                response => response.json(), //ADDED >JSON() HERE

                error => console.log('An error occurred.', error)


            ).then(data => {

                if (data.message === "wrong username" || data.message === "wrong password" || data.message === "") {

                } else if(data.message === "customer" || data.message === "customers") {
                    

                    dispatch(login(data))

                    cookie.save('username', data, { path: '/' })

                    
                    this.a.sendMessage(JSON.stringify(data))
                    
                }else{
                    dispatch(login(data))

                    cookie.save('username', data, { path: '/' })
                }
            })



        }
        let { classes, active } = this.props;
        let { error } = this.state;

        let elErr = error ? <p className="error">Invalid Username or Password!</p> : '';
        return (


            <div style={{ color: "black" }} className={classnames(classes.login, !active && 'close')} >

                Username:
                <input type="text" ref="txtUsername" id="username"   ></input><br />
                Password:
                <input type="password" ref="txtPassword" id="password" ></input><br />
                {elErr}
                <button onClick={_Login}>Login</button>

                <Register></Register>

                <Popup trigger={<a href="#" style={{ color: "black" }}> Forget your password ?</a>} modal>,


                </Popup>
                <br />
                <GoogleLogin
                    clientId="733478232005-9ud3262bseunk804ovipnbqof3bqmao5.apps.googleusercontent.com"
                    buttonText="Sign up with gmail"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}

                />
                <FacebookLogin
                    appId="" //APP ID NOT CREATED YET
                    textButton="Sign up with facebook"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cookie={'single_host_origin'}
                    cssClass="btnFacebook"
                />
            </div>



        );
    }
}




export default injectSheet(styles)(connect()(Login));
 



