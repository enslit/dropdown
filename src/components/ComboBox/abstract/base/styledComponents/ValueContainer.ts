import styled from "styled-components";
import {ComboBoxProps} from "../index";
import DisabledBoxStateMixin from "../mixins/DisabledBoxStateMixin";
import DefaultBoxStateMixin from "../mixins/DefaultBoxStateMixin";
import ErrorBoxStateMixin from "../mixins/ErrorBoxStateMixin";

type ComboBoxValueContainerProps = Pick<ComboBoxProps, "isDisabled" | "isError"> & {isOpen: boolean};

const ValueContainer = styled.div<ComboBoxValueContainerProps>`
  box-shadow: 0.0625rem 0.0625rem 0.75rem -0.1875rem rgb(0 0 0 / 28%);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-right: 16px;
  border-radius: 20px;
  position: relative;
  transition: background-color 200ms ease-in-out, border 200ms ease-in-out, color 200ms ease-in-out;
  border: 1px solid transparent;
  z-index: ${({ isOpen }) => isOpen ? 102 : 1};

  @media screen and (max-width: 1199px) {
    z-index: 1;
  }

  & svg {
    transition: all 200ms ease-in-out;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'none'};
  }
  
  ${({ isDisabled }) => isDisabled ? DisabledBoxStateMixin : DefaultBoxStateMixin};
  ${({ isError }) => isError && ErrorBoxStateMixin};
`;

export default ValueContainer