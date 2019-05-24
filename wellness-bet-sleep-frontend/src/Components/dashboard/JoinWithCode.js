import React from "react";
import { withStyles, Typography, TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";

import { groupTypes } from '../../Store/Actions/actionTypes';



import axios from '../../axios-sleep.js';

const styles = theme => ({
  container: {
    lineHeight: 4
  },
  welcome: {
    width: "200px",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: "24px",
    margin: "0 auto",
    marginTop: "-100px",
    marginBottom: "50px",
    fontWeight: "bold",
    color: "#249BD1"
  },
  joinbycode: {
    display: "flex",
    width: "650px",
    height: "1000px",
    margin: "0 auto",
    textAlign: "center",
    justifyContent: "center",
    flexFlow: "column"
  },
  jointext: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#008BC9",
    lineHeight: 2
  },
  textField: {
    width: "330px"
  },
  textColor: {
    borderWidth: "1px",
    color: "#008BC9",
    borderColor: "#008BC9 !important"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#008BC9 !important",
    color: "#008BC9"
  },
  input: {
    color: "#008BC9"
  }
});

class JoinWithCode extends React.Component {
  state = {
    joincode: "",
    participant: []
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addParticipantJoinCode = (e) => {
    e.preventDefault();
    // const joinCode = this.state.joincode;
    // console.log(this.state.joincode, 'this.state.joincode joinwithcode');
    // console.log(joinCode);
    // const joincodeObj = {joinCode}
    // console.log(joincodeObj, 'joincodeObj')

    // const token = localStorage.getItem("token");
    // const firebaseId = localStorage.getItem("fb_id");
    const participantJoinCode = {
      groupId: this.state.joincode,
      partUserId: this.props.firebaseId      
    };
    axios
      .post(
        `http://localhost:8080/api/participant/add`,
        { ...participantJoinCode},
        // {
        //   "Content-Type": "application/json",
        //   joincodeObjation: token }
        // }
      )
      .then(res => {
        console.log("participant join code", res.data);
        localStorage.setItem('joinCode', res.data.joinCode);
        this.props.onJoinGroup(res)
      }).catch(err => {
        console.log(err);
      });
    // this.props.history.push(`/group/uploadIamge/${joinCode}`);
    
  };

  render() {
    const { classes } = this.props;


    return (
      <div>
        <div className={classes.joinbycode}>
          <Typography className={classes.jointext}>Join By Code</Typography>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Secret Group Code"
              type="search"
              name="joincode"
              className={classes.textField}
              value={this.state.joincode}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input
                }
              }}
              InputLabelProps={{
                style: {
                  color: "#008BC9"
                }
              }}
            />
            <div>
              <Button
                variant="outlined"
                color="primary"
                style={{ fontSize: "12px" }}
                onClick={this.addParticipantJoinCode}
              >
                Join Group
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state from join code', state.groups.groups);
  console.log(state.auth, 'state from joincode')
  return {
    firebaseId: state.auth.user.firebase_id,
  }
}

const mapDispatchToProps = dispatch => ({ 
  onJoinGroup: (res) => dispatch({type: groupTypes.UPDATE_GROUP_SUCCESS, payload: res.data})
})

// export default withStyles(styles)(JoinWithCode);
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JoinWithCode));
