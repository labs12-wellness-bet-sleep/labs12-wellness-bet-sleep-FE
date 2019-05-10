import React, { Component } from 'react';
import './home-styled.css'
import '../../App.css'
import styled from 'styled-components';
import Login from '../login/LogIn';
// import Login from '../login/LogIn';

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0 auto;
    width: 70%;
    border: 1px solid green;
`;

class  Home extends Component {
    render() {
        console.log(this.props, 'home props')
    return (
        <div className='home'>
            <div className='overlay'>
                <div className='login'>
                    <Login history={this.props.history}/>
                </div>
                
            </div>         
        </div>    
    )
}
}

export default Home