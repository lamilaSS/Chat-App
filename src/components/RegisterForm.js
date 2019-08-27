import React from 'react';
import injectSheet from 'react-jss';
import { styles } from './RegisterStyle';
import { validateUsername, validateEmail, validatePassword, confirmPassword } from '../utils/utils';
import Popup from "reactjs-popup";
class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorUsername: false,
            errorEmail: false,
            errorPassword: false,
            errorConfirm: false,
            responseMessage: "",
            open:false,
        }
    }

    onSignup = () => {
        let { txtUsername, txtEmail, txtPassword, txtConfirm } = this.refs;
        let { errorUsername, errorEmail, errorPassword, errorConfirm, responseMessage } = this.state;
        let username = txtUsername.value;
        let email = txtEmail.value;
        let password = txtPassword.value;
        let confirm = txtConfirm.value;

        // Username.
        if (!validateUsername(username)) {
            this.setState({
                errorUsername: true
            })
        } else {
            this.setState({
                errorUsername: false
            })
        }

        // Email.
        if (!validateEmail(email)) {
            this.setState({
                errorEmail: true
            })
        } else {
            this.setState({
                errorEmail: false
            })
        }

        // Password.
        if (!validatePassword(password)) {
            this.setState({
                errorPassword: true
            })
        } else {
            this.setState({
                errorPassword: false
            })
        }

        // Confirm.
        if (!confirmPassword(password, confirm) && errorPassword === false) {
            this.setState({
                errorConfirm: true
            })
        } else if (confirmPassword(password, confirm) && errorPassword === false) {
            this.setState({
                errorConfirm: false
            })
        }

        // Authenticate with server.
        if (!errorUsername && !errorEmail && !errorPassword && !errorConfirm) {

            console.log("Register success");
            let register = {
                "username": username,
                "password": password,
                "email": email,
            }
            fetch('/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register)
            }).then(
                response => response.json(), //ADDED >JSON() HERE

                error => console.log('An error occurred.', error)


            ).then(data => this.setState({
                responseMessage: data.message
            }))
            if (responseMessage === "Account is exist") {

            } else {
                console.log("modal closed ");
                this.setState({
                    open : false
                });
            }
        }
    }
    onOpen = () =>{
        let { open } = this.state;
        this.setState({
            open : true
        });
    }
    render() {
        let { classes } = this.props;
        let { errorUsername, errorEmail, errorPassword, errorConfirm, open } = this.state;

        let elErrUsername = errorUsername ? <p className="error">Invalid Username! (6-30 Character)</p> : '';
        let elErrEmail = errorEmail ? <p className="error">Invalid Email!</p> : '';
        let elErrPassword = errorPassword ? <p className="error">Invalid Password!  (6-30 Character)</p> : '';
        let elErrConfirm = errorConfirm ? <p className="error">Confirm Password must be matched!</p> : '';

        return (
            <Popup open={open} trigger={<a onClick={this.onOpen} href="#" style={{ color: "black" }}> Don't have account ?</a>} modal>
                <div className={classes.login}>
                    <h2>Signup</h2>

                    <p>Username</p>
                    {elErrUsername}
                    <input type="text" ref="txtUsername" placeholder="Enter Username" />
                    <p>Email Address</p>
                    {elErrEmail}
                    <input type="text" ref="txtEmail" placeholder="Enter Email" />
                    <p>Password</p>
                    {elErrPassword}
                    <input type="password" ref="txtPassword" placeholder="••••••••" />
                    <p>Confirm Password</p>
                    {elErrConfirm}
                    <input type="password" ref="txtConfirm" placeholder="••••••••" />

                    <div className="action">
                        <button className="btnSignup" onClick={this.onSignup}>Signup</button>
                        <button className="btnLogin">Login</button>
                    </div>
                </div>
            </Popup>
        );
    }
}

export default injectSheet(styles)(RegisterForm);
