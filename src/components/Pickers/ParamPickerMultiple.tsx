import React, {FC, useCallback} from 'react'
import {ParamNotation} from "./types/ParamNotation";
import {isEqual} from "lodash";
import DropdownItem from "../ComboBox/utilsStyledComponents/DropdownItem";
import {RendererDropdownRowCallback} from "../ComboBox/types/RendererDropdownRowCallback";
import {getParamLabel} from "../../utils";
import Chip from "../ComboBox/utilsStyledComponents/Chip";
import MultipleCombobox from "../ComboBox/MultipleCombobox";
import ComboboxValue from "../ComboBox/base/styledComponents/ComboboxValue";

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
  const rendererRow = useCallback<RendererDropdownRowCallback<ParamNotation>>((list, index, isSelected) => {
    const handlerClick = () => {
      const find = props.value.findIndex(el => isEqual(el, list[index]))

      props.onChange(find !== -1
        ? [
          ...props.value.slice(0, find),
          ...props.value.slice(find + 1),
        ] : [...props.value, list[index]])
    }

    return (
      <DropdownItem onClick={handlerClick} selected={isSelected}>
        <input type="checkbox" checked={isSelected} onChange={() => {}}/>
        {getParamLabel(list[index])}
      </DropdownItem>
    );
  }, [props]);

  const rendererSelectAll = useCallback((): JSX.Element => {
    const handleSelectAll = () => {
      props.onChange(props.value.length === props.options.length
        ? []
        : [...props.options])
    }

    return (
      <DropdownItem onClick={handleSelectAll}>
        <input
          type="checkbox"
          checked={props.value.length === props.options.length}
          onChange={() => {}}
        />
        {props.value.length === props.options.length ? 'Снять' : 'Выбрать'} все
      </DropdownItem>
    )
  }, [props])

  const rendererEmptySearchResult = useCallback((): JSX.Element => {
    return <DropdownItem>Ничего не найдено</DropdownItem>
  }, [])

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