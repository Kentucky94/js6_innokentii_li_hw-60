import React from 'react';
import Moment from "react-moment";
import './Message.css';

const Message = props => {
  return (
    <div className="card text-white bg-primary mb-3" style={{maxWidth: '25rem'}}>
      <div className="card-header">
        <Moment
          date={props.datetime}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">Author: {props.author}</h5>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
};

export default Message;