import styled, {css} from "styled-components";

const HighlightMixin = css`
  background-color: #74bcf8;
  color: white;
`;

const DropdownItem = styled.div<{ selected?: boolean }>`
  padding: 8px 16px;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  box-sizing: border-box;

  ${({ selected }) => selected && HighlightMixin}

  :hover {
    ${HighlightMixin}
  }
`;

export default DropdownItem