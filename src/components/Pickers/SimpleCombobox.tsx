import React, {FC} from 'react'
import SingleCombobox from "../ComboBox/SingleCombobox";
import {
  RendererSingleDropdownRowCallback
} from "../ComboBox/types/RendererSingleDropdownRowCallback";

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
  const rendererRow: RendererSingleDropdownRowCallback<string> = (options, index, isSelected, setDropdownOpen) => {
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
      isWheelSelectionEnabled={true}
      rowHeight={14}
      rendererRow={rendererRow}
      rendererLabel={rendererLabel}
      rendererEmptySearchResult={rendererEmptySearchResult}
    >
      {props.value}
    </SingleCombobox>
  );
};

export default SimpleCombobox;