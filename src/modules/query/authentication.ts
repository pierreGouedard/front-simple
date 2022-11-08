import { message } from "antd";
import { useEffect, useState } from 'react'
import { requestWrapper, queryClient, handleResponse, handleError } from "./common";
import { ILoginParams, IResetPasswordParams, TNewPassApi, IRefreshVerify } from "./common.d";
import { 
    loginUrl, 
    refreshLogoutUrl, 
    refreshVerifyUrl, 
    accessLogoutUrl, 
    accessVerifyUrl, 
    tokenRefreshUrl, 
    selfUrl, 
    resetPasswordUrl,
    signaturePasswordUrl
} from '@/constants/query'
import User from '@/modules/classes/user'
import { GUEST } from "@/constants/user";
import { publicRoutes } from '@/routeConfig/routeConfig'

// Request to auth API
export const selfApi = () => requestWrapper.get(selfUrl);
export const sendNewPasswordApi = ({ email, body }: TNewPassApi) =>
  requestWrapper.post( resetPasswordUrl + `/${email}`, body);
export const resetPasswordApi = ({ email, confirm_url, new_user }: IResetPasswordParams) =>
  requestWrapper.post(signaturePasswordUrl + `/${email}`, {
    confirm_url,
    new_user,
  });
export const loginApi = (data: ILoginParams) => {
  return requestWrapper.post(loginUrl, data)
};
export const refreshLogoutApi = () => requestWrapper.post(refreshLogoutUrl);
export const accessLogoutApi = () => requestWrapper.post(accessLogoutUrl);
export const tokenRefreshApi = () => requestWrapper.post(tokenRefreshUrl);
export const refreshVerifyApi = () => requestWrapper.post(refreshVerifyUrl);
export const accessVerifyApi = () => requestWrapper.post(accessVerifyUrl);

// login action. Log in the user and dispatch to store
export function login({
  loginParams
}: {
  loginParams?: ILoginParams;
}) {
  const user = User.getUser();
  return loginApi(loginParams)
    .then(async (response) => {
      if (response.status === 200) {
        await accessVerify();
        user.setIsAuthenticated(true);
      }
    })
    .catch(() => {
      message.error(
        window.intl.formatMessage({
          id: "authenticationActions.login.error.message",
          defaultMessage: "Invalid credentials",
        }),
        2,
      );
      user.setIsAuthenticated(false);
    });
}

/**
 * accessVerify action is used to get user roles.
 */
export function accessVerify() {
  // get user
  const user = User.getUser();

  return accessVerifyApi()
    .then((access) => {
      selfApi().then((userData) => {
          user.setRoles(userData?.data?.roles?.map((item) => item.name));
          user.setRolesData(userData?.data?.roles);
          user.setUserData(userData?.data);
      });

      return access;
    })
    .catch((error) => {
      user.setRoles([GUEST]);
      return error;
    });
}

/**
 * refreshVerify action check if a token is still valid
 */
export function refreshVerify({locationPathname}: IRefreshVerify) {
  return refreshVerifyApi()
    .then(async (response) => {
      if (response.status === 200) {

        // Get user
        const user = User.getUser();

        if (!user.getIsAuthenticated()) {
          await accessVerify();
          await user.setIsAuthenticated(true);
        }
      }
      return response;
    })
    .catch((error) => {
      if (locationPathname) {
        const publicRoute = publicRoutes.find((item) => item.path === locationPathname);
        if (!!publicRoute) return;
        logout();
      }
      return error;
    });
}

/**
 * useRefreshVerify makes it possible to halt routing until roles & access are processed
 */
 export function useRefreshVerify({
  locationPathname
}: {
  locationPathname?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const async = async () => {
      setIsLoading(true);
      await refreshVerify({locationPathname});
      setIsLoading(false);
    };
    async();
  }, [locationPathname]);
  return {
    isLoading,
  };
}


/**
 * logout action log out the current User and clear its data
 */
export async function logout() {
  const user = User.getUser();

  // set isAuth = false
  user.setIsAuthenticated(false);
  queryClient.clear();
  localStorage.clear();
  window.location.reload();
}

export function resetPassword(email: string, new_user?: string) {
  const confirmUrl = `${
    window.location.origin + process.env.BASE_URL
  }/forgot-password/retrieve/{TOKEN}?email_from={EMAIL}`;

  return resetPasswordApi({ email, new_user, confirm_url: confirmUrl });
}

export function sendNewPassword({ email, body }: TNewPassApi): Promise<{}> {
  return sendNewPasswordApi({ email, body })
    .then((res) => handleResponse(res, "Your password has been successfully updated"))
    .catch((err: Error) => handleError(err));
}
