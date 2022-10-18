import Vue from "vue";
import Home from "../components/Home";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Board from "../components/Board";
import Card from "../components/Card";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem("token");
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
  if (isAuth) {
    next();
  } else {
    next(loginPath);
  }
};

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home, beforeEnter: requireAuth },
    { path: "/login", component: Login },
    {
      path: "/b/:bid",
      component: Board,
      children: [{ path: "c/:cid", component: Card, beforeEnter: requireAuth }],
      beforeEnter: requireAuth
    },

    { path: "*", component: NotFound }
  ]
});

export default router;
