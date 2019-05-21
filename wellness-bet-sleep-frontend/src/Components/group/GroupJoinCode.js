import React, { Component } from 'react';
import axios from '../../axios-sleep';

class GroupJoinCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
          group: {},
          joinCode: '',
          error: ''
        };
      }
      
      componentDidMount() {
        // this.getGroupByJoinCode(e, this.state.joinCode) 
        // getGroupByJoinCode(e, joinCode) {
            // e.preventDefault();
            axios.get(`/api/groups/join/${this.state.joinCode}`).then(res => {
                console.log(res);
                this.setState({ group: res.data, joinCode: res.data.joinCode  });
              //   this.props.history.push('/groups')
            }).catch(err => {
                console.log(err);
            });
        //   }         
      }

    //   getGroupByJoinCode(e, joinCode) {
    //       e.preventDefault();
    //       axios.get(`/api/groups/join/${joinCode}`).then(res => {
    //           console.log(res);
    //           this.setState({ group: res.data, joinCode: res.data.joinCode  });
    //         //   this.props.history.push('/groups')
    //       }).catch(err => {
    //           console.log(err);
    //       });
    //     }

  render() {
    return (
      <div>
          {this.state.group.groupName}
        
      </div>
    )
  }
}

export default GroupJoinCode

