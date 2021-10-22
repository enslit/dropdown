import React, {ChangeEvent, FC, MouseEventHandler, useCallback, useEffect, useMemo, useState} from 'react'
import Multiple from "../ComboBox/Multiple";
import {generateData} from "../../utils";
import Chip from '../../styledComponents/Chip';
import DropdownItem from '../../styledComponents/DropdownItem';
import usePresentation from "../../hooks/usePresentation";
import Presentation from "../../types/Presentation";

const MultipleCombobox: FC = (props) => {
  const presentation = usePresentation(window)

  const [isOpenMultiple, setOpenMultiple] = useState<boolean>(false);
  const [isDisabledMultiple, setDisabledMultiple] = useState<boolean>(false);
  const [isErrorMultiple, setErrorMultiple] = useState<boolean>(false);
  const dataMultiple = useMemo<string[]>(() => generateData(Math.round(Math.random() * 50)), []);
  const [filteredListMultiple, setFilteredListMultiple] = useState<string[]>(dataMultiple);
  const [searchValueMultiple, setSearchValueMultiple] = useState<string>('');
  const [valueMultiple, setValueMultiple] = useState<string[]>([]);
  const [valueMultipleTmp, setValueMultipleTmp] = useState<string[]>(valueMultiple);

  const handleClickMultiple: MouseEventHandler<HTMLDivElement> = () => {
    setOpenMultiple((prev) => !prev);
  };

  const rowRendererMultiple = (index: number): JSX.Element => {
    const isMedia = presentation !== Presentation.DESKTOP

    const isSelected: boolean = (isMedia ? valueMultipleTmp : valueMultiple).includes(filteredListMultiple[index])

    const handleClick = (): void => {
      (isMedia ? setValueMultipleTmp : setValueMultiple)(prev => {
        const find = prev.findIndex(el => el === filteredListMultiple[index])

        return find !== -1
          ? [
            ...prev.slice(0, find),
            ...prev.slice(find + 1),
          ] : [...prev, filteredListMultiple[index]]
      });
    };

    return (
      <DropdownItem onClick={handleClick} selected={isSelected}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
        />
        {filteredListMultiple[index]}
      </DropdownItem>
    );
  };

  const selectAllRenderer = (): JSX.Element | string => {
    if (searchValueMultiple) return ''
    const isMedia = presentation !== Presentation.DESKTOP

    const handleSelectAll = () => {
      (isMedia ? setValueMultipleTmp : setValueMultiple)(prev => {
        return prev.length === dataMultiple.length
          ? []
          : [...dataMultiple]
      })
    }

    return (
      <DropdownItem onClick={handleSelectAll}>
        <input
          type="checkbox"
          checked={(isMedia ? valueMultipleTmp : valueMultiple).length === dataMultiple.length}
          onChange={() => {}}
        />
        {(isMedia ? valueMultipleTmp : valueMultiple).length === dataMultiple.length ? 'Снять' : 'Выбрать'} все
      </DropdownItem>
    )
  }

  const noSearchResultRenderer = (): JSX.Element => {
    return (
      <div style={{ padding: '8px 16px' }}>
        Ничего не найдено
      </div>
    )
  }

  const handleClickChip = (index: number) => (e: React.MouseEvent<HTMLSpanElement>) => {
    if (presentation === Presentation.DESKTOP) {
      e.stopPropagation()
      setValueMultiple(prev => prev.filter((_, idx) => index !== idx))
    }
  }

  const handleApply = () => {
    setValueMultiple([...valueMultipleTmp])
    setOpenMultiple(false)
  }

  const handleCancel = () => {
    setValueMultipleTmp([...valueMultiple])
    setOpenMultiple(false)
  }

  const handleSearchMultiple = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValueMultiple(e.target.value);
  }, [])

  useEffect(() => {
    setFilteredListMultiple(dataMultiple.filter(el => el.toLowerCase().includes(searchValueMultiple.toLowerCase())))
  }, [dataMultiple, searchValueMultiple]);

  useEffect(() => {
    if (isOpenMultiple) {
      setSearchValueMultiple('')
    }
  }, [isOpenMultiple]);

  return (
    <Multiple
      placeholder={'Выберите из списка'}
      isError={isErrorMultiple}
      isDisabled={isDisabledMultiple}
      isOpen={isOpenMultiple}
      rowsCount={filteredListMultiple.length}
      rowHeight={30}
      rowRenderer={rowRendererMultiple}
      onClick={handleClickMultiple}
      onApply={handleApply}
      onClose={handleCancel}
      selectAllRenderer={selectAllRenderer}
      onChangeSearch={handleSearchMultiple}
      searchValue={searchValueMultiple}
      noSearchResult={noSearchResultRenderer}
    >
      {valueMultiple.map((v, i) => <Chip key={v} onClick={handleClickChip(i)}>{v}</Chip>)}
    </Multiple>
  );
};

export default MultipleCombobox;