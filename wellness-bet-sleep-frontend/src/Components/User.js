import React, { Component } from 'react';

class User extends Component {
    constructor (props) {
        super(props)
    }

    render () {
    // const email = props.user.find( email => { return this.props.match.params.id === `${email.email}`})

    console.log(this.props)
    return(

        <div className="user" onClick={ () => 
            this.props.history.history.push(`/login/${this.props.user.email}`)} >
        
        
        <img src={this.props.user.profilePhoto} alt='uploaded profile photo' height='200' width='200'/>

        <ul>
        <li><b>Username :</b> {this.props.user.username}</li>
        <li><b>Email:</b>{this.props.user.email}</li>
        </ul>
        </div>

    )}
}

export default User;