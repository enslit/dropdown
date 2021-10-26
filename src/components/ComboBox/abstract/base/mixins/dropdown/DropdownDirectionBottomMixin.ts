import {css} from "styled-components";

const DropdownDirectionBottomMixin = css<{valueContainerHeight: number}>`
  top: ${({ valueContainerHeight }) => valueContainerHeight / 2}px;
  padding: ${({ valueContainerHeight }) => `${valueContainerHeight / 2}px 0 0`};
  background: ${({ valueContainerHeight }) => `linear-gradient(180deg, rgba(255,255,255,0) 0, rgba(255,255,255,1) ${valueContainerHeight / 2 + 5}px , rgba(255,255,255,1) 100%);`};
  box-shadow: 0 0.5rem 0.75rem -0.1875rem rgb(0 0 0 / 28%);
  border-radius: 0 0 18px 18px;
`

export default DropdownDirectionBottomMixin