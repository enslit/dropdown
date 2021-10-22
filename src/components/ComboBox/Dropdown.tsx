import React, {ChangeEvent, FC, MouseEventHandler, useCallback, useEffect, useState} from "react";
import Search from "../../icons/Search";
import DropdownButtons from "./styledComponents/dropdown/DropdownButtons";
import DropdownBackdrop from "./styledComponents/dropdown/DropdownBackdrop";
import DropdownList from "./styledComponents/dropdown/DropdownList";
import DropdownContent from "./styledComponents/dropdown/DropdownContent";
import DropdownRoot from "./styledComponents/dropdown/DropdownRoot";
import SearchInput from "./styledComponents/dropdown/SearchInput";
import SearchRow from "./styledComponents/dropdown/SearchRow";

type Props = {
  valueContainerTop: number;
  valueContainerBottom: number;
  valueContainerHeight: number;
  isMultiple: boolean;
  rowsCount: number;
  rowHeight: number;
  rowRenderer: (index: number) => string | JSX.Element;
  selectAllRenderer: () => void;
  onChangeSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onApply: () => void;
  onClose: () => void;
  searchValue?: string;
  noSearchResult?: () => string | JSX.Element;
};

const Dropdown: FC<Props> = (props) => {
  const getDirection = useCallback(() => (): 'top' | 'bottom' => {
    if (props.valueContainerTop > window.innerHeight / 2) {
      const listHeight = props.rowHeight * props.rowsCount
      const searchInputHeight = !!props.onChangeSearch ? 32 : 0;
      const dropdownContentHeight = listHeight + searchInputHeight;

      const maxHeightToBottom = window.innerHeight - props.valueContainerTop - 8;

      if (dropdownContentHeight > maxHeightToBottom) {
        return 'top';
      }
    }

    return 'bottom';
  }, [props.valueContainerTop])
  
  const [direction, setDirection] = useState<"top" | "bottom">(getDirection());
  
  const calcHeight = useCallback(() => (): number | 'auto' => {
    const listHeight = props.rowHeight * props.rowsCount
    const searchInputHeight = !!props.onChangeSearch ? 32 : 0;
    const dropdownContentHeight = listHeight + searchInputHeight;

    if (direction === 'bottom' && props.valueContainerBottom + dropdownContentHeight > window.innerHeight - 8) {
      return window.innerHeight - props.valueContainerTop - 8
    } else if (direction === 'top' && dropdownContentHeight > props.valueContainerTop - 8) {
      return window.innerHeight - (window.innerHeight - props.valueContainerBottom) - 8
    }

    return 'auto';
  }, [props.rowHeight, props.rowsCount, props.onChangeSearch, props.valueContainerBottom, props.valueContainerTop, direction])

  const handleClickDropdown: MouseEventHandler<HTMLDivElement> = (event): void => {
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
  
  const searchElement = props.onChangeSearch && (
    <>
      <SearchRow direction={direction}>
        <Search />
        <SearchInput
          type="text"
          placeholder="Поиск"
          onChange={props.onChangeSearch}
          value={props.searchValue}
        />
      </SearchRow>
      {props.isMultiple && (
        <DropdownButtons>
          <button onClick={props.onApply}>Apply</button>
          <button onClick={props.onClose}>Cancel</button>
        </DropdownButtons>
      )}
    </>
  )

  return (
    <>
      <DropdownBackdrop onClick={handleClickDropdown} />
      <DropdownRoot
        direction={direction}
        height={dropdownHeight}
        valueContainerHeight={props.valueContainerHeight}
      >
        <DropdownContent>
          {direction === 'bottom' && searchElement}
          <DropdownList isSearchable={!!props.onChangeSearch}>
            {props.isMultiple && props.selectAllRenderer()}
            {props.rowsCount > 0
              ? new Array(props.rowsCount).fill("_").map((_, i) => <li key={i}>{props.rowRenderer(i)}</li>)
              : <li>{props.noSearchResult ? props.noSearchResult() : 'Ничего не найдено'}</li>
            }
          </DropdownList>
          {direction !== 'bottom' && searchElement}
        </DropdownContent>
      </DropdownRoot>
    </>
  );
};

export default Dropdown;
