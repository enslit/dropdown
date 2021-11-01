import React, {Dispatch, SetStateAction} from 'react'
import DropdownItem from "../../utilsStyledComponents/DropdownItem";
import DropdownItemCheckbox from "../styledComponents/dropdown/DropdownItemCheckbox";
import DropdownItemValue from "../styledComponents/dropdown/DropdownItemValue";
import {RendererSingleDropdownRowCallback} from "../../types/RendererSingleDropdownRowCallback";
import {RendererMultipleDropdownRowParams} from "../../types/RendererMultipleDropdownRowParams";
import {RendererMultipleDropdownRowCallback} from "../../types/RendererMultipleDropdownRowCallback";
import {isEqual} from "lodash";

export function defaultRendererSingleDropdownRow<T>(
	onChange: (value: T) => void,
	textRenderer?: (value: T) => string
): RendererSingleDropdownRowCallback<T> {
	return function (
		options: T[],
		index: number,
		isSelected: boolean,
		setDropdownOpen: Dispatch<SetStateAction<boolean>>
	): JSX.Element {
		const value = options[index]

		const handleSelect = (): void => {
			onChange(value)
			setDropdownOpen(false);
		};

		return (
			<DropdownItem onClick={handleSelect} selected={isSelected}>
				{
					textRenderer
						? textRenderer(value)
						: value
				}
			</DropdownItem>
		)
	}
}

export function defaultRendererMultipleDropdownRow<T>(
	onChange: (value: T[]) => void,
	textRenderer?: (value: T) => string
): RendererMultipleDropdownRowCallback<T> {
	return function (params: RendererMultipleDropdownRowParams<T>): JSX.Element {
		const {currentValue, filteredOptions, index, isSelected} = params;
		const item = filteredOptions[index]

		const handlerClick = () => {
			const find = currentValue.findIndex(el => isEqual(el, item))

			onChange(find !== -1
				? [
					...currentValue.slice(0, find),
					...currentValue.slice(find + 1),
				] : [...currentValue, item])
		}

		return (
			<DropdownItem onClick={handlerClick} selected={isSelected}>
				<DropdownItemCheckbox type="checkbox" checked={isSelected} onChange={() => {}}/>
				<DropdownItemValue>
					{
						textRenderer
							? textRenderer(item)
							: item
					}
				</DropdownItemValue>
			</DropdownItem>
		);
	}
}

export function defaultRendererSelectAll(
	onChange: (selectedAll: boolean) => void,
	valueLength: number,
	optionsLength: number
): JSX.Element {
	return (
		<DropdownItem onClick={() => onChange(valueLength === optionsLength)}>
			<input
				type="checkbox"
				checked={valueLength === optionsLength}
				onChange={() => {}}
			/>
			{valueLength === optionsLength ? 'Снять' : 'Выбрать'} все
		</DropdownItem>
	)
}

export function defaultDropdownNoSearchResultRenderer(): JSX.Element {
	return <DropdownItem>Ничего не найдено</DropdownItem>
}