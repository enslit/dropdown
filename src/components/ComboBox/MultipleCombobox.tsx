import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import ComboBox from "./base";
import {RendererMultipleDropdownRowParams} from "./types/RendererMultipleDropdownRowParams";
import {RendererMultipleDropdownRowCallback} from "./types/RendererMultipleDropdownRowCallback";

type Props<T> = {
  initialOpen: boolean
  isError: boolean
  isDisabled: boolean
  title: string
  rowHeight: number

  value: T[]
  options: T[]
  onChange: (value: T[]) => void

  rendererRow: RendererMultipleDropdownRowCallback<T>
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

    const params: RendererMultipleDropdownRowParams<OptionType> = {
      currentValue: props.value,
      filteredOptions: filteredList,
      index,
      isSelected,
      setDropdownOpen,
    }

    return props.rendererRow(params)
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
      rowHeight={props.rowHeight}
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