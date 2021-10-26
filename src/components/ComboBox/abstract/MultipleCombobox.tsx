import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import ComboBox from "./base";
import {RendererDropdownRowCallback} from "./types/RendererDropdownRowCallback";

type Props<T> = {
  initialOpen: boolean
  isError: boolean
  isDisabled: boolean
  title: string

  value: T[]
  options: T[]
  onChange: (value: T[]) => void

  rendererRow: RendererDropdownRowCallback<T>
  rendererLabel: (value: T) => string
  rendererEmptySearchResult: () => JSX.Element | string
  rendererSelectAll: () => JSX.Element

  children: JSX.Element | string
  className?: string
}

function MultipleCombobox<OptionType>(props: Props<OptionType>) {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(props.initialOpen || false);
  const [filteredList, setFilteredList] = useState<OptionType[]>(props.options);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleClick = useCallback(() => {
    setDropdownOpen(prev => !prev)
  }, [])

  const rowRenderer = useCallback((index: number): JSX.Element | string => {
    const isSelected: boolean = props.value.includes(filteredList[index])

    return props.rendererRow(filteredList, index, isSelected, setDropdownOpen)
  }, [filteredList, props]);

  const handleClose = useCallback(() => {
    setDropdownOpen(false)
  }, [])

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  }, [])

  useEffect(() => {
    setFilteredList(props.options.filter(el =>
      props.rendererLabel(el)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ))
  }, [props.options, searchValue]);

  useEffect(() => {
    if (isDropdownOpen) {
      setSearchValue('')
    }
  }, [isDropdownOpen]);

  return (
    <ComboBox
      title={props.title}
      className={props.className}
      isError={props.isError}
      isDisabled={props.isDisabled}
      isOpen={isDropdownOpen}
      rowsCount={filteredList.length}
      rowHeight={30}
      rowRenderer={rowRenderer}
      selectAllRenderer={searchValue ? () => '' : props.rendererSelectAll}
      onClick={handleClick}
      onChangeSearch={handleSearch}
      onClose={handleClose}
      searchValue={searchValue}
      noSearchResult={props.rendererEmptySearchResult}
      onWheelDown={() => {}}
      onWheelUp={() => {}}
    >
      {props.children}
    </ComboBox>
  )

}

export default MultipleCombobox