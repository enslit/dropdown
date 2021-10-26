import styled from "styled-components";

const DropdownHeader = styled.div`
  display: none;

  @media screen and (max-width: 1199px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    gap: 15px;
  }

  @media screen and (max-width: 767px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`

export default DropdownHeader