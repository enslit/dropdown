import React, {FC, useCallback} from 'react'
import {ParamNotation} from "./types/ParamNotation";
import ComboboxValue from "../ComboBox/base/styledComponents/ComboboxValue";
import SingleCombobox from "../ComboBox/SingleCombobox";
import {getParamLabel} from "../../utils";
import DropdownItem from "./styledComponents/DropdownItem";
import {RendererDropdownRowCallback} from "../ComboBox/types/RendererDropdownRowCallback";

type Props = {
  initialOpen: boolean
  isError: boolean
  isDisabled: boolean

  value: ParamNotation
  options: ParamNotation[]
  onChange: (param: ParamNotation) => void

  title: string
  className?: string
}

const ParamPickerSingle: FC<Props> = (props) => {
  const rowRenderer = useCallback<RendererDropdownRowCallback<ParamNotation>>((options, index, isSelected, setDropdownOpen) => {
    const handleSelect = (): void => {
      props.onChange(options[index])
      setDropdownOpen(false);
    };

    return (
      <DropdownItem onClick={handleSelect} selected={isSelected}>
        {getParamLabel(options[index])}
      </DropdownItem>
    );
  }, [props]);

  const noSearchResultRenderer = useCallback((): JSX.Element => {
    return <DropdownItem>Ничего не найдено</DropdownItem>
  }, [])

  return (
    <SingleCombobox
      {...props}
      rowHeight={30}
      rendererLabel={(param: ParamNotation) => getParamLabel(param)}
      rendererRow={rowRenderer}
      rendererEmptySearchResult={noSearchResultRenderer}
    >
      <ComboboxValue>{getParamLabel(props.value) || 'Выбрать параметр списка'}</ComboboxValue>
    </SingleCombobox>
  );
};

export default ParamPickerSingle;