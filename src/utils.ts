import faker from "faker";
import {ParamNotation} from "./components/Pickers/types/ParamNotation";

export const generateData = (cnt: number): string[] => {
  const data: string[] = [];

  for (let i = 0; i < cnt; i++) {
    data.push(faker.name.findName());
  }

  return data;
};

export const generateObjectData = (cnt: number): ParamNotation[] => {
  const data: ParamNotation[] = [];

  for (let i = 1; i <= cnt; i++) {
    data.push({
      measurementType: 1,
      stationId: 1,
      aggregateId: 1,
      parameterId: i
    });
  }

  return data;
};

export const randomInRange = (min: number, max: number): number => Math.round(min + Math.random() * (max - min))

export const getParamLabel = (param: ParamNotation): string => `Параметр ${param?.parameterId}`;