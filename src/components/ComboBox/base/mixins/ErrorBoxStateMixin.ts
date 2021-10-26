import {css} from "styled-components";

const ErrorBoxStateMixin = css`
  border: 1px solid red;
  color: red;

  & svg {
    transition: all 200ms ease-in-out;
    fill: red;
    stroke: red;
  }

  :hover {
    background-color: #74bcf8;
    color: red;

    & svg {
      fill: red;
      stroke: red;
    }
  }
`;

export default ErrorBoxStateMixin