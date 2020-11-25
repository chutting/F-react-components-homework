import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      customerMessage: '',
    };
  }

  handleSubmit = () => {
    this.props.changeMessage(this.state.customerMessage);
    document.querySelector('.input').value = '';
  };

  handleChangeMessage = (e) => {
    this.setState({
      customerMessage: e.target.value,
    });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" onBlur={this.handleChangeMessage} className="input" />
        <button type="button" onClick={this.handleSubmit}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
