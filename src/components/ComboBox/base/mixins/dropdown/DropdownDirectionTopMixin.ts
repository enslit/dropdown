import {css} from "styled-components";

const DropdownDirectionTopMixin = css<{valueContainerHeight: number}>`
  bottom: ${({ valueContainerHeight }) => valueContainerHeight / 2}px;
  padding: ${({ valueContainerHeight }) => `0 0 ${valueContainerHeight / 2}px`};
  background: ${({ valueContainerHeight }) => `linear-gradient(0, rgba(255,255,255,0) 0, rgba(255,255,255,1) ${valueContainerHeight / 2 + 5}px , rgba(255,255,255,1) 100%);`};
  box-shadow: 0 -0.5rem 0.75rem -0.1875rem rgb(0 0 0 / 28%);
  border-radius: 18px 18px 0 0;
`

export default DropdownDirectionTopMixin