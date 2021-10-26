import {css} from "styled-components";

const DefaultBoxStateMixin = css`
  cursor: pointer;

  & svg {
    fill: #787878;
    stroke: #787878;
  }

  :hover {
    background-color: #74bcf8;
    box-shadow: 0 0 1.125rem 0.125rem #90caf9;
    color: white;

    & svg {
      fill: white;
      stroke: white;
    }
  }
`;

export default DefaultBoxStateMixin