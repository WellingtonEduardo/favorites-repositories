import styled, { keyframes } from 'styled-components';

import { FormProps } from '../../types/interfaces';



export const Container = styled.div`
max-width: 700px;
background: #FFF;
border-radius: 4px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
padding: 30px;
margin: 80px auto;

h1{
font-size: 20px;
display: flex;
flex-direction: row;
align-items: center;

svg{
  margin-right: 10px;
}
}

`;



export const Form = styled.form<FormProps>`
margin-top: 30px;
display: flex;
flex-direction: row;

input{
 flex: 1;
 border: 1px solid ${props => props.$alert ? 'red' : '#DDD'};
 padding: 10px 15px;
 border-radius: 4px;
 font-size: 17px;
}
`;



const animateSpinnerLoading = keyframes`
from{
	transform: rotate(0deg);
}
to{
	transform: rotate(360deg);
}
`;

export const SubmitButton = styled.button`
background: #0D2636;
border: none;
border-radius: 4px;
margin-left: 10px;
padding: 0 15px;
display: flex;
align-items: center;
justify-content: center;

&[disabled]{
  cursor: not-allowed;
	opacity: 0.5;

	svg{
		animation: ${animateSpinnerLoading} 2s linear infinite ;
	} 
}



`;


export const List = styled.ul`
list-style: none;
margin-top: 20px;

li{
	padding: 15px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

 & + li{
	border-top: 1px solid #DDD;
 }


  a{
	 color: #0D2636;
	}

}



`;



export const DeleteButton = styled.button`
background: transparent;
color: #0D2636;
border: none;
padding: 8px;
outline: none;
border-radius: 4px;

`;