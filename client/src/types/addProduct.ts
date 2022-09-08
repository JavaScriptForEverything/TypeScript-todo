
export interface IObjectKeys {
  [key: string] : string | number
}
export interface IFields extends IObjectKeys {
  name: string,
  summary: string,
  price: number
}