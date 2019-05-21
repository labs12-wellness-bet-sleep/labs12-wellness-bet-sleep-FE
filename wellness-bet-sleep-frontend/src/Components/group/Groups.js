import React, { Component } from "react";
import { connect } from "react-redux";

import Group from "./Group";

import { getGroups } from "../../Store/Actions/group-actions";

class Groups extends Component {
  // componentDidMount() {
  //   this.props.getGroups();
  // }
  render() {
    return (
      <div className="groups">
        <h1>List of groups</h1>
        <div className="GroupsList">
          <ul>
            {this.props.groups.map(group => {
              return (
                <Group
                  groupName={group.groupName}
                  id={group.id}
                  buyInAmt={group.buyInAmt}
                  startDate={group.startDate}
                  endDate={group.endDate}
                  groupMessage={group.groupMessage}
                  potTotal={group.potTotal}
                  joinCode={group.joinCode}
                  key={group.id}
                  deleteGroup={this.props.deleteGroup}
                  //   updateGroup={this.props.updateGroup}
                  setUpdateForm={this.setUpdateForm}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
};
// export default Groups;

const mapStateToProps = (state) => ({
  groups: state.groups.groups
});

// const mapDispatchToProps = {}
export default connect(
  mapStateToProps, {getGroups}
)(Groups);
