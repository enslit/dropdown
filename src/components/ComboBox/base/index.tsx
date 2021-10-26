import React, {
  ChangeEvent,
  HTMLAttributes,
  MouseEventHandler,
  useCallback,
  useState
} from "react";
import Dropdown from "./Dropdown";

import ArrowDown from "./icons/ArrowDown";
import ComboBoxContainer from "./styledComponents/ComboBoxContainer";
import ValueContainer from "./styledComponents/ValueContainer";
import ValueScrollWrapper from "./styledComponents/ValueScrollWrapper";

export type ComboBoxProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  isDisabled: boolean;
  isError: boolean;
  title: string;

  rowsCount: number;
  rowHeight: number;
  searchValue: string;

  rowRenderer: (index: number) => string | JSX.Element;
  selectAllRenderer?: () => JSX.Element | string;
  noSearchResult?: () => string | JSX.Element;

  onClose: () => void;
  onClick: MouseEventHandler<HTMLDivElement>;
  onWheelDown: (e: React.WheelEvent<HTMLDivElement>) => void;
  onWheelUp: (e: React.WheelEvent<HTMLDivElement>) => void;
  onChangeSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ComboBox = (props: ComboBoxProps): JSX.Element => {
  const {
    isOpen,
    onClick,
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
    selectAllRenderer,
    isError,
    isDisabled,
    title,
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

  return (
    <ComboBoxContainer {...restProps} ref={rootRef}>
      <ValueContainer
        isOpen={isOpen}
        isError={isError}
        isDisabled={isDisabled}
        onClick={onClick}
        onWheel={handleScroll}
      >
        <ValueScrollWrapper>
          {children}
        </ValueScrollWrapper>
        <i><ArrowDown /></i>
      </ValueContainer>
      {isOpen && valueContainerRect && (
        <Dropdown
          title={title}
          valueContainerTop={valueContainerRect.top}
          valueContainerBottom={valueContainerRect.bottom}
          valueContainerHeight={valueContainerRect.height}
          selectAllRenderer={selectAllRenderer}
          rowsCount={rowsCount}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
          onChangeSearch={onChangeSearch}
          searchValue={searchValue}
          noSearchResult={noSearchResult}
          onClose={onClose}
        />
      )}
    </ComboBoxContainer>
  );
};

export default ComboBox;
