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
  onWheelDown: (e: React.WheelEvent<HTMLDivElement>) => void
  onWheelUp: (e: React.WheelEvent<HTMLDivElement>) => void
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void
  onClose: () => void;
  searchValue: string
  noSearchResult: () => JSX.Element | string
}

const Single: FC<Props> = (props) => (
  <ComboBox
    placeholder={props.placeholder}
    isError={props.isError}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
    isMultiple={false}
    rowsCount={props.rowsCount}
    rowHeight={props.rowHeight}
    rowRenderer={props.rowRenderer}
    onClick={props.onClick}
    onWheelDown={props.onWheelDown}
    onWheelUp={props.onWheelUp}
    onChangeSearch={props.onChangeSearch}
    onClose={props.onClose}
    searchValue={props.searchValue}
    noSearchResult={props.noSearchResult}
  >
    {props.children}
  </ComboBox>
)

export default Single