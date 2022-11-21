import axios, { AxiosResponse } from "axios";
import { message } from "antd";
import { QueryClient } from "react-query";

import { tokenRefreshApi } from "./authentication";
import User from "@/modules/classes/user";
import { logout } from "./authentication";
import { tokenRefreshUrl } from '@/constants/query'

// export configurated query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
});

// Request wrapper
export const requestWrapper = axios.create({
  baseURL: '/',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

requestWrapper.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

requestWrapper.interceptors.response.use(
  (response) =>
    // if no error you get the response
    response,
  (error) => {
    const { status } = error.response;
    const original_request = error.config;

    // if an error is returned related to user rights (401, 422),
    if (status === 401 && original_request.url !== tokenRefreshUrl) {
      // return refreshApi();
      return (
        // the refresh method then takes over and the check is done on the server side
        tokenRefreshApi()
          .then(() =>
            // If refresh method success, original request is run, (transparent to the user)
            axios(original_request),
          )
          .catch((err) => {
            // If the user authentication can't be refreshed, the user is loged out.
            const user = User.getUser();
            if (user.getIsAuthenticated()) {
              logout();
            }
            throw err;
          })
      );
    }
    throw error;
  },
);

// Function to display error message from response
export const handleError = (err: any, msg?: string) => {
  const status = err.response?.status;
  const responseMessage =
    err.response?.data?.msg || err.response?.data?.message || err.response?.data?.error;
  if (typeof msg === "string") {
    message.error(msg);
  } else if (typeof msg === "object" && msg[status]) {
    message.error(msg[status]);
  } else {
    message.error(responseMessage || "An error has occurred. Please try again");
  }
  throw err;
};

// Function to display success message from response
export const handleResponse = (res: AxiosResponse<any>, msg?: string) => {
  const status = res?.status;
  const responseMessage = res.data?.msg || res.data?.message;
  if (typeof msg === "string") {
    message.success(msg);
  } else if (typeof msg === "object" && msg[status]) {
    message.success(msg[status]);
  } else if (responseMessage) {
    message.success(responseMessage);
  }
  return res;
};

// Function to convert JSON data to Form Data
export const convertJSONDataToFormData = (data: { files?: Array<{ originFileObj: any }> }) => {
  // create FormData object that will be sent to endpoint
  const formData = new FormData();
  // append a "files" key containing Files objects from data values
  if (data.files) {
    data.files.forEach((file) => {
      formData.append("files[]", file.originFileObj);
    });
  }
  // remove the file key from data values
  delete data.files;
  // append the rest of the data as a stringified json into a "body" key of the FormData
  formData.append("body", JSON.stringify(data));
  // return formData value
  return formData;
};