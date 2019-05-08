import React, { Component } from "react";
import axios from "axios";

class SendEmail extends Component {
  state = {
    email: {
      recipient: "",
      sender: "",
      subject: "",
      text: "",
      html: ""
    }
  };

  sendEmail = e => {
    const { email } = this.state;
    axios.get(
      `http://localhost:8080/api/joinLink/?recipient=${email.recipient}&sender=${
        email.sender
      }&topic=${email.subject}&text=${email.text}&link=${email.html}`
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
          <label> Message </label>
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

          <label> html </label>
          <br />
          <textarea
            rows={3}
            value={email.html}
            style={textArea}
            onChange={e =>
              this.setState({ email: { ...email, html: e.target.value } })
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
