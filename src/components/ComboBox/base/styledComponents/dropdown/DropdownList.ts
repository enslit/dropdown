import styled from "styled-components";
import {HTMLAttributes} from "react";

const DropdownList = styled.ul<{ isSearchable: boolean, height: number } & HTMLAttributes<HTMLUListElement>>`
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;
  height: ${({ isSearchable, height }) => isSearchable ? `calc(${height}px - 32px)` : `${height}px`};
`;

export default DropdownList