import React, { Component } from "react";

import axios from "../../axios-sleep";

import { storage } from "../../FirebaseConfig";

import { connect } from "react-redux";

class VenmoUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venmoPhoto: ""
    };
  }
  uploadVenmo = e => {
    e.preventDefault();
    let currentVenmoName = "participant-venmo-" + Date.now();

    let uploadImage = storage
      .ref(`images/${currentVenmoName}`)
      .put(e.target.files[0]);

    uploadImage.on(
      "state_changed",
      snapshot => {},
      error => {
        alert(error);
      },
      () => {
        storage
          .ref("images")
          .child(currentVenmoName)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({
              venmoPhoto: url
            });

            // store venmo screenshot in the database

            const participantScreenshot = {
              venmoPhoto: url
            };

            // const groupId = this.props.joinCode;
            // const partUserId = this.props.partUserId
            console.log(participantScreenshot);

            axios
              .put(`/api/participant/${this.props.partUserId}`, {
                ...participantScreenshot
              })
              .then(res => {
                console.log(res.data);
              })
              .catch(error => console.log(error));
          });
      }
    );
  };
  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <h1>Upload Venmo screenshot for proof of payment here</h1>
        <form onSubmit={this.uploadVenmo}>
          <input
            type="file"
            className="process__upload-btn"
            onChange={e => this.uploadVenmo(e)}
          />
          <img
            src={this.state.venmoPhoto}
            alt="venmo screenshot"
            className="process__image"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.groups.groups, "state from venmo upload");
  return {
    joinCode: state.groups.groups.joinCode,
    partUserId: state.auth.user.firebase_id,
//     participantId: state.auth.user.id
  };
};

// export default VenmoUpload;
export default connect(
  mapStateToProps,
  {}
)(VenmoUpload);
