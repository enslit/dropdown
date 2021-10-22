import styled from "styled-components";

const Content = styled.div<{size: number}>`
  height: ${({ size }) => size}%;
  display: ${({ size }) => size > 0 ? 'block' : 'none'};
  background-color: rgba(0,0,0,0.1);
  transition: height 100ms ease-in-out;
`

export default Content;