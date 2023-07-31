import loadable from "@loadable/component";
const Home = loadable(() => import("../page/home/index.jsx"));
const Detail = loadable(() => import("../page/detail/index.jsx"));
const NotFound = loadable(() => import("../page/notFound/notFound.jsx"));

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
    path: "*",
    element: <NotFound />,
  },
];

export const AllPages = () => {
  return [
    ...routes
  ];
};
