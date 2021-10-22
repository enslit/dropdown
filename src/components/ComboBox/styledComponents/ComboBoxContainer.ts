import styled from "styled-components";
import {ComboBoxProps} from "../index";

type ComboBoxContainerProps = Pick<ComboBoxProps, "isOpen">;

const ComboBoxContainer = styled.div<ComboBoxContainerProps>`
  position: relative;
  color: #646464;
  font-size: 12px;
  max-width: 350px;
`;

export default ComboBoxContainer