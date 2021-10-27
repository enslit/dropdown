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
  const [owner, setOwner] = useState<Document>()
  const [resizeTrigger, setResizeTrigger] = useState<number>(0)

  const rootRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    const pos = node.getBoundingClientRect()
    setValueContainerRect(pos);

    if (!owner) setOwner(node.ownerDocument)
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
    if (!owner || !owner.defaultView) return
    const handler = throttle(() => setResizeTrigger(prev => prev + 1), 200)

    isListenerHasBeenSet = true
    owner.defaultView.window.addEventListener('resize', handler)

    return () => {
      if (isListenerHasBeenSet && owner.defaultView) {
        return owner.defaultView.window.removeEventListener('resize', handler)
      }
    }
  }, [owner])

  const value = valueContainerRect && (
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
            ? <div style={{ height: valueContainerHeight, width: valueContainerRect.width }} />
            : value
          }
          {isOpen && owner && value && (
            <Dropdown
              resizeTrigger={resizeTrigger}
              owner={owner}
              value={value}
              title={title}
              valueContainerLeft={valueContainerRect.left}
              valueContainerTop={valueContainerRect.top}
              valueContainerBottom={valueContainerRect.top + valueContainerHeight}
              valueContainerHeight={valueContainerHeight}
              valueContainerWidth={valueContainerRect.width}
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
