import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';


import Navbar from './NavBar';



const styles = theme => ({
    root: {
        display: 'flex'
    },
    fitgirl: {
        marginLeft: '450px',
        marginTop: '440px'
      },
      welcome: {
        width: '200px',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: '24px',
        margin: '0 auto',
        marginTop: '-100px',
        marginBottom: '50px',
        fontWeight: 'bold',
        color: '#249BD1',
      },
      createMess: {
        width: '215px',
        margin: '0 auto',
        lineHeight: '2',
        textAlign: 'center',
        marginTop: '-40px',
        fontSize: '16px',
        color: '#249BD1',
        marginBottom: '15px'
      },

      card: {
        maxWidth: "100%",
        height: 440, 
        margin: '0 auto',
        boxShadow: 'none'
      }
        
})


class Dashboard extends Component {

    state = {
        groups: []
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/groups")
            .then(response => {
                this.setState({
                    groups: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    // fetchDate = () => {
    //     axios.get('http://localhost:8080/api/groups')
    // }



    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <Navbar history={this.props.history} groups={this.state.groups}/>
                {/* <Route
                 path="/dashboard/nav"
                 render={props => (
                  <Navbar
                  {...props}
                  groups={this.state.groups}
                  />
                 )}
                 />
   */}
                 {/* <JoinWithCode /> */}
            </div>
            )
        }       
      }

      
export default withStyles(styles)(Dashboard);
// const mapStateToProps = state => {
//     return {
//         users: state.auth.user
//     }
// }

// const mapDispatchToProps = dispatch  => {
//     return {
//         profilePage: user =>  dispatch(getProfile(user))
//     }
// }
// export default connect(null, mapDispatchToProps)(Dashboard);