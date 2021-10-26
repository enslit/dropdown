import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import ComboBox from "./base";
import {RendererDropdownRowCallback} from "./types/RendererDropdownRowCallback";

type Props<T> = {
  initialOpen: boolean
  isError: boolean
  isDisabled: boolean
  title: string

  options: T[]
  value: T
  onChange: (value: T) => void

  rendererRow: RendererDropdownRowCallback<T>
  rendererLabel: (value: T) => string
  rendererEmptySearchResult: () => JSX.Element | string

  children: JSX.Element | string
  className?: string
}


function SingleCombobox<OptionType>(props: Props<OptionType>): JSX.Element {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(props.initialOpen || false);
  const [filteredList, setFilteredList] = useState<OptionType[]>(props.options);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleClick = useCallback(() => {
    setDropdownOpen(prev => !prev)
  }, [])

  const rowRenderer = useCallback((index: number): JSX.Element | string => {
    const isSelected: boolean = filteredList[index] === props.value

    return props.rendererRow(filteredList, index, isSelected, setDropdownOpen)
  }, [filteredList, props]);

  const handleClose = useCallback((): void => {
    setDropdownOpen(false)
  }, [])

  const handleWheelDown = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const idx = props.options.findIndex((el) => el === props.value)

    if (idx < props.options.length - 1) {
      props.onChange(props.options[idx + 1])
    }
  }, [props]);

  const handleWheelUp = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const idx = props.options.findIndex((el) => el === props.value)

    if (idx > 0) {
      props.onChange(props.options[idx - 1])
    }
  }, [props]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  }, [])

  useEffect(() => {
    setFilteredList(props.options.filter(el => props.rendererLabel(el).toLowerCase().includes(searchValue.toLowerCase())))
  }, [props.options, searchValue]);

  useEffect(() => {
    if (!isDropdownOpen) {
      setSearchValue('');
    }
  }, [isDropdownOpen]);

  return (
    <ComboBox
      title={props.title}
      className={props.className}
      isOpen={isDropdownOpen}
      onClick={handleClick}
      isError={props.isError}
      isDisabled={props.isDisabled}
      rowsCount={filteredList.length}
      rowHeight={30}
      rowRenderer={rowRenderer}
      onWheelDown={handleWheelDown}
      onWheelUp={handleWheelUp}
      onChangeSearch={handleSearch}
      onClose={handleClose}
      searchValue={searchValue}
      noSearchResult={props.rendererEmptySearchResult}
    >
      {props.children}
    </ComboBox>
  )
}

export default SingleCombobox