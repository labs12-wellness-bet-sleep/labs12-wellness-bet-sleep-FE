import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import { deleteGroup } from "../../Store/Actions/group-actions";

const Group = props => {
  return (
    <div className="group">
      <Link to={`/groups/${props.id}`}>
        <h3>Group Name: {props.groupName}</h3>
        <strong> Buy in Amount: {props.buyInAmt}</strong>
        <p> Start Date: {props.startDate} </p>
        <p> End Date: {props.endDate} </p>
        <p> Group Message: {props.groupMessage} </p>
        <p> Total bet Money: {props.potTotal} </p>
        <p> Group join code: {props.joinCode} </p>
        {/* <button onClick={(e => props.deleteGroup(e, props.id))}>Delete Group</button> */}
        <button onClick={e => props.deleteGroup(props.id)}>
          Delete Group
        </button>

        <button onClick={e => props.setUpdateForm(e, props)}>
          Update Group info
        </button>
      </Link>
    </div>
  );
};

// export default Group;

export default connect(
  null,
  { deleteGroup }
)(Group);
