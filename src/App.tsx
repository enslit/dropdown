import React, {useEffect, useMemo, useState} from "react";
import {generateData, generateObjectData, randomInRange} from "./utils";
import {ParamNotation} from "./components/Pickers/types/ParamNotation";
import ParamPickerSingle from "./components/Pickers/ParamPickerSingle";
import ParamPickerMultiple from "./components/Pickers/ParamPickerMultiple";
import SimpleCombobox from "./components/Pickers/SimpleCombobox";

export default function App() {
  const stringOptions = useMemo<string[]>(() => generateData(randomInRange(10, 50)), []);
  const options = useMemo<ParamNotation[]>(() => generateObjectData(randomInRange(10, 50)), []);

  const [paramSingleValue, setParamSingleValue] = useState<ParamNotation>(options[0])
  const [multipleValue, setMultipleValue] = useState<ParamNotation[]>([])
  const [simpleValue, setSimpleValue] = useState<string>(stringOptions[0])

  useEffect(() => {
    setParamSingleValue(options[0])
    setMultipleValue([])
  }, [options]);

  return (
    <div className={'app'}>
      <h2>Param picker single</h2>
      <ParamPickerSingle
        title={'Param picker single'}
        className={'param-single'}
        isDisabled={false}
        isError={false}
        initialOpen={false}
        value={paramSingleValue}
        options={options}
        onChange={setParamSingleValue}
      />

      <h2>Simple single picker</h2>
      <SimpleCombobox
        title={'Simple single picker'}
        className={'simple-single'}
        isDisabled={false}
        isError={false}
        initialOpen={false}
        value={simpleValue}
        options={stringOptions}
        onChange={setSimpleValue}
      />

      <h2>Param picker multiple</h2>
      <ParamPickerMultiple
        title={'Param picker multiple'}
        className={'param-multiple'}
        initialOpen={false}
        isError={false}
        isDisabled={false}
        value={multipleValue}
        options={options}
        onChange={setMultipleValue}
      />
    </div>
  );
}
