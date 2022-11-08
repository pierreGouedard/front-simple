import * as React from "react";

// @TODO: find a better definition than any
export interface TRoute {
  isProtected: boolean; // Whether this route is protected or not
  key?: React.Key | string; // Key to use as react elements list key
  component?: React.ReactNode | any; // The component to render when this route is active
  name?: string | React.ReactElement | undefined; // Will be translated, if translation is available and used in BreadCrumbs component and as a title
  path?: string | undefined; // simple react-router path, like "/forgot-password/retrieve"
  children?: TRoutes | undefined; // Nested routes, used internally, while defining your routes, use routes property instead
  routes?: TRoutes | undefined; // Nested routes, must have the TRoute format
  hideInMenu?: boolean | undefined | false; // hide route in the left menu
  hideInTabs?: boolean | undefined | false; // if route is a nested route, and "RenderRoutesTabs" is used, this route will be hidden
  hideChildrenInMenu?: boolean | undefined | false; // If route has nested routes, do not show the nested routes in the left menu
  hideChildrenInTabs?: boolean | undefined | false; // If route has nested routes, and "RenderRoutesTabs" is used, do not show the nested routes in the tabs-bar
  icon?: string | React.ReactNode | undefined; // Menu icon
  target?: string | undefined; // if menu link is an external link
  locale?: string | undefined; // Menu name translation, used internally
  exact?: boolean | undefined; // react-router exact property
  redirect?: string | undefined; // if redirect is provided, will redirect
  extra?: any; // extra content
}

export type TRoutes = Array<TRoute>;

export interface IParams {
  [key: string]: string | undefined;
}