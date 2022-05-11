import { useState } from 'react';
import styled from 'styled-components';


interface ContainerProps {
    bgColor:string;
    borderColor:string,
}

const Container = styled.div<ContainerProps>`
    width:200px;
    height:200px;
    background-color:${props => props.bgColor};
    border: 5px solid ${props=>props.borderColor}
`;


interface CircleProps{
    bgColor : string,
    borderColor?:string,
    text ?: string,
}

// props 로 받는 bgColor는 CircleProps 의 object 라는 뜻 ! 
function Circle({bgColor, borderColor="white" , text}:CircleProps){
    const [counter, setCounter] = useState<number|string>(1); //counter은 string 혹은 number이라는 뜻 
    setCounter(2);
    return <Container bgColor={bgColor} borderColor={borderColor}>
        {text}
        </Container>; 
}
export default Circle;

interface playerObj{
    name: string,
    age:  number,
}

const sayHello = (playerObj:playerObj) => `Hello ${playerObj.name} you are ${playerObj.age}`;

sayHello({name:"jihye", age : 29});