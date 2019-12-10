import React, {Component} from 'react';
import './PostForm.css'

class PostForm extends Component {
  state = {

  };

  render() {
    return (
      <div className="input-form">
        <form
          onSubmit={this.props.postMessage}
        >
          <input type="text"
                 className="form-control"
                 placeholder="Enter text"
                 onChange={this.props.changeText}
          />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    );
  }
}

export default PostForm;