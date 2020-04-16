import LoginPage from "../components/pages/Login";
import RegisterPage from "../components/pages/Register";
import CounterPage from "../components/pages/Counter";

const pageComponents = {
  login: {
    url: "/login",
    component: LoginPage,
  },
  register: {
    url: "/register",
    component: RegisterPage,
  },
  counter: {
    url: "/",
    component: CounterPage,
  },
};

const configRoutes = {
  guest: {
    allowedPath: [pageComponents.login, pageComponents.register],
    redirectPath: "/login",
  },
  user: {
    allowedPath: [pageComponents.counter],
    redirectPath: "/",
  },
};

export default configRoutes;
