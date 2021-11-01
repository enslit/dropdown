import {Dispatch, SetStateAction} from "react";

export type RendererSingleDropdownRowCallback<T> = (
  options: T[],
  index: number,
  isSelected: boolean,
  setDropdownOpen: Dispatch<SetStateAction<boolean>>
) => JSX.Element | string