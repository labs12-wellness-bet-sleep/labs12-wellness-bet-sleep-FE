import React, { Component } from 'react';

function User(props){
    return(

        <div className="user">
        
        <img src={props.user.profilePhoto} alt='uploaded profile photo' height='200' width='200'/>

        <ul>
        <li><b>Username :</b> {props.user.username}</li>
        <li><b>Email:</b>{props.user.email}</li>
        </ul>
        </div>

    )
}

export default User;