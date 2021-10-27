import styled from "styled-components";
import {HTMLAttributes} from "react";
import DropdownDirectionTopMixin from "../../mixins/dropdown/DropdownDirectionTopMixin";
import DropdownDirectionBottomMixin from "../../mixins/dropdown/DropdownDirectionBottomMixin";
import DropdownRootTabletMixin from "../../mixins/dropdown/DropdownRootTabletMixin";
import DropdownRootMobileMixin from "../../mixins/dropdown/DropdownRootMobileMixin";

type DropdownRootProps = HTMLAttributes<HTMLDivElement> & {
  valueContainerHeight: number;
  direction: "top" | "bottom";
  innerHeight: number
  height: number | "auto";
  top: number;
  left: number;
  width: number;
};

const DropdownRoot = styled.div<DropdownRootProps>`
  font-size: 12px;
  color: #646464;
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  z-index: 2;
  height: ${({ height, valueContainerHeight }) => (height === "auto" ? 'auto' : height - (valueContainerHeight / 2) + "px")};
  transition: height 200ms ease-in-out;
  
  @media screen and (min-width: 1199px) {
    ${({ direction }) => direction === 'top' ? DropdownDirectionTopMixin : DropdownDirectionBottomMixin};
  }

  @media screen and (max-width: 1199px) and (min-width: 768px) {
    ${DropdownRootTabletMixin};
  }

  @media screen and (max-width: 767px) {
    ${DropdownRootMobileMixin};
  }
`;

export default DropdownRoot