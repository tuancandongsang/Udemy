import loadable from "@loadable/component";
const Home = loadable(() => import("../page/home/index.jsx"));
const Detail = loadable(() => import("../page/detail/index.jsx"));
const NotFound = loadable(() => import("../page/notFound/notFound.jsx"));
const Login = loadable(() => import("../page/login/index.jsx"))
const CheckLogin = loadable(() => import("../page/login/CheckLogin.jsx"))
const AppLayout = loadable(() => import("../component/Layout/AppLayout.jsx"))
const LazyLoadData = loadable(() => import("../page/test.jsx"))

const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/detail",
    name: "Detail",
    element: <Detail />,
  },
  {
    path: "/test",
    name: "test",
    element: <LazyLoadData />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const AllPages = () => {
  return [
    // ...routes

    {
      element: <CheckLogin />,
      children: [
        {
          element: <AppLayout />,
          children: [...routes]
        },
        // {
        //   path: "/",
        //   element: <Home />
        // }
      ]
    },
    {
      path: "/login",
      name: "Login",
      element: <Login />
    }
  ];
};
