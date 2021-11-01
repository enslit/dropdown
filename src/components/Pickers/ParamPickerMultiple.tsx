import React, {FC, useCallback} from 'react'
import {ParamNotation} from "./types/ParamNotation";
import {getParamLabel} from "../../utils";
import Chip from "../ComboBox/utilsStyledComponents/Chip";
import MultipleCombobox from "../ComboBox/MultipleCombobox";
import ComboboxValue from "../ComboBox/base/styledComponents/ComboboxValue";
import {RendererMultipleDropdownRowCallback} from "../ComboBox/types/RendererMultipleDropdownRowCallback";
import {
  defaultDropdownNoSearchResultRenderer,
  defaultRendererMultipleDropdownRow,
  defaultRendererSelectAll
} from "../ComboBox/base/utils/callbacks";

type Props = {
  initialOpen: boolean
  isError: boolean
  isDisabled: boolean

  value: ParamNotation[]
  options: ParamNotation[]
  onChange: (param: ParamNotation[]) => void

  title: string
  className?: string
}

const ParamPickerMultiple: FC<Props> = (props) => {
  const rendererRow = useCallback<RendererMultipleDropdownRowCallback<ParamNotation>>(
    defaultRendererMultipleDropdownRow<ParamNotation>(props.onChange, getParamLabel),
    [props.onChange])

  const rendererSelectAll = useCallback(() => {
    const handleSelectAll = (selectedAll: boolean) => {
      const value = selectedAll ? [] : [...props.options];
      props.onChange(value)
    }
    
    return defaultRendererSelectAll(handleSelectAll, props.value.length, props.options.length)
  }, [props])

  const rendererEmptySearchResult = useCallback(defaultDropdownNoSearchResultRenderer, [])

  const handleClickChip = useCallback((index: number) => (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    props.onChange(props.value.filter((_, idx) => index !== idx))
  }, [props])
  
  return (
    <MultipleCombobox
      {...props}
      rowHeight={30}
      rendererLabel={(param: ParamNotation) => getParamLabel(param)}
      rendererRow={rendererRow}
      rendererEmptySearchResult={rendererEmptySearchResult}
      rendererSelectAll={rendererSelectAll}
    >
      <ComboboxValue overridePadding={!!props.value.length ? '3px 16px 3px 0px' : ''}>
        {props.value.length > 0
          ? (
            <>
              ({props.value.length})
              {props.value.map((value, i): JSX.Element => (
                <Chip key={value.parameterId} onClick={handleClickChip(i)}>
                  {getParamLabel(value)}
                </Chip>
              ))}
            </>
          ) : 'Выбрать из списка'
        }
      </ComboboxValue>
    </MultipleCombobox>
  );
};

export default ParamPickerMultiple;