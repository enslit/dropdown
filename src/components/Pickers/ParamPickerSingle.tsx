import React, {FC} from 'react'
import {ParamNotation} from "./types/ParamNotation";
import ComboboxValue from "../ComboBox/base/styledComponents/ComboboxValue";
import SingleCombobox from "../ComboBox/SingleCombobox";
import {getParamLabel} from "../../utils";

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
  return (
    <SingleCombobox
      {...props}
      isWheelSelectionEnabled={true}
      rowHeight={30}
      rendererLabel={(param: ParamNotation) => getParamLabel(param)}
    >
      <ComboboxValue>{getParamLabel(props.value) || 'Выбрать параметр списка'}</ComboboxValue>
    </SingleCombobox>
  );
};

export default ParamPickerSingle;