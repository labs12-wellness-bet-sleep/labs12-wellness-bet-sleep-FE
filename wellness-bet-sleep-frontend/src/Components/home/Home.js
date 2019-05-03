import React, { Component } from 'react';
import '../../App.css'
import styled from 'styled-components';
import Login from '../login/LogIn';

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0 auto;
    width: 70%;
    /* border: 1px solid green; */
`;

function Home(props) {
    return (
        <div className='home'>
            <div className='overlay'>
                <LoginWrapper>
                    <Login/>
                </LoginWrapper>
                
            </div>         
        </div>
        
    
    )
}

export default Home