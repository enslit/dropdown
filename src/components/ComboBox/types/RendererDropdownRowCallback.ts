import {Dispatch, SetStateAction} from "react";

export type RendererDropdownRowCallback<T> = (
  options: T[],
  index: number,
  isSelected: boolean,
  setDropdownOpen: Dispatch<SetStateAction<boolean>>
) => JSX.Element | string