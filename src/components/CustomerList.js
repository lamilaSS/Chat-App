


import React from 'react';
import cookie from 'react-cookies'
import Popup from "reactjs-popup";
import ChatForCS from "../atmosphere/atmosphere"
import { ChatFeed, Message } from 'react-chat-ui'












class CustomerList extends React.Component {
    constructor(props) {
        super(props);


        
            this.state = {
                customerStatus: "online",
                messages: [

                ],
                isOpen: false,
                useCustomBubble: false,
                curr_user: 0,
            }

            







        




        let a = new ChatForCS(this.props.data.roomID, this.onMessage.bind(this));
        this.a = a
        this.a.open()
       
        let message = {
            "username": this.props.data.username,
            "customerSp": this.props.responeMessage.username,

        }
        fetch('/userStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }).then(
            response => response.json(), //ADDED >JSON() HERE

            error => console.log('An error occurred.', error)


        ).then(data => {
            
            if(data.status === "inChat"){
                if(typeof  data.oldMess !=="undefined"){
                    data.oldMess.map((chat) => {
                        if (chat.sender === this.props.responeMessage.username + "") {
                            
                        } else {
                            
                        }
                    });
                }
                if(data.supporter === this.props.responeMessage.username){
                    this.setState({ isOpen: true, customerStatus: "inChat" });
                }else{
                    this.setState({ isOpen: false, customerStatus: "inChat" });
                }
                
            }
            
            


        })






    }
    handleOpen = () => {
        this.setState({ isOpen: true });

    }

    handleClose = () => {
        this.setState({ isOpen: false, customerStatus: "online", messages: [] });
        cookie.remove(this.props.data.username)

        let message = {
            "sender": this.props.responeMessage.username + "",
            "customerSupportName": this.props.responeMessage.username + "",
            "action": "disconnect",
            "message": "",
            "customerName": this.props.data.username + "",
            "roomID": this.props.data.roomID + "",
            "customerStatus": "online"
        }
        this.a.sendMessage(JSON.stringify(message))
    }
    // shouldComponentUpdate () {
    //     return false // this will lead to never re-render the component
    // }
    onMessage(data) {
        this.setState({
            customerStatus: data.customerStatus
        })

        if (data.action === "connect") {
            
           

            if (data.customerSupportName === this.props.responeMessage.username || data.customerSupportName === "") {
                data.oldMess.map((chat) => {
                    if (chat.sender === this.props.responeMessage.username + "") {
                        this.state.messages.push(new Message({ id: 0, message: chat.message }))
                        this.setState({
                            messages: this.state.messages
                        })
                    } else {
                        this.state.messages.push(new Message({ id: 1, message: chat.message }))
                        this.setState({
                            messages: this.state.messages
                        })
                    }
                });

            }





        } else {



            if (data.sender === this.props.responeMessage.username + "") {
                this.state.messages.push(new Message({ id: 0, message: data.message }))
                this.setState({
                    messages: this.state.messages
                })
            } else {
                this.state.messages.push(new Message({ id: 1, message: data.message }))
                this.setState({
                    messages: this.state.messages
                })
            }
        }

    }

    render() {

        const AskToConnect = (data) => {

            let message = {
                "sender": this.props.responeMessage.username + "",
                "customerSupportName": this.props.responeMessage.username + "",
                "action": "connect",
                "message": "",
                "customerName": this.props.data.username + "",
                "roomID": this.props.data.roomID + "",
                "customerStatus": "inChat"
            }
            this.a.sendMessage(JSON.stringify(message))

        }
        const onMessageSubmit = (data) => {

            let message = {
                "sender": this.props.responeMessage.username + "",
                "customerSupportName": this.props.responeMessage.username + "",
                "action": "support",
                "message": document.getElementById("chat").value,
                "customerName": this.props.data.username + "",
                "roomID": this.props.data.roomID + "",
                "customerStatus": "inChat"
            }
            this.a.sendMessage(JSON.stringify(message))

        }
        if (this.state.customerStatus === "inChat" ) {
            return (
                <div>
                    <Popup open={this.state.isOpen} closeOnDocumentClick={false} contentStyle={{ width: "200px" }}
                        onOpen={this.handleOpen} closeOnEscape={false} trigger={<div><button disabled="true"
                            disabled={true}
                            onClick={AskToConnect}
                            className='chat-list'
                            title={this.props.data.username}
                            value={this.props.data.username}

                        >{this.props.data.username}</button> <div style={{ backgroundColor: "red", width: "30px", height: "30px" }} ></div></div>} position="right center">
                        <div><div className="container">



                            <div className="chatfeed-wrapper">
                                <ChatFeed
                                    chatBubble={this.state.useCustomBubble}
                                    maxHeight={250}
                                    messages={this.state.messages} // Boolean: list of message objects
                                    showSenderName
                                />

                                <input type="text" id="chat" ></input>
                                <button onClick={onMessageSubmit}>Send</button>



                            </div>

                        </div><button onClick={this.handleClose}>click to close</button></div>
                    </Popup>

                </div>)
                ;
        } else {
            return (
                <div>
                    <Popup open={this.state.isOpen} modalOptions={{ dismissible: false }} contentStyle={{ width: "200px" }} closeOnDocumentClick={false}
                        onOpen={this.handleOpen} closeOnEscape={false} trigger={<div><button

                            onClick={AskToConnect}
                            className='chat-list'
                            title={this.props.data.username}
                            value={this.props.data.username}

                        >{this.props.data.username}</button> <div style={{ backgroundColor: "yellow", width: "30px", height: "30px" }} ></div></div>} position="right center">
                        <div><div className="container">



                            <div className="chatfeed-wrapper">
                                <ChatFeed
                                    chatBubble={this.state.useCustomBubble}
                                    maxHeight={250}
                                    messages={this.state.messages} // Boolean: list of message objects
                                    showSenderName
                                />

                                <input type="text" id="chat" ></input>
                                <button onClick={onMessageSubmit}>Send</button>



                            </div>

                        </div><button onClick={this.handleClose}>click to close</button></div>
                    </Popup>

                </div>)
                ;
        }

    }
}
export default CustomerList