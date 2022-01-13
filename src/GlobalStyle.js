import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{
  margin:0px;
  padding: 0px;
  box-sizing: border-box;
}
html,body{
  margin:0px;
  padding: 0px;
  background-color: #212227;
  font-family: 'Rubik', sans-serif;
}
`;

export default GlobalStyle;