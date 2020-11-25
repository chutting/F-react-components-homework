import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleChangleMessage = (message) => {
    this.addMessage({ text: message, role: ROLE.CUSTOMER });
    const response = answersData.filter((answer) => {
      const matchTag = answer.tags.find((tag) => message.includes(tag));
      return !!matchTag;
    });
    this.addMessage(response);
  };

  addMessage = (message) => {
    const messages = this.state.messages.concat(message);
    if (message.role === ROLE.CUSTOMER) {
      this.setState({
        messages,
      });
    } else {
      setTimeout(() => {
        this.setState({
          messages,
        });
      }, 1000);
    }
  };

  render() {
    console.log(this.state.messages);
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput changeMessage={(message) => this.handleChangleMessage(message)} />
      </main>
    );
  }
}

export default Chat;
