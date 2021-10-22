import React, {
  ChangeEvent,
  HTMLAttributes,
  MouseEventHandler,
  useCallback,
  useState
} from "react";
import Dropdown from "./Dropdown";

import ArrowDown from "../../icons/ArrowDown";
import ComboBoxContainer from "./styledComponents/ComboBoxContainer";
import ValueContainer from "./styledComponents/ValueContainer";
import ValueScrollWrapper from "./styledComponents/ValueScrollWrapper";
import Value from "./styledComponents/Value";

export type ComboBoxProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  isDisabled?: boolean;
  isMultiple?: boolean;
  isError?: boolean;

  placeholder: string;

  rowsCount: number;
  rowHeight: number;
  searchValue?: string;

  rowRenderer: (index: number) => string | JSX.Element;
  selectAllRenderer?: () => JSX.Element | string;
  noSearchResult?: () => string | JSX.Element;

  onApply?: () => void;
  onClose: () => void;
  onClick: MouseEventHandler<HTMLDivElement>;
  onWheelDown?: (e: React.WheelEvent<HTMLDivElement>) => void;
  onWheelUp?: (e: React.WheelEvent<HTMLDivElement>) => void;
  onChangeSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ComboBox = (props: ComboBoxProps): JSX.Element => {
  const {
    isOpen,
    onClick,
    placeholder,
    rowsCount,
    rowRenderer,
    children,
    onWheelUp,
    onWheelDown,
    onChangeSearch,
    searchValue,
    noSearchResult,
    rowHeight,
    onClose,
    onApply = () => {},
    selectAllRenderer = () => '',
    isError = false,
    isMultiple = false,
    isDisabled = false,
    ...restProps
  } = props;

  const [valueContainerRect, setValueContainerRect] = useState<DOMRect | undefined>(undefined);
  const rootRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setValueContainerRect(node.getBoundingClientRect());
  }, [isOpen, children]);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>): void => {
    if (e.deltaY > 0) {
      onWheelDown && onWheelDown(e);
    } else {
      onWheelUp && onWheelUp(e);
    }
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!isDisabled) {
      onClick(event);
    }
  };

  return (
    <ComboBoxContainer {...restProps} isOpen={isOpen} ref={rootRef}>
      <ValueContainer
        isOpen={isOpen}
        isError={isError}
        isMultiple={isMultiple}
        isDisabled={isDisabled}
        onClick={handleClick}
        onWheel={handleScroll}
      >
        <ValueScrollWrapper>
          <Value>{!children || (Array.isArray(children) && children.length === 0) ? placeholder : children}</Value>
        </ValueScrollWrapper>
        <i><ArrowDown /></i>
      </ValueContainer>
      {isOpen && valueContainerRect && (
        <Dropdown
          valueContainerTop={valueContainerRect.top}
          valueContainerBottom={valueContainerRect.bottom}
          valueContainerHeight={valueContainerRect.height}
          isMultiple={isMultiple}
          selectAllRenderer={selectAllRenderer}
          rowsCount={rowsCount}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
          onChangeSearch={onChangeSearch}
          searchValue={searchValue}
          noSearchResult={noSearchResult}
          onApply={onApply}
          onClose={onClose}
        />
      )}
    </ComboBoxContainer>
  );
};

export default ComboBox;
