import React, { Component } from 'react';
import '../../App.css'
import styled from 'styled-components';
import Login from '../login/LogIn';

const Overlay = styled.div`
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
`;
const LoginWrapper = styled.div`
  
   width: 40%;
`;
function Home(props) {
    return (
        
        <section className='home'> 
        
        <Overlay className='overlay'>
        <LoginWrapper >
            <Login/>
        </LoginWrapper>
        </Overlay>
        
        </section>
       
    
    )
}

export default Home