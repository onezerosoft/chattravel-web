import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home";
import Chat from "./pages/chat";
import Style from "./pages/style";
import Travel from "./pages/travel";
import Header from "./components/common/Header";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const NotFound = () => {
  return (
    <div>
      <p>NOT FOUND</p>
      <Link to="/">홈으로</Link>
    </div>
  );
};

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        { path: "/", index: true, element: <Home /> },
        { path: "/chat", element: <Chat /> },
        { path: "/style", element: <Style /> },
        { path: "/travel/:travelId", element: <Travel /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
