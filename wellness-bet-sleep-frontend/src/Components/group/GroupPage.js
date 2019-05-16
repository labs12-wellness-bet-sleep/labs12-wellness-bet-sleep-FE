import React, { Component } from "react";
import { connect } from "react-redux";


import GroupForm from "./GroupForm";
import Groups from "./Groups";

import { Route, NavLink } from "react-router-dom";
import axios from "../../axios-sleep.js";

class GroupPage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeItem: {
  //       groupName: "",
  //       buyInAmt: "",
  //       startDate: "",
  //       endDate: "",
  //       groupMessage: "",
  //       potTotal: "",
  //       joinCode: ""
  //     },
  //     groups: [],
  //     error: ""
  //   };
  // }

  // componentDidMount() {
  //   // const userId = localStorage.getItem("id");
  //   // axios
  //   //   .get("/api/groups")
  //   //   .then(res => {
  //   //     console.log(res);
  //   //     this.setState({ groups: res.data });
  //   //   })
  //   //   .catch(err => {
  //   //     // console.log(err);
  //   //     this.setState({ error: err });
  //   //   });
  //   this.getGroups();
  // }

  // getGroups = () => {
  //   const userId = localStorage.getItem("id");

  //   console.log(userId, "Error");

  //   axios
  //     .get(`/api/groups/`)
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({ groups: res.data });
  //     })
  //     .catch(err => console.log("Data Failed", err));
  // };

  // addAnotherGroup = (e, anotherGroup) => {
  //   e.preventDefault();
  //   axios
  //     .post("/api/groups/invite", anotherGroup)
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({
  //         groups: res.data
  //       });
  //       this.props.history.push("/group-page");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // deleteGroup(e, id) {
  //   e.preventDefault();
  //   axios
  //     .delete(`/api/groups/${id}`)
  //     .then(res => {
  //       // console.log(res);
  //       this.setState({ groups: res.data });
  //       this.props.history.push("/group-page");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // setUpdateForm(e, anotherGroup) {
  //   e.preventDefault();
  //   this.setState({ activeItem: anotherGroup });
  //   this.props.history.push("/group-form");
  // }

  // updateGroup = (e, anotherGroup) => {
  //   e.preventDefault();
  //   axios
  //     .put(`/api/groups/${anotherGroup.id}`, anotherGroup)
  //     .then(res => {
  //       console.log(res);
  //       this.setState({
  //         activeItem: null,
  //         groups: res.data
  //       });
  //       this.props.history.push("/group-page");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    return (
      <div>
        {/* <h1> Welcome to Group Page </h1>
        <NavLink to="/group-page">Group Home</NavLink>
        <NavLink to="/group-form"> Group Form </NavLink>

        <Route
          path="/group-page"
          exact
          render={props => (
            <Groups
              {...props}
              getGroups={this.getGroups}
              deleteGroup={this.deleteGroup}
              groups={this.state.groups}
              setUpdateForm={this.setUpdateForm}
              updateGroup={this.updateGroup}
            />
          )}
        /> */}

        {/* <GroupForm
          getGroups={this.getGroups}
          addAnotherGroup={this.addAnotherGroup}
          updateGroup={this.updateGroup}
        />

        <Groups
          getGroups={this.getGroups}
          deleteGroup={this.deleteGroup}
          groups={this.state.groups}
          setUpdateForm={this.setUpdateForm}
          updateGroup={this.updateGroup}
        /> */}
        <GroupForm />
        <Groups />
      </div>
    );
  }
}

// export default GroupPage;
export default connect(null, {})(GroupPage);
