import React, { Component } from "react";
import axios from "../../axios-sleep.js";

import { connect } from "react-redux";
import { addGroup } from "../../Store/Actions/group";

// import Groups from "./Groups";

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.activeItem || {
      groupName: "",
      buyInAmt: "",
      startDate: "",
      endDate: "",
      groupMessage: "",
      potTotal: "",
      joinCode: ""
    };
  }

  // handleChanges = ev => {
  //   ev.persist();
  //   let value = ev.target.value;
  //   if (ev.target.name === "buyInAmt" || ev.target.name === "potTotal") {
  //     value = parseInt(value, 10);
  //   }
  //   this.setState(prevState => ({
  //     ...prevState,
  //     [ev.target.name]: value
  //   }));
  // };

  // addGroup = e => {
  //   e.preventDefault();
  //   this.props.addGroup(this.state.group, this.props.userId);
  //   this.setState({
  //     group: {
  //       ...this.state.group,
  //       joinCode: ""
  //     }
  //   });
  // };

  addGroup = (event) => {
    event.preventDefault();
    // add code to create the group using the api
    this.props.addAnotherGroup(event, this.state)

    this.setState({
      // groupName: "",
      // buyInAmt: "",
      // startDate: "",
      // endDate: "",
      // groupMessage: "",
      // potTotal: "",
      joinCode: ""
    });
    console.log('button clicked');
      
  }

  render() {
    return (
      <div className="groupForm">
        {/* <form onSubmit={this.addGroup}>
          <input
            onChange={this.handleInputChange}
            placeholder="Group Name"
            value={this.state.groupName}
            name="groupName"
            className="groupInput"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Buy in amount $"
            value={this.state.buyInAmt}
            name="buyInAmt"
            className="groupInput"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Start Date ex. Jan 11, 2019"
            value={this.state.startDate}
            name="startDate"
            className="groupInput"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="End Date ex. Feb 11, 2019"
            value={this.state.endDate}
            name="endDate"
            className="groupInput"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Group Message"
            value={this.state.groupMessage}
            name="groupMessage"
            className="groupInput"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Total bet money"
            value={this.state.potTotal}
            name="potTotal"
            className="groupInput"
          />
          <button type="submit" className="addBtn" onSubmit={() => this.addGroup()}>
            Add Group
          </button>
        </form> */}
        {/* <form onSubmit={() => this.addGroup()}>
          <input
            onChange={this.handleInputChange}
            placeholder="Group Name"
            value={this.state.joinCode}
            name="joinCode"
            className="groupInput"
          /> */}

          <button
            type="submit"
            className="addBtn"
            onSubmit={() => this.addGroup()}
          >
            Add Group
          </button>
        {/* </form> */}
        
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   userId: state.groups.user
// });

// export default connect(
//   mapStateToProps,
//   { addGroup }
// )(GroupForm);
export default GroupForm;
