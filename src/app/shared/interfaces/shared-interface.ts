export interface IResponse<T> {
  data: T,
  message: string,
  succeeded: boolean,
  errors: string[],
  status: number
}

export interface IUser {
  id: string;
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  connectionId: string,
  createdAt: string
}