import styled from "styled-components";

const DropdownListItem = styled.li<{ top: number, height: number }>`
  position: absolute;
  height: ${({ height }) => height}px;
  top: ${({ top }) => top}px;
  width: 100%;
  
  & > * {
    height: 100%;
  }
`

export default DropdownListItem;