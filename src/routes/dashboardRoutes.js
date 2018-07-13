import asyncComponent from "../helpers/AsyncFunc";

export default [
  {
    path: "/",
    exact: true,
    component: asyncComponent(() => import("../containers/Dashboard"))
  },
  {
    path: "/posts",
    exact: true,
    component: asyncComponent(() => import("../containers/Posts"))
  },
];
