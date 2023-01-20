export type ResponseData<T> = {
  data: T;
  total?: number;
};

export type ResponseError = {
  msg: string;
};
