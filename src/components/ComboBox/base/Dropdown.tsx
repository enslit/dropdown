import React, {ChangeEvent, FC, MouseEventHandler, useCallback, useEffect, useState} from "react";
import Search from "./icons/Search";
import DropdownBackdrop from "./styledComponents/dropdown/DropdownBackdrop";
import DropdownList from "./styledComponents/dropdown/DropdownList";
import DropdownContent from "./styledComponents/dropdown/DropdownContent";
import DropdownRoot from "./styledComponents/dropdown/DropdownRoot";
import SearchInput from "./styledComponents/dropdown/SearchInput";
import SearchRow from "./styledComponents/dropdown/SearchRow";
import DropdownHeader from "./styledComponents/dropdown/DropdownHeader";
import DropdownTitle from "./styledComponents/dropdown/DropdownTitle";
import DropdownBackButton from "./styledComponents/dropdown/DropdownBackButton";
import {createPortal} from "react-dom";

type Props = {
  resizeTrigger: number;
  ownerWindow: Window;
  valueBoxElement: JSX.Element;
  valueContainerRect: DOMRect;
  rowsCount: number;
  rowHeight: number;
  rowRenderer: (index: number) => string | JSX.Element;
  selectAllRenderer?: () => void;
  onChangeSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  searchValue?: string;
  noSearchResult?: () => string | JSX.Element;
  title: string
};

const Dropdown: FC<Props> = (props) => {
  const getDirection = useCallback(() => (): 'top' | 'bottom' => {
    if (props.valueContainerRect.top > window.innerHeight / 2) {
      const listHeight = props.rowHeight * props.rowsCount
      const searchInputHeight = !!props.onChangeSearch ? 32 : 0;
      const dropdownContentHeight = listHeight + searchInputHeight;

      const maxHeightToBottom = window.innerHeight - props.valueContainerRect.top - 8;

      if (dropdownContentHeight > maxHeightToBottom) {
        return 'top';
      }
    }

    return 'bottom';
  }, [props.valueContainerRect.top])
  
  const [direction, setDirection] = useState<"top" | "bottom">(getDirection());

  const calcHeight = useCallback(() => (): number | 'auto' => {

    const listHeight = props.rowHeight * props.rowsCount
    const searchInputHeight = props.onChangeSearch ? 32 : 0;
    const dropdownContentHeight = listHeight + searchInputHeight;

    if (direction === 'bottom' && props.valueContainerRect.bottom + dropdownContentHeight > props.ownerWindow.innerHeight - 8) {
      return props.ownerWindow.innerHeight - props.valueContainerRect.top - 8
    } else if (direction === 'top' && dropdownContentHeight > props.valueContainerRect.top - 8) {
      return props.ownerWindow.innerHeight - (props.ownerWindow.innerHeight - props.valueContainerRect.bottom) - 8
    }

    return 'auto';
  }, [props.rowHeight, props.rowsCount, props.onChangeSearch, props.valueContainerRect.bottom, props.valueContainerRect.top, direction, props.resizeTrigger])

  const handleClickBackdrop: MouseEventHandler<HTMLDivElement> = (event): void => {
    if ( event.target === event.currentTarget) {
      props.onClose()
    }
  }

  const [dropdownHeight, setDropdownHeight] = useState<number | "auto">(calcHeight());

  useEffect(() => {
    setDirection(getDirection())
  }, [getDirection])

  useEffect(() => {
    setDropdownHeight(calcHeight())
  }, [calcHeight])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.key === 'Escape' && props.onClose()
    }

    props.ownerWindow.addEventListener('keydown', handler)
    return () => {
      props.ownerWindow.removeEventListener('keydown', handler)
    };
  }, []);

  
  const searchElement = (
    <SearchRow direction={direction}>
      <Search />
      <SearchInput
        type="text"
        placeholder="Поиск"
        onChange={props.onChangeSearch}
        value={props.searchValue}
      />
    </SearchRow>
  )

  const el = (
    <>
      <DropdownBackdrop onClick={handleClickBackdrop} />
      {props.valueBoxElement}
      <DropdownRoot
        innerHeight={props.ownerWindow.innerHeight}
        direction={direction}
        height={dropdownHeight}
        width={props.valueContainerRect.width}
        top={props.valueContainerRect.top}
        left={props.valueContainerRect.left}
        valueContainerHeight={props.valueContainerRect.height}
      >
        <DropdownContent>
          <DropdownHeader>
            <DropdownBackButton onClick={() => props.onClose()}>Back</DropdownBackButton>
            <DropdownTitle>{props.title}</DropdownTitle>
          </DropdownHeader>
          {direction === 'bottom' && searchElement}
          <DropdownList isSearchable={!!props.onChangeSearch}>
            {props.selectAllRenderer && props.selectAllRenderer()}
            {props.rowsCount > 0
              ? new Array(props.rowsCount).fill("_").map((_, i) => <li key={i}>{props.rowRenderer(i)}</li>)
              : <li>{props.noSearchResult ? props.noSearchResult() : 'Ничего не найдено'}</li>
            }
          </DropdownList>
          {direction !== 'bottom' && searchElement}
        </DropdownContent>
      </DropdownRoot>
    </>
  )

  return createPortal(el, props.ownerWindow.document.body);
};

export default Dropdown;
