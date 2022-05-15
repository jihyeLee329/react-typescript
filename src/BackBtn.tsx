import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const BackButton = styled.button`
    color:${(props) => props.theme.accentColor};
    font-size:50px;
`;

export default function BackBtn (){
    const navigate= useNavigate();
    function backClick(e:any){
        console.log(e)
        e.preventDefault();
        navigate(-1);
    }
    
    return(
        <BackButton onClick={backClick}>&larr;</BackButton>
    );

}