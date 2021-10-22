import styled from "styled-components";
import {HTMLAttributes} from "react";

const DropdownList = styled.ul<{ isSearchable: boolean } & HTMLAttributes<HTMLUListElement>>`
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow-y: auto;
  height: ${({ isSearchable }) => isSearchable ? 'calc(100% - 32px)' : '100%'};
`;

export default DropdownList