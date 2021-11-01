import React, {
  ChangeEvent,
  HTMLAttributes,
  MouseEventHandler,
  useCallback, useEffect,
  useState
} from "react";
import Dropdown from "./Dropdown";

import ArrowDown from "./icons/ArrowDown";
import ComboBoxContainer from "./styledComponents/ComboBoxContainer";
import ValueContainer from "./styledComponents/ValueContainer";
import ValueScrollWrapper from "./styledComponents/ValueScrollWrapper";
import {throttle} from "lodash";

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

  const [containerInitialized, setContainerInitialized] = useState(false)
  const [valueContainerRect, setValueContainerRect] = useState<DOMRect | undefined>(undefined);
  const [valueContainerHeight, setValueContainerHeight] = useState<number>(0);
  const [ownerWindow, setOwnerWindow] = useState<Window>()
  const [resizeTrigger, setResizeTrigger] = useState<number>(0)

  const rootRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    const pos = node.getBoundingClientRect()
    setValueContainerRect(pos);

    if (!ownerWindow) setOwnerWindow(node.ownerDocument?.defaultView?.window || window)
    if (pos.height !== 0) setValueContainerHeight(pos.height)
    if (!containerInitialized) setContainerInitialized(true)
  }, [isOpen, children, resizeTrigger, containerInitialized]);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>): void => {
    if (e.deltaY > 0) {
      onWheelDown && onWheelDown(e);
    } else {
      onWheelUp && onWheelUp(e);
    }
  };

  useEffect(() => {
    let isListenerHasBeenSet = false
    if (!ownerWindow) return
    const handler = throttle(() => setResizeTrigger(prev => prev + 1), 200)

    isListenerHasBeenSet = true
    ownerWindow.addEventListener('resize', handler)

    return () => {
      if (isListenerHasBeenSet) {
        return ownerWindow.removeEventListener('resize', handler)
      }
    }
  }, [ownerWindow])

  const valueBoxElement = valueContainerRect && (
    <ValueContainer
      pos={valueContainerRect}
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
  )

  return (
    <ComboBoxContainer {...restProps} ref={rootRef}>
      {valueContainerRect && (
        <>
          {props.isOpen
            ? <div style={{ height: valueContainerHeight }} />
            : valueBoxElement
          }
          {isOpen && ownerWindow && valueBoxElement && (
            <Dropdown
              resizeTrigger={resizeTrigger}
              ownerWindow={ownerWindow}
              valueBoxElement={valueBoxElement}
              title={title}
              valueContainerRect={valueContainerRect}
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
        </>
      )}
    </ComboBoxContainer>

  );
};

export default ComboBox;
