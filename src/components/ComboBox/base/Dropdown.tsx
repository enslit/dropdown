import React, {
  ChangeEvent,
  FC,
  MouseEventHandler,
  UIEventHandler,
  useCallback,
  useEffect,
  useMemo, useRef,
  useState
} from "react";
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
import DropdownListItem from "./styledComponents/dropdown/DropdownListItem";

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

  const calcHeight = useCallback(() => (): number => {

    const listHeight = Math.max(props.rowHeight * props.rowsCount, props.rowHeight)
    const searchInputHeight = props.onChangeSearch ? 32 : 0;
    const dropdownContentHeight = listHeight + searchInputHeight;

    if (direction === 'bottom' && props.valueContainerRect.bottom + dropdownContentHeight > props.ownerWindow.innerHeight - 8) {
      return props.ownerWindow.innerHeight - props.valueContainerRect.top - 8
    } else if (direction === 'top' && dropdownContentHeight > props.valueContainerRect.top - 8) {
      return props.ownerWindow.innerHeight - (props.ownerWindow.innerHeight - props.valueContainerRect.bottom) - 8
    }

    return props.valueContainerRect.height + dropdownContentHeight;
  }, [props.rowHeight, props.rowsCount, props.onChangeSearch, props.valueContainerRect.bottom, props.valueContainerRect.top, direction, props.resizeTrigger])

  const handleClickBackdrop: MouseEventHandler<HTMLDivElement> = (event): void => {
    if ( event.target === event.currentTarget) {
      props.onClose()
    }
  }

  const handleListScroll: UIEventHandler<HTMLDivElement> = (event) => {
    setScrollTop(event.currentTarget.scrollTop)
  }

  const [dropdownHeight, setDropdownHeight] = useState<number>(calcHeight());
  const [scrollTop, setScrollTop] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTo({top: 0, behavior: 'auto'})
  }, [props.searchValue])

  const slicedOptionList = useMemo(() => {
    /* Если прокрутить выпадающий список пониже, а затем что-то ввести в строку поиска, возникает ситуация,
    когда indexStart больше indexEnd так как scroll к этому моменту еще не обновился, а высота списка уже мешьше значения scrollTop.
    Нужно пропустить вычисление когда возникает такая ситуация */
    if (Math.floor(scrollTop / props.rowHeight) > props.rowsCount) return;

    const indexStart = Math.floor(scrollTop / props.rowHeight);
    const indexEnd = Math.min(
      props.rowsCount - 1, // don't render past the end of the list
      Math.floor((scrollTop + dropdownHeight) / props.rowHeight)
    );
    const offsetSelectAllRow = !props.searchValue && props.selectAllRenderer && indexStart === 0 ? 1 : 0

    return new Array(indexEnd - indexStart + 1)
      .fill("_")
      .map((_, i) => (
        <DropdownListItem
          key={indexStart + i}
          height={props.rowHeight}
          top={(indexStart + i + offsetSelectAllRow) * props.rowHeight}
        >
          {props.rowRenderer(indexStart + i)}
        </DropdownListItem>
      ))
  }, [dropdownHeight, props, scrollTop])

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
        dropdownHeight={dropdownHeight}
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
          <div ref={listRef} onScroll={handleListScroll} style={{ overflowY: 'auto', height: '100%' }}>
            <DropdownList isSearchable={!!props.onChangeSearch} height={props.rowHeight * props.rowsCount}>
              {props.selectAllRenderer && props.selectAllRenderer()}
              {props.rowsCount > 0
                ? slicedOptionList
                : <li>{props.noSearchResult ? props.noSearchResult() : 'Ничего не найдено'}</li>
              }
            </DropdownList>
          </div>
          {direction !== 'bottom' && searchElement}
        </DropdownContent>
      </DropdownRoot>
    </>
  )

  return createPortal(el, props.ownerWindow.document.body);
};

export default Dropdown;
