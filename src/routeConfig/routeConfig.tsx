import * as React from "react";
import { TRoutes } from "./routing";
import Login from '@/pages/Login';
import Nomatch from "@/pages/Nomatch";
import Homepage from "@/pages/Homepage";

//const ResetPassword = lazy(() => import("@/pages/ResetPassword"));

// App Pages
//const Profile = lazy(() => import("@/pages/Profile"));
//const MyResume = lazy(() => import("@/pages/MyResume"));
//const MyProjects = lazy(() => import("@/pages/MyProjects"));


export const publicRoutes: TRoutes = [
  {
    isProtected: false,
    path: "/login",
    key: "login",
    name: "login",
    component: Login,
  },
  {
    isProtected: false,
    path: "*",
    key: "nomatch",
    name: "nomatch",
    component: Nomatch,
  }
];

export const protectedRoutes: TRoutes = [
  {
    isProtected: true,
    path: "/",
    key: "homepage",
    name: "Homepage",
    component: Homepage,
  },
  {
    isProtected: false,
    path: "*",
    key: "nomatch",
    name: "nomatch",
    component: Nomatch,
  }
];

export const allRoutes: TRoutes = [...publicRoutes, ...protectedRoutes];