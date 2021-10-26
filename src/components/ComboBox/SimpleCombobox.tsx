import React, {FC} from 'react'
import SingleCombobox from "./abstract/SingleCombobox";
import {RendererDropdownRowCallback} from "./abstract/types/RendererDropdownRowCallback";

type Props = {
  initialOpen: boolean
  isError: boolean
  isDisabled: boolean

  value: string
  options: string[]
  onChange: (param: string) => void

  title: string
  className?: string
}

const SimpleCombobox: FC<Props> = (props) => {
  const rendererRow: RendererDropdownRowCallback<string> = (options, index, isSelected, setDropdownOpen) => {
    return (
      <div
        style={{ color: isSelected ? 'red' : 'black' }}
        onClick={() => {
          props.onChange(options[index])
          setDropdownOpen(false)
        }}
      >
        {options[index]}
      </div>
    )
  }
  const rendererLabel = (value: string) => value
  const rendererEmptySearchResult = () => 'Ничего не найдено'

  return (
    <SingleCombobox
      {...props}
      rendererRow={rendererRow}
      rendererLabel={rendererLabel}
      rendererEmptySearchResult={rendererEmptySearchResult}
    >
      {props.value}
    </SingleCombobox>
  );
};

export default SimpleCombobox;