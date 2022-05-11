import React, { useState } from 'react';
import styled from 'styled-components'
// import Circle from './Circle';
import Router from './Router'

const Container = styled.div`
  background-color:${props => props.theme.bgColor};
`;

const H1 = styled.h1`
color: ${props => props.theme.textColor};
`;
function App (){
  const [value, setValue]= useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>)=>{
    // event:React.FormEvent<HTMLInputElement>
    //타입스크립트가 이 onChange 함수가 input element 에 의해서 실행된다는 것을 알게 됨 
    const {currentTarget:{value},
    } = event;
    setValue(value)
    console.log(event.currentTarget.value)
  }

  const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    console.log('hello ', value)

  }
  return (
    <Container>
      {/* <Circle bgColor="tomato" borderColor="red" text="히히"/> */}
      {/* <form onSubmit={onSubmit}>
        <input type ="text" value={value} onChange={onChange} placeholder='username' />
        <button>Log in </button>
      </form>
      <H1>테마에용</H1> */}
      <Router />
    </Container>
  )
}

export default App;