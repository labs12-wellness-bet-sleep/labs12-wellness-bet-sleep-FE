import React, { Component } from 'react';
import { auth, googleProvider } from '../../FirebaseConfig';
import { connect } from 'react-redux';

class Profile extends Component {
    logout = () => {
        // localStorage.removeItem('token');
        auth.signOut()
        this.props.history.push('/')
        console.log('log out')
    }
    render() {
        // const userInfo = this.props.users.find( user  => { return this.props.match.params.id === `${user.email}`})

        console.log(this.props.users)
    return (
        <div> 
            user profile
        <button onClick={this.logout}>Log Out</button>
        </div>
    )}
}

const mapStateToProps = state => {
    return {
        users: state.auth.user
    }
}
export default connect(mapStateToProps)(Profile);