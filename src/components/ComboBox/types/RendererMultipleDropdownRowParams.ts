import {Dispatch, SetStateAction} from "react";

export type RendererMultipleDropdownRowParams<T> = {
  currentValue: T[],
  filteredOptions: T[],
  index: number,
  isSelected: boolean,
  setDropdownOpen: Dispatch<SetStateAction<boolean>>
}