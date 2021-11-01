import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import ComboBox from "./base";
import {RendererSingleDropdownRowCallback} from "./types/RendererSingleDropdownRowCallback";
import {defaultDropdownNoSearchResultRenderer, defaultRendererSingleDropdownRow} from "./base/utils/callbacks";

type Props<T> = {
  initialOpen: boolean
  isError: boolean
  isDisabled: boolean
  isWheelSelectionEnabled: boolean
  title: string
  rowHeight: number

  options: T[]
  value: T | null
  onChange: (value: T) => void

  rendererLabel: (value: T) => string
  rendererRow?: RendererSingleDropdownRowCallback<T>
  rendererEmptySearchResult?: () => JSX.Element | string

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

    return props.rendererRow
      ? props.rendererRow(filteredList, index, isSelected, setDropdownOpen)
      : defaultRendererSingleDropdownRow<OptionType>(props.onChange, props.rendererLabel)(filteredList, index, isSelected, setDropdownOpen)
  }, [filteredList, props]);

  const handleClose = useCallback((): void => {
    setDropdownOpen(false)
  }, [])

  const handleWheelDown = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (!props.isWheelSelectionEnabled) return

    const idx = props.options.findIndex((el) => el === props.value)

    if (idx < props.options.length - 1) {
      props.onChange(props.options[idx + 1])
    }
  }, [props]);

  const handleWheelUp = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (!props.isWheelSelectionEnabled) return

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
      rowHeight={props.rowHeight}
      rowRenderer={rowRenderer}
      onWheelDown={handleWheelDown}
      onWheelUp={handleWheelUp}
      onChangeSearch={handleSearch}
      onClose={handleClose}
      searchValue={searchValue}
      noSearchResult={props.rendererEmptySearchResult || defaultDropdownNoSearchResultRenderer}
    >
      {props.children}
    </ComboBox>
  )
}

export default SingleCombobox