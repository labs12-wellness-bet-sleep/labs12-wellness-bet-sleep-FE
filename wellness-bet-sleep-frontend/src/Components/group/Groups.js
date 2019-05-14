import React, { Component } from 'react';

import Group from './Group';

class Groups extends Component {
  render() {
    return (
      <div className="groups">
        <h1>List of groups</h1>
        <div className='GroupsList'>
        
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
}


export default Groups;