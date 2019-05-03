import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './Views/UserCard.js';

function User({user}){
    return(

        <div className="user">
        
        <img src={user.profilePhoto} alt='uploaded profile photo' height='200' width='200'/>

        <ul>
        <li><b>Username :</b> {user.username}</li>
        <li><b>Email:</b>{user.email}</li>
        </ul>
        <Link to={`/newusers/${user.id}/groups`}>
        <UserCard user={user} />
        </Link>
        </div>

    )
}

export default User;