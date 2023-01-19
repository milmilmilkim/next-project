type Result = {
  [key: string]: string | number;
};

export const generateJson = <T>(values: string[][]): T => {
  const label: string[] = values[0];
  const row: string[][] = values?.slice(1);

  const result: Result[] = [];

  row.forEach((row, rowIndex: number) => {
    row.forEach((col, colIndex: number) => {
      result[rowIndex] ??= {};
      result[rowIndex][label[colIndex]] = col;
    });
  });

  return result as T;
};
