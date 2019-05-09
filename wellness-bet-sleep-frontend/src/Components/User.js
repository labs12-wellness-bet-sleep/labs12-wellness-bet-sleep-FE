import React, { Component } from 'react';

function User(props){
    return(

        <div className="user">
        
        <img src={props.user.photoUrl} alt='Profile'/>

        <ul>
        <li><b>Username :</b> {props.user.username}</li>
        <li><b>Email:</b>{props.user.email}</li>
        </ul>
        </div>

    )
}

export default User;