import React, { Component } from "react";
import axios from "../../axios-sleep";


class SendEmail extends Component {
  state = {
    email: {
      recipient: "",
      sender: "",
      subject: "",
      text: "",
      
    }
  };

  sendEmail = e => {
    const { email } = this.state;
    axios.get(
      `/api/joinLink/?recipient=${email.recipient}&sender=${
        email.sender
      }&topic=${email.subject}&text=${email.text}`
    ).catch(err => console.log(err));
  };
  render() {
    const { email } = this.state;
    const spacer = {
      margin: 10
    };
    const textArea = {
      borderRadius: 4
    };
    return (
      <div className="sendEmail">
        <div style={{ marginTop: 10 }}>
          <h2> Send Email </h2>
          <label> Recipient </label>
          <br />
          <input
            value={email.recipient}
            onChange={e =>
              this.setState({ email: { ...email, recipient: e.target.value } })
            }
          />
          <div style={spacer} />
          <label> Sender </label>
          <br />
          <input
            value={email.sender}
            onChange={e =>
              this.setState({ email: { ...email, sender: e.target.value } })
            }
          />
          <div style={spacer} />
          <label> Subject </label>
          <br />
          <input value={email.subject}
            onChange={e => this.setState({ email: { ...email, subject: e.target.value } })} />
            <div style={spacer} />
          <label> Join code: </label>
          <br />
          <textarea
            rows={3}
            value={email.text}
            style={textArea}
            onChange={e =>
              this.setState({ email: { ...email, text: e.target.value } })
            }
          />
          <div style={spacer} />

         
        
                   

          <button onClick={this.sendEmail}> Send Email </button>
        </div>
      </div>
    );
  }
}

export default SendEmail;
