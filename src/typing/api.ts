export type ResponseData<T> = {
  data: T;
  total?: number;
};

export type ResponseError = {
  msg: string;
};

export type ApiController = <T>(req: number, res: number) => T 