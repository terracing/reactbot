import React, { Component } from 'react';
import axios from 'axios/index';

class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    async df_text_query(message) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: message
                }
            }
        };

        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {message});

        for (let msg of res.data.fullfilmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    async df_event_query(event) {
        const res = await axios.post('/api/df_event_query', {event});

        for (let msg of res.data.fullfilmentMessages) {
            says = {
                speaks: 'me',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    render () {
        return (
            <div style={{ height:400, width: 400, float: 'right' }}>
                <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <h2>Chatbot</h2>
                    <div className="input-field">
                        <input type="text" placeholder="Message" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chatbot;