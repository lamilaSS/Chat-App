import { Chat, addResponseMessage, addUserMessage } from 'react-chat-popup';
import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login'
import Popup from "reactjs-popup";
import myConnection from "../atmosphere/atmosphere"


class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'vn',
            messages: [],
            customerSupportName: ""
        }

        let a = new myConnection(this.props.responeMessage.roomID, this.onMessage.bind(this));
        this.a = a
        this.a.open()
        let message = {
            "username": this.props.responeMessage.username,

        }
        fetch('/getOldMessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }).then(
            response => response.json(), //ADDED >JSON() HERE

            error => console.log('An error occurred.', error)


        ).then(data => {
            
            if(typeof  data.oldMess !=="undefined"){
                data.oldMess.map((chat) => {console.log(chat)
                    if (chat.sender === this.props.responeMessage.username + "") {
                        addUserMessage(chat.message)
                    } else {
                        addResponseMessage(chat.message)
                    }
                });
            }
            


        })





    }
    onMessage(data) {

        if (data.sender === this.props.responeMessage.username + "") {

        } else {

            addResponseMessage(data.message)
        }

        this.setState({
            customerSupportName: data.customerSupportName
        })
    }

    LoginClick = () => {
        return (<Login />);
    }
    componentDidMount() {
        

        


    }

    render() {


        if (this.props.responeMessage.message === "customers") {

            let handleNewUserMessage = (newMessage) => {
                let message = {
                    "sender": this.props.responeMessage.username + "",
                    "customerSupportName": this.state.customerSupportName + "",
                    "action": "support",
                    "message": newMessage,
                    "customerName": this.props.responeMessage.username + "",
                    "roomID": this.props.responeMessage.roomID + "",
                    "customerStatus": "inChat"
                }
                this.a.sendMessage(JSON.stringify(message))
            }
            return (




                <div style={{ color: "black" }}>


                    <Chat handleNewUserMessage={handleNewUserMessage} />


                </div>




            );

        } else if (this.props.responeMessage.message === "customersSupport") {

            return (




                <div style={{ color: "black" }}>




                </div>




            );
        }
        else {
            return (




                <div style={{ color: "black" }}>


                    <Popup trigger={<button onClick={this.LoginClick} style={{ alignSelf: "flex end", backgroundColor: "rgb(53, 204, 230)", border: "0px", borderRadius: "50%", boxshadow: "rgb(181, 181, 181) 0px 2px 10px 1px", height: "60px", marginTop: "10px", width: "60px", outline: "none", float: "right", position: "absolute", bottom: "0", right: "0" }}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAABmJLR0QA/wD/AP+gvaeTAAACc0lEQVRYhcWXzYtNcRjHP891WWim8V7kLVmNyCzsJE2zUJqypMmUlJcFeSs2FEuUIvEHzMaOZqwMSfK6EBvKS1hwEWLkZcTH4hy5xnTvOeeO7nd1zj3P9zmfe37P8zvPCRqQ2gasBKYDpRzWn8Br4HJEfGyEAXWd+tbG9EHtBYiCEN3AOeAFcBh4kP7LrCoB7cA+YBrQWYQD9br6SZ1fKMGfPO3qsDpQNMEn9WIjEFW57qjPygX9E4ChOjfoBpYBNyPifI3QIWBmIYr0cZ6tcX3/iKLcWyP2ilrJ03J5tA14RFKET4Dt9QxFl6ae+oELwHOgBfjSFJCI2KjOAa4Bk4GNmUHUBcA6ksIZX8c3LgPPBmA2sDYi6rZnOYXYBBwDJma4QVb1AW8j4kyW4LK6HDgNPAZ2ALeB73V8rzLkngjMUksRUX/XVfvSFluSIflvT832TWPWq2/UljpxV9TK7+26khUiK0iOXPfUpyWSwvs6FkkLQCwmefndHZP2VRcBHeQr9knArvT4SMMg6hbgBMX2pHdAT0RcHdWszgOOAruBNmA/sDki3leFhXoQOADcBw4BP3JAfKN6QlNvqU9HgHSoj9Wlapf6UJ1bdX1Y/Zp22y11ag6A0TUaSAbPcApxSW2t+n2NOqDmXqaiNXIDqAC9EVHdcZ3AapJh+uV/B4mIFUV8tfS/5pHcKgGfgSlqU6FKJDNDK7C5mSBlktd/L3BSXUWyJ+RRBTgVEd8aplEXqoPqz0zfZ/9qUG1Rj6fnuafyMkBEPAK61BkkM2Ye7QG2AoMkA3PzpO4d8YSKfaeMEczOqqVtHkgK06P2q1mG67/0C1tTB0BaqpsDAAAAAElFTkSuQmCC" alt="open launcher" />
                    </button>} modal>
                        <Login></Login>

                    </Popup>


                </div>




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
export default connect(mapStateToProps)(Footer);