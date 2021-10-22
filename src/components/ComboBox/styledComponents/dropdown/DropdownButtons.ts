import styled from "styled-components";

const DropdownButtons = styled.div`
  display: none;
  
  @media screen and (max-width: 1200px) {
    display: flex;
    gap: 5px;
    padding: 8px;
    
    button {
      flex-grow: 1;
      padding: 8px;
      border: none;
      background-color: #74bcf8;
      color: white;
    }
  }
`

export default DropdownButtons