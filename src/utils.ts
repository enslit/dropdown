import faker from "faker";

export const generateData = (cnt: number): string[] => {
  const data: string[] = [];

  for (let i = 0; i < cnt; i++) {
    data.push(faker.name.findName());
  }

  return data;
};