import React, {ChangeEvent, FC, MouseEventHandler} from "react";
import ComboBox from "./index";

type Props = {
  placeholder: string
  isError: boolean
  isDisabled: boolean
  isOpen: boolean
  rowsCount: number
  rowHeight: number
  rowRenderer: (index: number) => JSX.Element | string
  onClick: MouseEventHandler<HTMLDivElement>
  onApply: () => void;
  onClose: () => void;
  selectAllRenderer: () => JSX.Element | string
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void
  searchValue: string
  noSearchResult: () => JSX.Element | string
}

const Multiple: FC<Props> = (props) => (
  <ComboBox
    isMultiple={true}
    placeholder={props.placeholder}
    isError={props.isError}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
    rowsCount={props.rowsCount}
    rowHeight={props.rowHeight}
    rowRenderer={props.rowRenderer}
    selectAllRenderer={props.selectAllRenderer}
    onClick={props.onClick}
    onChangeSearch={props.onChangeSearch}
    onApply={props.onApply}
    onClose={props.onClose}
    searchValue={props.searchValue}
    noSearchResult={props.noSearchResult}
  >
    {props.children}
  </ComboBox>
)

export default Multiple