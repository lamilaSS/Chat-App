import atmosphere from 'atmosphere.js'
import React from "react";

let socket = atmosphere;
let subSocket;
let transport = 'websocket';
let fallbackTransport = 'long-polling'

class myConnection extends React.Component {
    constructor(onMessage ) {
        super();
        this.request = {
            url: 'ws://localhost:8080/room/',
            contentType: "application/json",
            logLevel: 'debug',
            transport: transport,
            trackMessageLength: true,
            reconnectInterval: 5000,
            fallbackTransport: fallbackTransport
        };
        this.request.onMessage = function (response) {
            console.log('onOpen');
           
        };
        this.request.onMessage = function (response) {
            
            let message = response.responseBody;

            try {
                let json = JSON.parse(message);
                onMessage(json)
                
            }
            catch (e) {
                console.log(e);
            }
        };
        
    
    }
    
    close() {
        subSocket.close();
    }
    open() {
        subSocket = socket.subscribe(this.request);
    }
    sendMessage(message){
        subSocket.push(message);
    }
}


export default myConnection
