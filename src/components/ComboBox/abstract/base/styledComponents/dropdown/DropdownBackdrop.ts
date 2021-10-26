import styled from "styled-components";

const DropdownBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  z-index: 100;

  @media screen and (max-width: 1199px) {
    background-color: rgba(0,0,0,.5);
  }
`

export default DropdownBackdrop