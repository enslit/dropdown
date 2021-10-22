import React, {ChangeEvent, FC, MouseEventHandler, useCallback, useEffect, useMemo, useState} from 'react'
import DropdownItem from '../../styledComponents/DropdownItem';
import {generateData} from "../../utils";
import Single from "../ComboBox/Single";

const SingleCombobox: FC = (props) => {
  const [isOpenSingle, setOpenSingle] = useState<boolean>(false);
  const [isDisabledSingle, setDisabledSingle] = useState<boolean>(false);
  const [isErrorSingle, setErrorSingle] = useState<boolean>(false);
  const dataSingle = useMemo<string[]>(() => generateData(Math.round(Math.random() * 50)), []);
  const [filteredListSingle, setFilteredListSingle] = useState<string[]>(dataSingle);
  const [searchValueSingle, setSearchValueSingle] = useState<string>('');
  const [valueSingle, setValueSingle] = useState<string>(dataSingle[0]);

  const handleClickSingle: MouseEventHandler<HTMLDivElement> = () => {
    setOpenSingle((prev) => !prev);
  };

  const rowRendererSingle = (index: number): JSX.Element => {
    const isSelected: boolean = filteredListSingle[index] === valueSingle

    const handleClick = (): void => {
      setValueSingle(filteredListSingle[index]);
      setOpenSingle(false);
    };

    return (
      <DropdownItem onClick={handleClick} selected={isSelected}>
        {filteredListSingle[index]}
      </DropdownItem>
    );
  };

  const noSearchResultRenderer = (): JSX.Element => {
    return (
      <div style={{ padding: '8px 16px' }}>
        Ничего не найдено
      </div>
    )
  }

  const handleWheelDown = (e: React.WheelEvent<HTMLDivElement>) => {
    setValueSingle((prev) => {
      const idx = dataSingle.findIndex((el) => el === prev);
      return idx === dataSingle.length - 1 ? prev : dataSingle[idx + 1];
    });
  };

  const handleWheelUp = (e: React.WheelEvent<HTMLDivElement>) => {
    setValueSingle((prev) => {
      const idx = dataSingle.findIndex((el) => el === prev);
      return idx === 0 ? prev : dataSingle[idx - 1];
    });
  };

  const handleSearchSingle = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValueSingle(e.target.value);
  }, [])

  useEffect(() => {
    setFilteredListSingle(dataSingle.filter(el => el.toLowerCase().includes(searchValueSingle.toLowerCase())))
  }, [dataSingle, searchValueSingle]);

  useEffect(() => {
    if (!isOpenSingle) {
      setSearchValueSingle('');
    }
  }, [isOpenSingle]);

  return (
    <Single
      placeholder={'Выберите из списка'}
      isError={isErrorSingle}
      isDisabled={isDisabledSingle}
      isOpen={isOpenSingle}
      rowsCount={filteredListSingle.length}
      rowHeight={30}
      rowRenderer={rowRendererSingle}
      onClick={handleClickSingle}
      onWheelDown={handleWheelDown}
      onWheelUp={handleWheelUp}
      onChangeSearch={handleSearchSingle}
      onClose={() => setOpenSingle(false)}
      searchValue={searchValueSingle}
      noSearchResult={noSearchResultRenderer}
    >
      {valueSingle}
    </Single>
  );
};

export default SingleCombobox;