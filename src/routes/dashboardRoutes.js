import asyncComponent from "../helpers/AsyncFunc";

export default [
  {
    path: "/",
    exact: true,
    component: asyncComponent(() => import("../containers/Dashboard"))
  },
  {
    path: "/user",
    exact: true,
    component: asyncComponent(() => import("../containers/User"))
  }
];
