import React from "react";

const UserGroups = props => {
  return (
    <div className='groups'>      
      <p>
        <b>Group Name: </b>
        {props.group.groupName}
      </p>
    </div>
  );
};

export default UserGroups;
