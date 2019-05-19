import React, { Component } from 'react';
import { auth, googleProvider } from '../../FirebaseConfig';
import { connect } from 'react-redux';
import { getProfile } from './../../Store/Actions/auth';


class Profile extends Component {
    logout = () => {
        // localStorage.removeItem('token');
        localStorage.removeItem("token");
        localStorage.removeItem("fb_id");
        auth.signOut()
        this.props.history.push('/')
        console.log('log out')
    }
    render() {
        // const userInfo = this.props.users.find( user  => { return this.props.match.params.id === `${user.email}`})

        console.log(this.props.users, 'profile props')
    return (
        <div> 
           
           <p> email {this.props.users.email}</p>
           <p> fullName {this.props.users.fullName}</p>
           <p> id {this.props.users.id}</p>
           <img src={this.props.users.profilePhoto}/>
        <button onClick={this.logout}>Log Out</button>
        </div>
    )}
}

const mapStateToProps = state => {
    return {
        users: state.auth.user
    }
}

const mapDispatchToProps = dispatch  => {
    return {
        profilePage: user =>  dispatch(getProfile(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);