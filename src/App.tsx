import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import Router from './Router'
import {ReactQueryDevtools} from 'react-query/devtools'
import { HelmetProvider } from "react-helmet-async";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
font-family: 'Source Sans Pro', sans-serif;
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{box-sizing: border-box;}
body{ 
  font-family : 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
}
a {text-decoration: none; 
  color:inherit;
}
`;


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
 /* <Circle bgColor="tomato" borderColor="red" text="히히"/> */
      /* <form onSubmit={onSubmit}>
        <input type ="text" value={value} onChange={onChange} placeholder='username' />
        <button>Log in </button>
      </form>
      <H1>테마에용</H1> */



  return (
    <>
    <GlobalStyle />
    <HelmetProvider>
      <Router />
    </HelmetProvider>
    <ReactQueryDevtools initialIsOpen={true}/>
    </>
  )
}

export default App;