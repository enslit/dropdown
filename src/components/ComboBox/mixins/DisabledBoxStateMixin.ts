import {css} from "styled-components";

const DisabledBoxStateMixin = css`
  pointer-events: none;
  color: gray;
  opacity: 0.6;

  & svg {
    fill: gray;
    stroke: gray;
  }
`;

export default DisabledBoxStateMixin