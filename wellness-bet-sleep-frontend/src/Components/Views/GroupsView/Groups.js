import React, { Component } from "react";
import axios from "axios";
import UserCard from "../UserCard.js";
import UserGroups from "./UserGroups.js";


class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      groups: []
    };
  }

  componentDidMount = () => {
    this.fetchUser(this.props.match.params.id);
    this.fetchGroups(this.props.match.params.id);
  };

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchUser(newProps.match.params.id);
      this.fetchGroups(this.props.match.params.id);
    }
  }

  fetchUser = id => {
    axios.get(`https://sleep-bet.herokuapp.com/api/users/${id}`).then(res => {
      this.setState({ user: res.data });
    });
  };

  fetchGroups = id => {
    axios.get(`https://sleep-bet.herokuapp.com/api/users/${id}/groups`).then(res => {
        console.log(res);
      this.setState({ groups: res.data.groups });
    });
  };

  render() {
    if (!this.state.groups) {
      return <div>Loading User's groups...</div>;
    }

    return (
      <div className="user-groups">
        <UserCard user={this.state.user} />
        {this.state.groups.map(group => (             
          <UserGroups key={group.id} group={group} />
          
        ))}
      </div>
    );
  }
}

export default Groups;
