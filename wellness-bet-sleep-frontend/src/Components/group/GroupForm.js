import React, { Component } from "react";
import axios from "../../axios-sleep.js";

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

  // componentDidUpdate(prevProps) {
  //   if(this.props.activeItem &&
  //     prevProps.activeItem !== this.props.activeItem
  //     ) {
  //       this.setState({ prevProps.activeItem })
  //     }
  // }

  handleChanges = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "buyInAmt" || ev.target.name === "potTotal") {
      value = parseInt(value, 10);
    }
    this.setState(prevState => ({
      ...prevState,
      [ev.target.name]: value
    }));
  };

  handleSubmit = e => {
    if (this.props.activeItem) {
      this.props.updateGroup(e, this.state);
    } else {
      this.props.addAnotherGroup(e, this.state);
    }
    this.setState({
      groupName: "",
      buyInAmt: "",
      startDate: "",
      endDate: "",
      groupMessage: "",
      potTotal: ""
    });
  };

  addGroup = event => {
    event.preventDefault();
    // this.props.addAnotherGroup(event, this.state);

    // this.setState({
    //   groupName: "",
    //   buyInAmt: "",
    //   startDate: "",
    //   endDate: "",
    //   groupMessage: "",
    //   potTotal: "",
    //   joinCode: ""
    // });
    const newGroup = this.state;
    const userId = localStorage.getItem("token");
    const sentItems = { ...newGroup, userId };
    axios
      .post("/api/groups/invite", sentItems)
      .then(res => {
        console.log(res);
        this.props.getGroups();
        this.setState({
          groupName: "",
          buyInAmt: "",
          startDate: "",
          endDate: "",
          groupMessage: "",
          potTotal: "",
          joinCode: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  handleInputChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addGroup}>
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
        </form>
      </div>
    );
  }
}

export default GroupForm;
