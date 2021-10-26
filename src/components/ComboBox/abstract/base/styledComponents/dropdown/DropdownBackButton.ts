import styled from "styled-components";

const DropdownBackButton = styled.button`
  display: none;
  
  @media screen and (max-width: 1199px) {
    display: block;
    padding: 4px;
    border: none;
    background-color: #74bcf8;
    color: white;
  }
`

export default DropdownBackButton