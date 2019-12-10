import React, {Component} from 'react';

import Message from "./Components/Message/Message";
import PostForm from "./Components/PostForm/PostForm";

import './App.css';

class App extends Component {
  state = {
    url: 'http://146.185.154.90:8000/messages',
    messages: [],
    newText: '',
  };

  messageInterval = setInterval(async () => {
    let messages = [...this.state.messages];

    const lastMessage = this.state.messages[this.state.messages.length - 1];

    this.setState({url: `http://146.185.154.90:8000/messages?datetime=${lastMessage.datetime}`});

    const result = await fetch(this.state.url);

    const newMessages = await result.json();

    if(messages.length > 0){
      newMessages.forEach(message => {
        messages.push(message);
      });

      this.setState({messages});
    }
  }, 1000);

  changeText = (event) => {
    this.setState({newText: event.target.value})
  };

  postMessage = (event) => {
    event.preventDefault();

    const data = new URLSearchParams();

    data.set('message', this.state.newText);

    data.set('author', 'Someone');

    fetch(this.state.url, {
      method: 'post',
      body: data,
    });
  };

  async componentDidMount() {
    const result = await fetch(this.state.url);

    let messages = [...this.state.messages];

    if(result.ok){
      messages = await result.json();

      this.setState({messages})
    }
  }

  render() {
    const messages = this.state.messages.map(message =>
      <Message
        key={message._id}
        text={message.message}
        author={message.author}
        datetime={new Date(message.datetime)}
      />
    ).reverse();

    return (
      <div className='App'>
        <PostForm
          postMessage={(event) => this.postMessage(event)}
          changeText={(event) => this.changeText(event)}
        />
        {messages}
      </div>
    );
  }
}

export default App;