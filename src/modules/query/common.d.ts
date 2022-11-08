import { AxiosResponse } from "axios";


// Auth query types
export interface ILoginParams {
  password: string;
  username: string;
}

export type TNewPassBody = {
  password: string;
  signature: string;
};

export type TNewPassApi = {
  email: string | string[];
  body: TNewPassBody;
};

export interface IResetPasswordParams {
  email: string;
  confirm_url: string;
  new_user: string;
}

export interface IRefreshVerify {
  locationPathname?: string;
  roles?: Array<string>;
}

//
